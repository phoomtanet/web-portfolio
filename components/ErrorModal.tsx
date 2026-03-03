"use client";

import { AlertTriangle, X } from 'lucide-react';

interface Props {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-red-100 bg-white p-6 shadow-2xl shadow-red-100/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon + title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-4 ring-red-100">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">เกิดข้อผิดพลาด</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{message}</p>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-400 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
