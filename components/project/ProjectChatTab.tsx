"use client";

import { ChevronLeft, Lock, Send, Users, Wifi, WifiOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/i18n/LangContext';
import { chatTabState } from '@/lib/chatTabState';
import { ChatRoomSummary, ProjectChatMessage } from '@/types/chat';

const tx = {
  en: {
    title: 'Chat with Admin',
    subtitle: "Have a question? I'll respond shortly.",
    empty: 'No messages yet. Say hello!',
    hint: 'Enter to send · Shift+Enter for new line',
    send: 'Send',
    message: 'Type your message...',
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

  // ── user state ────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<ProjectChatMessage[]>([]);
  const [text, setText] = useState('');
  const [roomKey, setRoomKey] = useState<string | null>(null);

  // ── admin state ───────────────────────────────────────────────────────────
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [adminMessages, setAdminMessages] = useState<ProjectChatMessage[]>([]);
  const [adminText, setAdminText] = useState('');
  const [unread, setUnread] = useState<Record<string, number>>({});

  // ── shared state ──────────────────────────────────────────────────────────
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const selectedRoomRef = useRef<string | null>(null);
  const userMessagesRef = useRef<HTMLDivElement>(null);
  const adminMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

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

  // ── user handlers ─────────────────────────────────────────────────────────
  function handleSend() {
    if (!socketRef.current || !roomKey || !text.trim()) return;
    socketRef.current.emit('send_message', { roomKey, content: text.trim() });
    setText('');
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
    if (!socketRef.current || !selectedRoom || !adminText.trim()) return;
    const content = adminText.trim();
    socketRef.current.emit('send_message', { roomKey: selectedRoom, content });
    setAdminText('');
    setRooms((prev) =>
      prev.map((r) =>
        r.roomKey === selectedRoom
          ? { ...r, lastMessage: { sender: username ?? '', content, createdAt: new Date() } }
          : r
      )
    );
  }

  function handleAdminKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdminSend(); }
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-indigo-600">{t.rooms}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{rooms.length} ห้องที่ active</p>
          </div>
          {statusBadge}
        </div>

        <div className="flex h-[480px] overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm sm:h-[560px]">
          {/* Room list */}
          <div className={`flex w-48 flex-shrink-0 flex-col border-r border-indigo-50 ${selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
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
          <div className={`flex flex-1 flex-col ${!selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
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

                <div ref={adminMessagesRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                  {adminMessages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-xs text-slate-400">
                      {t.noMessages}
                    </div>
                  ) : (
                    adminMessages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col gap-0.5 ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-slate-400">
                          {msg.sender} · {formatTime(msg.createdAt)}
                        </span>
                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                          msg.isAdmin
                            ? 'rounded-tr-sm bg-indigo-500 text-white shadow-indigo-200'
                            : 'rounded-tl-sm bg-slate-100 text-slate-800'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2 border-t border-indigo-50 p-3">
                  <textarea
                    value={adminText}
                    onChange={(e) => setAdminText(e.target.value)}
                    onKeyDown={handleAdminKeyDown}
                    placeholder={t.message}
                    rows={2}
                    className="flex-1 resize-none rounded-xl border border-indigo-100 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleAdminSend}
                    disabled={!adminText.trim()}
                    className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── USER VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-600">{t.title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
        </div>
        {statusBadge}
      </div>

      <div ref={userMessagesRef} className="flex min-h-[300px] flex-col gap-3 overflow-y-auto rounded-2xl border border-indigo-100 bg-slate-50/60 p-4 sm:min-h-[400px]">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">{t.empty}</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === username && !msg.isAdmin;
            return (
              <div key={msg.id} className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-xs text-slate-400">
                  {msg.isAdmin ? `${t.admin} · ` : ''}{msg.sender} · {formatTime(msg.createdAt)}
                </span>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  isMe
                    ? 'rounded-tr-sm bg-indigo-500 text-white shadow-indigo-200'
                    : 'rounded-tl-sm border border-slate-100 bg-white text-slate-800 shadow-slate-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      {username ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.message}
              rows={3}
              disabled={!connected}
              className="flex-1 resize-none rounded-xl border border-indigo-100 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={!connected || !text.trim()}
              className="flex h-fit items-center gap-2 self-end rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-600 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              {t.send}
            </button>
          </div>
          <p className="text-xs text-slate-400">{t.hint}</p>
        </div>
      ) : (
        <button
          onClick={openLogin}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 py-3 text-sm font-semibold text-indigo-500 transition hover:bg-indigo-100"
        >
          <Lock className="h-4 w-4" />
          {t.loginToChat}
        </button>
      )}
    </div>
  );
}
