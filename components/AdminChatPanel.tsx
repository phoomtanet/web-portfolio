"use client";

import { ChevronLeft, MessageCircle, Send, Users, Wifi, WifiOff, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';
import { chatTabState } from '@/lib/chatTabState';
import { AdminChatMessage, ChatMessageDeletedPayload, ChatRoomSummary } from '@/types/chat';

export default function AdminChatPanel() {
  const { isAdmin, token, username } = useAuth();

  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const [text, setText] = useState('');
  const [unread, setUnread] = useState<Record<string, number>>({});

  const socketRef = useRef<Socket | null>(null);
  const selectedRoomRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // keep ref in sync with state (for use inside socket callbacks)
  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

  useEffect(() => {
    if (!isAdmin || !token) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('admin_join');
    });

    socket.on('disconnect', () => setConnected(false));

    socket.on('room_list', (list: ChatRoomSummary[]) => {
      setRooms(list);
      const counts: Record<string, number> = {};
      list.forEach((r) => { if (r.unreadCount > 0) counts[r.roomKey] = r.unreadCount; });
      setUnread(counts);
    });

    socket.on('room_created', (room: ChatRoomSummary) => {
      setRooms((prev) => [room, ...prev]);
    });

    socket.on('room_history', ({ roomKey, messages: msgs }: { roomKey: string; messages: AdminChatMessage[] }) => {
      if (selectedRoomRef.current === roomKey) {
        setMessages(msgs);
      }
    });

    socket.on('room_read', ({ roomKey: rk }: { roomKey: string }) => {
      setUnread((prev) => { const next = { ...prev }; delete next[rk]; return next; });
    });

    socket.on('new_message', (msg: AdminChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('message_deleted', ({ roomKey, lastMessage }: ChatMessageDeletedPayload) => {
      setRooms((prev) =>
        prev.map((r) => r.roomKey === roomKey ? { ...r, lastMessage } : r)
      );
      setUnread((prev) => {
        if (!prev[roomKey]) return prev;
        const next = { ...prev };
        if (next[roomKey] <= 1) delete next[roomKey];
        else next[roomKey]--;
        return next;
      });
    });

    socket.on('room_new_message', (msg: AdminChatMessage & { roomKey: string }) => {
      setRooms((prev) =>
        prev.map((r) =>
          r.roomKey === msg.roomKey
            ? { ...r, lastMessage: { sender: msg.sender, content: msg.content, createdAt: msg.createdAt } }
            : r
        )
      );
      if (msg.roomKey !== selectedRoomRef.current && msg.roomKey !== chatTabState.adminRoom) {
        setUnread((prev) => ({ ...prev, [msg.roomKey]: (prev[msg.roomKey] ?? 0) + 1 }));
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAdmin, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function openRoom(roomKey: string) {
    if (selectedRoom && selectedRoom !== roomKey) {
      socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
    }
    setSelectedRoom(roomKey);
    setMessages([]);
    setUnread((prev) => { const next = { ...prev }; delete next[roomKey]; return next; });
    socketRef.current?.emit('admin_open_room', { roomKey });
  }

  function closeRoom() {
    if (selectedRoom) socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
    setSelectedRoom(null);
    setMessages([]);
  }

  function handleSend() {
    if (!socketRef.current || !selectedRoom || !text.trim()) return;
    const content = text.trim().replace(/\n+/g, ' ');
    socketRef.current.emit('send_message', { roomKey: selectedRoom, content });
    setText('');
    setRooms((prev) =>
      prev.map((r) =>
        r.roomKey === selectedRoom
          ? { ...r, lastMessage: { sender: username ?? '', content, createdAt: new Date() } }
          : r
      )
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatTime(d: string | Date) {
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);

  if (!isAdmin) return null;

  const activeRoomUsername = rooms.find((r) => r.roomKey === selectedRoom)?.username;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="flex h-[520px] w-[680px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              {selectedRoom && (
                <button
                  onClick={closeRoom}
                  className="rounded-lg p-1 transition hover:bg-white/20"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <span className="text-sm font-semibold">
                {selectedRoom ? `@${activeRoomUsername ?? selectedRoom}` : 'Admin Chat'}
              </span>
              <span className={`ml-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${connected ? 'bg-white/20' : 'bg-white/10 opacity-60'}`}>
                {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              </span>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                if (selectedRoom) {
                  socketRef.current?.emit('admin_leave_room', { roomKey: selectedRoom });
                }
                setSelectedRoom(null);
                setMessages([]);
              }}
              className="rounded-lg p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Room list */}
            <div className={`flex w-48 flex-shrink-0 flex-col border-r border-indigo-50 ${selectedRoom ? 'hidden sm:flex' : 'flex'}`}>
              <div className="flex items-center gap-2 border-b border-indigo-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Users className="h-3 w-3" />
                ห้องแชต ({rooms.length})
              </div>
              <div className="flex-1 overflow-y-auto">
                {rooms.length === 0 ? (
                  <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
                    ยังไม่มีผู้ใช้เข้ามาแชต
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
                  เลือกห้องแชตเพื่อดูข้อความ
                </div>
              ) : (
                <>
                  <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                    {messages.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center text-xs text-slate-400">
                        ยังไม่มีข้อความ
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col gap-0.5 ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                          <span className="text-[10px] text-slate-400">
                            {msg.sender} · {formatTime(msg.createdAt)}
                          </span>
                          <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                            msg.isAdmin
                              ? 'rounded-tr-sm bg-indigo-500 text-white shadow-indigo-200'
                              : 'rounded-tl-sm bg-slate-100 text-slate-800'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={bottomRef} />
                  </div>

                  <div className="flex gap-2 border-t border-indigo-50 p-2">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="พิมพ์ข้อความ..."
                      rows={2}
                      className="flex-1 resize-none rounded-xl border border-indigo-100 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!text.trim()}
                      className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:opacity-40"
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-300/60 transition hover:scale-105 hover:shadow-xl"
        aria-label="Toggle admin chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {totalUnread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>
    </div>
  );
}
