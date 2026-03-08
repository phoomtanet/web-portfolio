"use client";

import { AlertTriangle, CheckCircle, Pencil, Trash2, X } from 'lucide-react';

type Variant = 'delete' | 'save' | 'edit';

interface Props {
  variant?: Variant;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const config: Record<Variant, {
  icon: React.ReactNode;
  iconBg: string;
  iconRing: string;
  confirmCls: string;
  defaultTitle: string;
  defaultConfirm: string;
}> = {
  delete: {
    icon: <Trash2 className="h-7 w-7 text-red-500" />,
    iconBg: 'bg-red-50',
    iconRing: 'ring-red-100',
    confirmCls: 'bg-gradient-to-r from-red-500 to-rose-400 shadow-red-200/70 hover:opacity-90',
    defaultTitle: 'ยืนยันการลบ',
    defaultConfirm: 'ลบ',
  },
  save: {
    icon: <CheckCircle className="h-7 w-7 text-emerald-500" />,
    iconBg: 'bg-emerald-50',
    iconRing: 'ring-emerald-100',
    confirmCls: 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-emerald-200/70 hover:opacity-90',
    defaultTitle: 'ยืนยันการบันทึก',
    defaultConfirm: 'บันทึก',
  },
  edit: {
    icon: <Pencil className="h-7 w-7 text-indigo-500" />,
    iconBg: 'bg-indigo-50',
    iconRing: 'ring-indigo-100',
    confirmCls: 'bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-indigo-200/70 hover:opacity-90',
    defaultTitle: 'ยืนยันการแก้ไข',
    defaultConfirm: 'แก้ไข',
  },
};

export default function ConfirmModal({
  variant = 'delete',
  title,
  message,
  confirmLabel,
  cancelLabel = 'ยกเลิก',
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const c = config[variant];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-40"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon + text */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className={`flex h-14 w-14 items-center justify-center rounded-full ring-4 ${c.iconBg} ${c.iconRing}`}>
            {c.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">{title ?? c.defaultTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60 ${c.confirmCls}`}
          >
            {loading ? 'กำลังดำเนินการ...' : (confirmLabel ?? c.defaultConfirm)}
          </button>
        </div>
      </div>
    </div>
  );
}
