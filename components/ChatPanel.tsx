"use client";

import { CheckCheck, ChevronLeft, FileText, Loader2, MessageCircle, Paperclip, Send, Users, Wifi, WifiOff, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';
import { useError } from '@/context/ErrorContext';
import { chatTabState } from '@/lib/chatTabState';
import { AdminChatMessage, ChatMessageDeletedPayload, ChatMessageEditedPayload, ChatRoomSummary, UserChatMessage } from '@/types/chat';
import { uploadChatFile } from '@/service/upload';
import ChatBubble from './project/ChatBubble';
import ConfirmModal from './Modal/ConfirmModal';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
type Attachment = { url: string; previewUrl?: string; type: 'image' | 'pdf'; name: string };

export default function ChatPanel() {
  const { username, token, isAdmin } = useAuth();
  const { showError } = useError();

  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  // ── user state ─────────────────────────────────────────────────────────────
  const [userMessages, setUserMessages] = useState<UserChatMessage[]>([]);
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [readByAdmin, setReadByAdmin] = useState(false);
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [uploading, setUploading] = useState(false);

  // ── admin state ────────────────────────────────────────────────────────────
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [adminMessages, setAdminMessages] = useState<AdminChatMessage[]>([]);
  const [adminUnread, setAdminUnread] = useState<Record<string, number>>({});
  const [adminText, setAdminText] = useState('');
  const [adminAttachment, setAdminAttachment] = useState<Attachment | null>(null);
  const [adminUploading, setAdminUploading] = useState(false);

  // ── shared state ───────────────────────────────────────────────────────────
  const [menuForMessage, setMenuForMessage] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; isAdmin: boolean } | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const openRef = useRef(false);
  const selectedRoomRef = useRef<string | null>(null);
  const roomKeyRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { openRef.current = open; if (open && !isAdmin) setUnread(0); }, [open, isAdmin]);
  useEffect(() => { selectedRoomRef.current = selectedRoom; }, [selectedRoom]);
  useEffect(() => { roomKeyRef.current = roomKey; }, [roomKey]);

  useEffect(() => {
    if (!token) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    const socket = io(SOCKET_URL, { auth: { token }, transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit(isAdmin ? 'admin_join' : 'user_join');
    });
    socket.on('disconnect', () => { setConnected(false); if (!isAdmin) setRoomKey(null); });

    if (!isAdmin) {
      socket.on('room_joined', ({ roomKey: rk, messages: msgs }: { roomKey: string; messages: UserChatMessage[] }) => {
        setRoomKey(rk);
        setUserMessages(msgs);
        const lastUserMsg = [...msgs].reverse().find((m) => !m.isAdmin);
        setReadByAdmin(lastUserMsg?.isRead ?? false);
      });
      socket.on('new_message', (msg: UserChatMessage) => {
        setUserMessages((prev) => [...prev, msg]);
        if (!msg.isAdmin) setReadByAdmin(false);
        if (!openRef.current && !chatTabState.active && msg.isAdmin) setUnread((n) => n + 1);
      });
      socket.on('messages_read', () => {
        setReadByAdmin(true);
        setUserMessages((prev) => prev.map((m) => (!m.isAdmin ? { ...m, isRead: true } : m)));
      });
      socket.on('message_deleted', ({ roomKey: rk, messageId }: ChatMessageDeletedPayload) => {
        if (roomKeyRef.current === rk) setUserMessages((prev) => prev.filter((m) => m.id !== messageId));
      });
      socket.on('message_edited', ({ roomKey: rk, messageId, content }: ChatMessageEditedPayload) => {
        if (roomKeyRef.current === rk)
          setUserMessages((prev) => prev.map((m) => m.id === messageId ? { ...m, content, updatedAt: new Date() } : m));
      });
    }

    if (isAdmin) {
      socket.on('room_list', (list: ChatRoomSummary[]) => {
        setRooms(list);
        const counts: Record<string, number> = {};
        list.forEach((r) => { if (r.unreadCount > 0) counts[r.roomKey] = r.unreadCount; });
        setAdminUnread(counts);
      });
      socket.on('room_created', (room: ChatRoomSummary) => setRooms((prev) => [room, ...prev]));
      socket.on('room_history', ({ roomKey: rk, messages: msgs }: { roomKey: string; messages: AdminChatMessage[] }) => {
        if (selectedRoomRef.current === rk) setAdminMessages(msgs);
      });
      socket.on('room_read', ({ roomKey: rk }: { roomKey: string }) => {
        setAdminUnread((prev) => { const next = { ...prev }; delete next[rk]; return next; });
      });
      socket.on('new_message', (msg: AdminChatMessage) => setAdminMessages((prev) => [...prev, msg]));
      socket.on('message_deleted', ({ roomKey: rk, messageId, lastMessage }: ChatMessageDeletedPayload) => {
        if (selectedRoomRef.current === rk) setAdminMessages((prev) => prev.filter((m) => m.id !== messageId));
        setRooms((prev) => prev.map((r) => r.roomKey === rk ? { ...r, lastMessage } : r));
        setAdminUnread((prev) => {
          if (!prev[rk]) return prev;
          const next = { ...prev };
          if (next[rk] <= 1) delete next[rk]; else next[rk]--;
          return next;
        });
      });
      socket.on('room_new_message', (msg: AdminChatMessage & { roomKey: string }) => {
        setRooms((prev) => prev.map((r) =>
          r.roomKey === msg.roomKey
            ? { ...r, lastMessage: { sender: msg.sender, content: msg.content, createdAt: msg.createdAt } }
            : r
        ));
        if (msg.roomKey !== selectedRoomRef.current && msg.roomKey !== chatTabState.adminRoom) {
          setAdminUnread((prev) => ({ ...prev, [msg.roomKey]: (prev[msg.roomKey] ?? 0) + 1 }));
        }
      });
      socket.on('message_edited', ({ roomKey: rk, messageId, content }: ChatMessageEditedPayload) => {
        if (selectedRoomRef.current === rk)
          setAdminMessages((prev) => prev.map((m) => m.id === messageId ? { ...m, content, updatedAt: new Date() } : m));
      });
    }

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setUserMessages([]);
      setAdminMessages([]);
      setConnected(false);
      setRoomKey(null);
      setRooms([]);
      setSelectedRoom(null);
      setAdminUnread({});
      setUnread(0);
      setReadByAdmin(false);
    };
  }, [token, isAdmin]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userMessages, adminMessages, open]);

  function formatTime(d: string | Date) {
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, forAdmin: boolean) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) { showError('ขนาดไฟล์ต้องไม่เกิน 10 MB'); return; }
    const setLoad = forAdmin ? setAdminUploading : setUploading;
    const setAttach = forAdmin ? setAdminAttachment : setAttachment;
    setLoad(true);
    try {
      const result = await uploadChatFile(file);
      const type: 'image' | 'pdf' = file.type.startsWith('image/') ? 'image' : 'pdf';
      setAttach({ url: result.url, previewUrl: type === 'image' ? URL.createObjectURL(file) : undefined, type, name: file.name });
    } catch (err) {
      showError(err instanceof Error ? err.message : 'อัปโหลดไฟล์ไม่สำเร็จ');
    } finally {
      setLoad(false);
    }
  }

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

  function openRoom(rk: string) {
    if (selectedRoom && selectedRoom !== rk) socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
    setSelectedRoom(rk);
    setAdminMessages([]);
    setAdminUnread((prev) => { const next = { ...prev }; delete next[rk]; return next; });
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
    } else { return; }
    socketRef.current.emit('send_message', { roomKey: selectedRoom, content, fileUrl, fileName });
    setRooms((prev) => prev.map((r) =>
      r.roomKey === selectedRoom
        ? { ...r, lastMessage: { sender: username ?? '', content: content || '📎 ไฟล์แนบ', createdAt: new Date() } }
        : r
    ));
  }

  function handleAdminKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdminSend(); }
  }

  function handleDeleteMessage(id: string) { setMenuForMessage(null); setPendingDelete({ id, isAdmin: false }); }
  function handleAdminDeleteMessage(id: string) { setMenuForMessage(null); setPendingDelete({ id, isAdmin: true }); }

  function confirmDelete() {
    if (!pendingDelete || !socketRef.current) return;
    const rk = pendingDelete.isAdmin ? selectedRoomRef.current : roomKeyRef.current;
    if (!rk) return;
    socketRef.current.emit('delete_message', { roomKey: rk, messageId: pendingDelete.id });
    setPendingDelete(null);
  }

  function handleEditMessage(id: string, content: string) {
    if (!socketRef.current || !roomKey) return;
    socketRef.current.emit('edit_message', { roomKey, messageId: id, content });
  }

  function handleAdminEditMessage(id: string, content: string) {
    if (!socketRef.current || !selectedRoom) return;
    socketRef.current.emit('edit_message', { roomKey: selectedRoom, messageId: id, content });
  }

  function closePanel() {
    setOpen(false);
    if (isAdmin && selectedRoom) {
      socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
      setSelectedRoom(null);
      setAdminMessages([]);
    }
  }

  if (!token) return null;

  const badge = isAdmin ? Object.values(adminUnread).reduce((a, b) => a + b, 0) : unread;
  const lastUserMsgIndex = !isAdmin
    ? userMessages.reduceRight((found, _, i) => (found === -1 && !userMessages[i].isAdmin ? i : found), -1)
    : -1;
  const activeRoomUsername = rooms.find((r) => r.roomKey === selectedRoom)?.username;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {open && (
          <div className={`flex flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/60 ring-1 ring-indigo-100/60 ${
            isAdmin ? 'h-[520px] w-[680px] max-w-[calc(100vw-3rem)]' : 'h-[500px] w-[360px] max-w-[calc(100vw-3rem)]'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                {isAdmin && selectedRoom && (
                  <button onClick={closeRoom} className="rounded-lg p-1 transition hover:bg-white/20">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                <span className="text-sm font-semibold">
                  {isAdmin ? (selectedRoom ? `@${activeRoomUsername ?? selectedRoom}` : 'Admin Chat') : 'แชตกับ Admin'}
                </span>
                <span className={`ml-1 flex items-center rounded-full px-2 py-0.5 text-xs ${connected ? 'bg-white/20' : 'bg-white/10 opacity-60'}`}>
                  {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                </span>
              </div>
              <button onClick={closePanel} className="rounded-lg p-1 text-white/80 transition hover:bg-white/20 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {isAdmin ? (
              /* ── ADMIN BODY ── */
              <div className="flex flex-1 overflow-hidden">
                {/* Room list */}
                <div className={`flex w-48 flex-shrink-0 flex-col border-r border-indigo-50 ${selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
                  <div className="flex items-center gap-2 border-b border-indigo-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Users className="h-3 w-3" />
                    ห้องแชต ({rooms.length})
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {rooms.length === 0 ? (
                      <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">ยังไม่มีผู้ใช้เข้ามาแชต</div>
                    ) : (
                      rooms.map((room) => (
                        <button
                          key={room.roomKey}
                          onClick={() => openRoom(room.roomKey)}
                          className={`w-full px-3 py-2.5 text-left transition hover:bg-indigo-50 ${selectedRoom === room.roomKey ? 'border-r-2 border-indigo-500 bg-indigo-50' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate text-sm font-medium text-slate-800">{room.username}</span>
                            {(adminUnread[room.roomKey] ?? 0) > 0 && (
                              <span className="ml-1 flex-shrink-0 rounded-full bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                {adminUnread[room.roomKey]}
                              </span>
                            )}
                          </div>
                          {room.lastMessage && (
                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {room.lastMessage.sender === username ? 'You: ' : ''}{room.lastMessage.content || '📎 ไฟล์แนบ'}
                            </p>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Admin chat area */}
                <div className={`flex flex-1 flex-col ${!selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
                  {!selectedRoom ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-slate-400">เลือกห้องแชตเพื่อดูข้อความ</div>
                  ) : (
                    <>
                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                        {adminMessages.length === 0 ? (
                          <div className="flex flex-1 items-center justify-center text-xs text-slate-400">ยังไม่มีข้อความ</div>
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
                              deleteLabel="ลบข้อความ"
                            />
                          ))
                        )}
                        <div ref={bottomRef} />
                      </div>
                      <div className="flex flex-col gap-2 border-t border-indigo-50 p-2">
                        {adminAttachment && (
                          <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-slate-50 px-3 py-1.5">
                            {adminAttachment.type === 'image' && adminAttachment.previewUrl ? (
                              <img src={adminAttachment.previewUrl} alt="preview" className="h-8 w-8 rounded-lg object-cover" />
                            ) : (
                              <FileText className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                            )}
                            <span className="flex-1 truncate text-xs text-slate-600">{adminAttachment.name}</span>
                            <button onClick={() => setAdminAttachment(null)} className="text-slate-400 hover:text-slate-600">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <input ref={adminFileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, true)} />
                          <button
                            onClick={() => adminFileInputRef.current?.click()}
                            disabled={!connected || adminUploading || !!adminAttachment}
                            className="flex-shrink-0 self-end rounded-xl border border-indigo-100 bg-white p-2 text-slate-400 transition hover:text-indigo-500 disabled:opacity-40"
                          >
                            {adminUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                          </button>
                          <textarea
                            value={adminText}
                            onChange={(e) => setAdminText(e.target.value)}
                            onKeyDown={handleAdminKeyDown}
                            placeholder="พิมพ์ข้อความ..."
                            rows={2}
                            disabled={!!adminAttachment}
                            className="flex-1 resize-none rounded-xl border border-indigo-100 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
                          />
                          <button
                            onClick={handleAdminSend}
                            disabled={!connected || adminUploading || (!adminText.trim() && !adminAttachment)}
                            className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:opacity-40"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* ── USER BODY ── */
              <>
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                  {userMessages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-slate-400">ยังไม่มีข้อความ ทักทายได้เลย!</div>
                  ) : (
                    userMessages.map((msg, i) => {
                      const isMe = msg.sender === username && !msg.isAdmin;
                      return (
                        <div key={msg.id} className="flex flex-col">
                          <ChatBubble
                            content={msg.content}
                            fileUrl={msg.fileUrl}
                            fileName={msg.fileName}
                            updatedAt={msg.updatedAt}
                            senderLabel={`${msg.isAdmin ? 'Admin · ' : ''}${msg.sender} · ${formatTime(msg.createdAt)}`}
                            isMine={isMe}
                            menuOpen={menuForMessage === msg.id}
                            onToggleMenu={() => setMenuForMessage((prev) => (prev === msg.id ? null : msg.id))}
                            onDelete={isMe ? () => handleDeleteMessage(msg.id) : undefined}
                            onSaveEdit={isMe ? (c) => handleEditMessage(msg.id, c) : undefined}
                            deleteLabel="ลบข้อความ"
                          />
                          {isMe && i === lastUserMsgIndex && (
                            <span className={`flex items-center justify-end gap-0.5 text-[10px] ${readByAdmin ? 'text-indigo-400' : 'text-slate-300'}`}>
                              <CheckCheck className="h-3 w-3" />
                              {readByAdmin ? 'อ่านแล้ว' : 'ส่งแล้ว'}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                  <div ref={bottomRef} />
                </div>
                <div className="border-t border-indigo-50 p-3">
                  {attachment && (
                    <div className="mb-2 flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-1.5">
                      {attachment.type === 'image' && attachment.previewUrl ? (
                        <img src={attachment.previewUrl} alt="preview" className="h-8 w-8 rounded-lg object-cover" />
                      ) : (
                        <FileText className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                      )}
                      <span className="flex-1 truncate text-xs text-slate-600">{attachment.name}</span>
                      <button onClick={() => setAttachment(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, false)} />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={!connected || uploading || !!attachment}
                      className="flex-shrink-0 self-end rounded-xl border border-indigo-100 bg-white p-2 text-slate-400 transition hover:text-indigo-500 disabled:opacity-40"
                    >
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                    </button>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="พิมพ์ข้อความ..."
                      rows={2}
                      disabled={!connected || !!attachment}
                      className="flex-1 resize-none rounded-xl border border-indigo-100 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!connected || uploading || (!text.trim() && !attachment)}
                      className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-300/60 transition hover:scale-105 hover:shadow-xl"
          aria-label="Toggle chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          {badge > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </button>
      </div>

      {pendingDelete && (
        <ConfirmModal
          variant="delete"
          message="ยืนยันการลบข้อความนี้หรือไม่?"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
}
