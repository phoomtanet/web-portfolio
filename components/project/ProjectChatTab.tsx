"use client";

import { Lock, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/i18n/LangContext';

interface Message {
  id: number;
  name: string;
  text: string;
  time: string;
}

const tx = {
  en: {
    title: 'Leave a Message',
    subtitle: "Have a question? I'll get back to you.",
    empty: 'No messages yet',
    hint: 'Enter to send · Shift+Enter for new line',
    send: 'Send',
    message: 'Type your message...',
    loginToChat: 'Login to send a message',
  },
  th: {
    title: 'ฝากข้อความ',
    subtitle: 'มีคำถาม? ฝากไว้ได้เลย',
    empty: 'ยังไม่มีข้อความ',
    hint: 'Enter เพื่อส่ง · Shift+Enter ขึ้นบรรทัดใหม่',
    send: 'ส่ง',
    message: 'พิมพ์ข้อความ...',
    loginToChat: 'เข้าสู่ระบบเพื่อส่งข้อความ',
  },
};

export default function ProjectChatTab() {
  const { lang } = useLang();
  const t = tx[lang];
  const { username, openLogin } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  function handleSend() {
    if (!username || !text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id: Date.now(), name: username, text: text.trim(), time }]);
    setText('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-indigo-600">{t.title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{t.subtitle}</p>
      </div>

      <div className="flex min-h-[300px] flex-col gap-3 overflow-y-auto rounded-2xl border border-indigo-100 bg-slate-50/60 p-4 sm:min-h-[400px]">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">{t.empty}</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-end gap-1">
              <span className="text-xs text-slate-400">{msg.name} · {msg.time}</span>
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-indigo-500 px-4 py-2.5 text-sm text-white shadow-sm shadow-indigo-200">
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
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
              className="flex-1 resize-none rounded-xl border border-indigo-100 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
            />
            <button onClick={handleSend} disabled={!text.trim()} className="flex h-fit items-center gap-2 self-end rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-600 disabled:opacity-40">
              <Send className="h-4 w-4" />
              {t.send}
            </button>
          </div>
          <p className="text-xs text-slate-400">{t.hint}</p>
        </div>
      ) : (
        <button onClick={openLogin} className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 py-3 text-sm font-semibold text-indigo-500 transition hover:bg-indigo-100">
          <Lock className="h-4 w-4" />
          {t.loginToChat}
        </button>
      )}
    </div>
  );
}
