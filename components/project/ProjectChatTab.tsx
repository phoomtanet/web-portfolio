"use client";

import { ChevronLeft, FileText, Loader2, Lock, Paperclip, Send, Users, Wifi, WifiOff, X } from 'lucide-react';
import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';
import { useError } from '@/context/ErrorContext';
import { useLang } from '@/i18n/LangContext';
import { chatTabState } from '@/lib/chatTabState';
import { ChatMessageDeletedPayload, ChatMessageEditedPayload, ChatRoomSummary, ProjectChatMessage } from '@/types/chat';
import { ConfirmModal } from '@/components';
import { uploadChatFile } from '@/service/upload';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

type Attachment = { url: string; previewUrl?: string; type: 'image' | 'pdf'; name: string };

const tx = {
  en: {
    title: 'Chat with Admin',
    subtitle: "Have a question? I'll respond shortly.",
    empty: 'No messages yet. Say hello!',
    hint: 'Enter to send · Shift+Enter for new line',
    send: 'Send',
    message: 'Type your message...',
    delete: 'Delete',
    deleteMessage: 'Delete message',
    confirmDelete: 'Delete this message?',
    loginToChat: 'Login to send a message',
    connecting: 'Connecting...',
    admin: 'Admin',
    rooms: 'Chat Rooms',
    noRooms: 'No users have chatted yet',
    selectRoom: 'Select a room to view messages',
    noMessages: 'No messages yet',
  },
  th: {
    title: 'แชตกับ Admin',
    subtitle: 'มีคำถามอะไรก็ถามได้เลย',
    empty: 'ยังไม่มีข้อความ ทักทายได้เลย!',
    hint: 'Enter เพื่อส่ง · Shift+Enter ขึ้นบรรทัดใหม่',
    send: 'ส่ง',
    message: 'พิมพ์ข้อความ...',
    delete: 'ลบ',
    deleteMessage: 'ลบข้อความ',
    confirmDelete: 'ยืนยันการลบข้อความนี้หรือไม่?',
    loginToChat: 'เข้าสู่ระบบเพื่อส่งข้อความ',
    connecting: 'กำลังเชื่อมต่อ...',
    admin: 'Admin',
    rooms: 'ห้องแชต',
    noRooms: 'ยังไม่มีผู้ใช้เข้ามาแชต',
    selectRoom: 'เลือกห้องแชตเพื่อดูข้อความ',
    noMessages: 'ยังไม่มีข้อความ',
  },
};

export default function ProjectChatTab() {
  const { lang } = useLang();
  const t = tx[lang];
  const { username, token, openLogin, isAdmin } = useAuth();
  const { showError } = useError();

  // ── user state ────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<ProjectChatMessage[]>([]);
  const [text, setText] = useState('');
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [uploading, setUploading] = useState(false);

  // ── admin state ───────────────────────────────────────────────────────────
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [adminMessages, setAdminMessages] = useState<ProjectChatMessage[]>([]);
  const [adminText, setAdminText] = useState('');
  const [unread, setUnread] = useState<Record<string, number>>({});
  const [menuForMessage, setMenuForMessage] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; isAdmin: boolean } | null>(null);
  const [adminAttachment, setAdminAttachment] = useState<Attachment | null>(null);
  const [adminUploading, setAdminUploading] = useState(false);

  // ── shared state ──────────────────────────────────────────────────────────
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const selectedRoomRef = useRef<string | null>(null);
  const roomKeyRef = useRef<string | null>(null);
  const userMessagesRef = useRef<HTMLDivElement>(null);
  const adminMessagesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

  useEffect(() => {
    roomKeyRef.current = roomKey;
  }, [roomKey]);

  useEffect(() => {
    if (!token) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      if (isAdmin) {
        socket.emit('admin_join');
      } else {
        socket.emit('user_join');
      }
    });

    socket.on('disconnect', () => {
      setConnected(false);
      setRoomKey(null);
    });

    // user events
    socket.on('room_joined', ({ roomKey: rk, messages: msgs }: { roomKey: string; messages: ProjectChatMessage[] }) => {
      setRoomKey(rk);
      setMessages(msgs);
      if (!isAdmin) chatTabState.active = true;
    });

    socket.on('new_message', (msg: ProjectChatMessage) => {
      if (isAdmin) {
        setAdminMessages((prev) => [...prev, msg]);
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // admin events
    socket.on('room_list', (list: ChatRoomSummary[]) => {
      setRooms(list);
      // init unread counts from DB
      const counts: Record<string, number> = {};
      list.forEach((r) => { if (r.unreadCount > 0) counts[r.roomKey] = r.unreadCount; });
      setUnread(counts);
    });

    socket.on('room_created', (room: ChatRoomSummary) => setRooms((prev) => [room, ...prev]));

    socket.on('room_history', ({ roomKey: rk, messages: msgs }: { roomKey: string; messages: ProjectChatMessage[] }) => {
      if (selectedRoomRef.current === rk) setAdminMessages(msgs);
    });

    socket.on('room_read', ({ roomKey: rk }: { roomKey: string }) => {
      setUnread((prev) => { const next = { ...prev }; delete next[rk]; return next; });
    });

    socket.on('room_new_message', (msg: ProjectChatMessage & { roomKey: string }) => {
      setRooms((prev) =>
        prev.map((r) =>
          r.roomKey === msg.roomKey
            ? { ...r, lastMessage: { sender: msg.sender, content: msg.content, createdAt: msg.createdAt } }
            : r
        )
      );
      if (msg.roomKey !== selectedRoomRef.current) {
        setUnread((prev) => ({ ...prev, [msg.roomKey]: (prev[msg.roomKey] ?? 0) + 1 }));
      }
    });

    socket.on('message_deleted', ({ roomKey: rk, messageId, lastMessage }: ChatMessageDeletedPayload) => {
      if (isAdmin) {
        if (selectedRoomRef.current === rk) {
          setAdminMessages((prev) => prev.filter((m) => m.id !== messageId));
        }
        setRooms((prev) =>
          prev.map((room) =>
            room.roomKey === rk ? { ...room, lastMessage } : room
          )
        );
      } else if (roomKeyRef.current === rk) {
        setMessages((prev) => prev.filter((m) => m.id !== messageId));
      }
    });

    socket.on('message_edited', ({ roomKey: rk, messageId, content }: ChatMessageEditedPayload) => {
      const update = (m: ProjectChatMessage) =>
        m.id === messageId ? { ...m, content, updatedAt: new Date() } : m;
      if (isAdmin) {
        if (selectedRoomRef.current === rk) setAdminMessages((prev) => prev.map(update));
      } else if (roomKeyRef.current === rk) {
        setMessages((prev) => prev.map(update));
      }
    });

    return () => {
      chatTabState.active = false;
      socket.disconnect();
      socketRef.current = null;
      setMessages([]);
      setConnected(false);
      setRoomKey(null);
      setRooms([]);
      setSelectedRoom(null);
      setAdminMessages([]);
      setUnread({});
    };
  }, [token, isAdmin]);

  useEffect(() => {
    if (userMessagesRef.current) {
      userMessagesRef.current.scrollTo({
        top: userMessagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (adminMessagesRef.current) {
      adminMessagesRef.current.scrollTo({
        top: adminMessagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [adminMessages]);

  function formatTime(d: string | Date) {
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ── file upload handler ───────────────────────────────────────────────────
  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    forAdmin: boolean,
  ) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      showError('ขนาดไฟล์ต้องไม่เกิน 10 MB');
      return;
    }
    const setLoad = forAdmin ? setAdminUploading : setUploading;
    const setAttach = forAdmin ? setAdminAttachment : setAttachment;
    setLoad(true);
    try {
      const result = await uploadChatFile(file);
      const type: 'image' | 'pdf' = file.type.startsWith('image/') ? 'image' : 'pdf';
      const previewUrl = type === 'image' ? URL.createObjectURL(file) : undefined;
      setAttach({ url: result.url, previewUrl, type, name: file.name });
    } catch (err) {
      showError(err instanceof Error ? err.message : 'อัปโหลดไฟล์ไม่สำเร็จ');
    } finally {
      setLoad(false);
    }
  }

  // ── user handlers ─────────────────────────────────────────────────────────
  function handleSend() {
    if (!socketRef.current || !roomKey) return;
    if (attachment) {
      socketRef.current.emit('send_message', { roomKey, content: '', fileUrl: attachment.url, fileName: attachment.name });
      setAttachment(null);
    } else if (text.trim()) {
      socketRef.current.emit('send_message', { roomKey, content: text.trim().replace(/\n+/g, ' ') });
      setText('');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  // ── admin handlers ────────────────────────────────────────────────────────
  function openRoom(rk: string) {
    if (selectedRoom && selectedRoom !== rk) {
      socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
    }
    setSelectedRoom(rk);
    setAdminMessages([]);
    setUnread((prev) => { const next = { ...prev }; delete next[rk]; return next; });
    socketRef.current?.emit('admin_open_room', { roomKey: rk });
  }

  function closeRoom() {
    if (selectedRoom) socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
    setSelectedRoom(null);
    setAdminMessages([]);
  }

  function handleAdminSend() {
    if (!socketRef.current || !selectedRoom) return;
    let content: string;
    let fileUrl: string | undefined;
    let fileName: string | undefined;
    if (adminAttachment) {
      content = '';
      fileUrl = adminAttachment.url;
      fileName = adminAttachment.name;
      setAdminAttachment(null);
    } else if (adminText.trim()) {
      content = adminText.trim().replace(/\n+/g, ' ');
      setAdminText('');
    } else {
      return;
    }
    socketRef.current.emit('send_message', { roomKey: selectedRoom, content, fileUrl, fileName });
    setRooms((prev) =>
      prev.map((r) =>
        r.roomKey === selectedRoom
          ? { ...r, lastMessage: { sender: username ?? '', content: content || '📎 ไฟล์แนบ', createdAt: new Date() } }
          : r
      )
    );
  }

  function handleAdminKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdminSend(); }
  }

  function handleDeleteMessage(id: string) {
    setMenuForMessage(null);
    setPendingDelete({ id, isAdmin: false });
  }

  function handleAdminDeleteMessage(id: string) {
    setMenuForMessage(null);
    setPendingDelete({ id, isAdmin: true });
  }

  function handleEditMessage(id: string, content: string) {
    if (!socketRef.current || !roomKey) return;
    socketRef.current.emit('edit_message', { roomKey, messageId: id, content });
  }

  function handleAdminEditMessage(id: string, content: string) {
    if (!socketRef.current || !selectedRoom) return;
    socketRef.current.emit('edit_message', { roomKey: selectedRoom, messageId: id, content });
  }

  function confirmDelete() {
    if (!pendingDelete || !socketRef.current) return;
    const rk = pendingDelete.isAdmin ? selectedRoomRef.current : roomKeyRef.current;
    if (!rk) return;
    socketRef.current.emit('delete_message', { roomKey: rk, messageId: pendingDelete.id });
    setPendingDelete(null);
  }

  const statusBadge = token ? (
    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${connected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
      {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {connected ? 'Online' : t.connecting}
    </span>
  ) : null;

  // ── ADMIN VIEW ────────────────────────────────────────────────────────────
  if (isAdmin) {
    return (
      <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-indigo-600">{t.rooms}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{rooms.length} ห้องที่ active</p>
          </div>
          {statusBadge}
        </div>

        <div className="flex h-[500px] overflow-hidden rounded-2xl border border-indigo-100 bg-slate-50/60">
          {/* Room list */}
          <div className={`flex w-52 flex-shrink-0 flex-col border-r border-indigo-50 ${selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
            <div className="flex items-center gap-2 border-b border-indigo-50 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Users className="h-3 w-3" />
              ห้องแชต ({rooms.length})
            </div>
            <div className="flex-1 overflow-y-auto">
              {rooms.length === 0 ? (
                <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
                  {t.noRooms}
                </div>
              ) : (
                rooms.map((room) => (
                  <button
                    key={room.roomKey}
                    onClick={() => openRoom(room.roomKey)}
                    className={`w-full px-3 py-2.5 text-left transition hover:bg-indigo-50 ${selectedRoom === room.roomKey ? 'border-r-2 border-indigo-500 bg-indigo-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-medium text-slate-800">{room.username}</span>
                      {(unread[room.roomKey] ?? 0) > 0 && (
                        <span className="ml-1 flex-shrink-0 rounded-full bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {unread[room.roomKey]}
                        </span>
                      )}
                    </div>
                    {room.lastMessage && (
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {room.lastMessage.sender === username ? 'You: ' : ''}{room.lastMessage.content}
                      </p>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className={`flex min-w-0 flex-1 flex-col ${!selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
            {!selectedRoom ? (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
                {t.selectRoom}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-indigo-50 px-4 py-2.5">
                  <button
                    onClick={closeRoom}
                    className="rounded-lg p-1 text-slate-400 transition hover:text-slate-600 sm:hidden"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold text-slate-800">
                    @{rooms.find((r) => r.roomKey === selectedRoom)?.username}
                  </span>
                </div>

                <div ref={adminMessagesRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
                  {adminMessages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-xs text-slate-400">
                      {t.noMessages}
                    </div>
                  ) : (
                    adminMessages.map((msg) => (
                      <ChatBubble
                        key={msg.id}
                        content={msg.content}
                        fileUrl={msg.fileUrl}
                        fileName={msg.fileName}
                        updatedAt={msg.updatedAt}
                        senderLabel={`${msg.sender} · ${formatTime(msg.createdAt)}`}
                        isMine={msg.isAdmin}
                        menuOpen={menuForMessage === msg.id}
                        onToggleMenu={() => setMenuForMessage((prev) => (prev === msg.id ? null : msg.id))}
                        onDelete={msg.isAdmin ? () => handleAdminDeleteMessage(msg.id) : undefined}
                        onSaveEdit={msg.isAdmin ? (c) => handleAdminEditMessage(msg.id, c) : undefined}
                        deleteLabel={t.deleteMessage}
                      />
                    ))

                  )}
                </div>

                <div className="flex flex-col gap-2 border-t border-indigo-50 p-3">
                  {adminAttachment && (
                    <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-2">
                      {adminAttachment.type === 'image' && adminAttachment.previewUrl ? (
                        <img src={adminAttachment.previewUrl} alt="preview" className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <FileText className="h-5 w-5 flex-shrink-0 text-indigo-400" />
                      )}
                      <span className="flex-1 truncate text-xs text-slate-600">{adminAttachment.name}</span>
                      <button onClick={() => setAdminAttachment(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      ref={adminFileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, true)}
                    />
                    <button
                      onClick={() => adminFileInputRef.current?.click()}
                      disabled={!connected || adminUploading || !!adminAttachment}
                      className="flex-shrink-0 self-end rounded-xl border border-indigo-100 bg-white p-3 text-slate-400 transition hover:text-indigo-500 disabled:opacity-40"
                    >
                      {adminUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Paperclip className="h-5 w-5" />}
                    </button>
                    <textarea
                      value={adminText}
                      onChange={(e) => setAdminText(e.target.value)}
                      onKeyDown={handleAdminKeyDown}
                      placeholder={t.message}
                      rows={3}
                      disabled={!!adminAttachment}
                      className="flex-1 resize-none rounded-xl border border-indigo-100 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
                    />
                    <button
                      onClick={handleAdminSend}
                      disabled={!connected || adminUploading || (!adminText.trim() && !adminAttachment)}
                      className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-3 text-white transition hover:bg-indigo-600 disabled:opacity-40"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {pendingDelete && (
        <ConfirmModal
          variant="delete"
          message={t.confirmDelete}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
      </>
    );
  }

  // ── USER VIEW ─────────────────────────────────────────────────────────────
  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-600">{t.title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
        </div>
        {statusBadge}
      </div>

      <div className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-slate-50/60">
        <div
          ref={userMessagesRef}
          className="flex flex-1 flex-col gap-2 overflow-y-auto p-4"
        >
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-400">{t.empty}</div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender === username && !msg.isAdmin;
              const senderLabel = `${msg.isAdmin ? `${t.admin} · ` : ''}${msg.sender} · ${formatTime(msg.createdAt)}`;
              return (
                <ChatBubble
                  key={msg.id}
                  content={msg.content}
                  fileUrl={msg.fileUrl}
                  fileName={msg.fileName}
                  updatedAt={msg.updatedAt}
                  senderLabel={senderLabel}
                  isMine={isMe}
                  menuOpen={menuForMessage === msg.id}
                  onToggleMenu={() => setMenuForMessage((prev) => (prev === msg.id ? null : msg.id))}
                  onDelete={isMe ? () => handleDeleteMessage(msg.id) : undefined}
                  onSaveEdit={isMe ? (c) => handleEditMessage(msg.id, c) : undefined}
                  deleteLabel={t.deleteMessage}
                />
              );
            })
          )}
        </div>

        {username ? (
          <div className="border-t border-indigo-50 p-3">
            {attachment && (
              <div className="mb-2 flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-2">
                {attachment.type === 'image' && attachment.previewUrl ? (
                  <img src={attachment.previewUrl} alt="preview" className="h-10 w-10 rounded-lg object-cover" />
                ) : (
                  <FileText className="h-5 w-5 flex-shrink-0 text-indigo-400" />
                )}
                <span className="flex-1 truncate text-xs text-slate-600">{attachment.name}</span>
                <button onClick={() => setAttachment(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, false)}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={!connected || uploading || !!attachment}
                className="flex-shrink-0 self-end rounded-xl border border-indigo-100 bg-white p-3 text-slate-400 transition hover:text-indigo-500 disabled:opacity-40"
              >
                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Paperclip className="h-5 w-5" />}
              </button>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.message}
                rows={3}
                disabled={!connected || !!attachment}
                className="flex-1 resize-none rounded-xl border border-indigo-100 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
              />
              <button
                onClick={handleSend}
                disabled={!connected || uploading || (!text.trim() && !attachment)}
                className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-3 text-white transition hover:bg-indigo-600 disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            {!connected && (
              <p className="mt-2 text-xs text-slate-400">
                {t.connecting}
              </p>
            )}
          </div>
        ) : (
          <div className="border-t border-indigo-50 p-4 text-center">
            <p className="text-sm text-slate-500">{t.loginToChat}</p>
            <button
              onClick={openLogin}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-600"
            >
              <Lock className="h-4 w-4" />
              {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
            </button>
          </div>
        )}
      </div>
    </div>

    {pendingDelete && (
      <ConfirmModal
        variant="delete"
        message={t.confirmDelete}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    )}
  </>
  );
}
