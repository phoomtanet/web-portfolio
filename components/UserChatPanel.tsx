"use client";

import { CheckCheck, MessageCircle, Send, Wifi, WifiOff, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';
import { chatTabState } from '@/lib/chatTabState';

interface ChatMessage {
  id: string;
  sender: string;
  isAdmin: boolean;
  content: string;
  isRead: boolean;
  createdAt: string | Date;
}

export default function UserChatPanel() {
  const { username, token, isAdmin } = useAuth();

  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [unread, setUnread] = useState(0);
  const [readByAdmin, setReadByAdmin] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const openRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    if (!token || isAdmin) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('user_join');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      setRoomKey(null);
    });

    socket.on('room_joined', ({ roomKey: rk, messages: msgs }: { roomKey: string; messages: ChatMessage[] }) => {
      setRoomKey(rk);
      setMessages(msgs);
      const lastUserMsg = [...msgs].reverse().find((m) => !m.isAdmin);
      setReadByAdmin(lastUserMsg?.isRead ?? false);
    });

    socket.on('new_message', (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      if (!msg.isAdmin) setReadByAdmin(false);
      if (!openRef.current && !chatTabState.active && msg.isAdmin) setUnread((n) => n + 1);
    });

    socket.on('messages_read', () => {
      setReadByAdmin(true);
      setMessages((prev) => prev.map((m) => (!m.isAdmin ? { ...m, isRead: true } : m)));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setMessages([]);
      setConnected(false);
      setRoomKey(null);
      setUnread(0);
      setReadByAdmin(false);
    };
  }, [token, isAdmin]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function handleSend() {
    if (!socketRef.current || !roomKey || !text.trim()) return;
    socketRef.current.emit('send_message', { roomKey, content: text.trim() });
    setText('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function formatTime(d: string | Date) {
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const lastUserMsgIndex = messages.reduceRight(
    (found, _, i) => (found === -1 && !messages[i].isAdmin ? i : found), -1
  );

  if (!token || isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="flex h-[480px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm font-semibold">แชตกับ Admin</span>
              <span className={`flex items-center rounded-full px-2 py-0.5 text-xs ${connected ? 'bg-white/20' : 'bg-white/10 opacity-60'}`}>
                {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
            {messages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
                ยังไม่มีข้อความ ทักทายได้เลย!
              </div>
            ) : (
              messages.map((msg, i) => {
                const isMe = msg.sender === username && !msg.isAdmin;
                const isLastUserMsg = i === lastUserMsgIndex;
                return (
                  <div key={msg.id} className={`flex flex-col gap-0.5 ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-400">
                      {msg.isAdmin ? 'Admin · ' : ''}{msg.sender} · {formatTime(msg.createdAt)}
                    </span>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      isMe
                        ? 'rounded-tr-sm bg-indigo-500 text-white shadow-indigo-200'
                        : 'rounded-tl-sm bg-slate-100 text-slate-800'
                    }`}>
                      {msg.content}
                    </div>
                    {isMe && isLastUserMsg && (
                      <span className={`flex items-center gap-0.5 text-[10px] ${readByAdmin ? 'text-indigo-400' : 'text-slate-300'}`}>
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

          {/* Input */}
          <div className="flex gap-2 border-t border-indigo-50 p-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="พิมพ์ข้อความ..."
              rows={2}
              disabled={!connected}
              className="flex-1 resize-none rounded-xl border border-indigo-100 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={!connected || !text.trim()}
              className="flex-shrink-0 self-end rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-300/60 transition hover:scale-105 hover:shadow-xl"
        aria-label="Toggle chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>
    </div>
  );
}
