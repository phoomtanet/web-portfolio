import { useState } from 'react';
import { FileText, MoreHorizontal, Pencil, Trash2, X } from 'lucide-react';

interface Props {
  content: string;
  fileUrl?: string | null;
  fileName?: string | null;
  updatedAt?: string | Date | null;
  senderLabel: string;
  isMine: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onDelete?: () => void;
  deleteLabel: string;
  onSaveEdit?: (newContent: string) => void;
}

function FilePreviewModal({ url, onClose }: { url: string; onClose: () => void }) {
  const isPdf = /\.pdf(\?|$)/i.test(url);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative max-h-full max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {isPdf ? (
          <iframe
            src={url}
            className="h-[85vh] w-full rounded-xl bg-white"
            title="PDF Preview"
          />
        ) : (
          <img
            src={url}
            alt="รูปภาพ"
            className="mx-auto block max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        )}
      </div>
    </div>
  );
}

function MessageContent({ content, fileUrl, fileName }: { content: string; fileUrl?: string | null; fileName?: string | null }) {
  const [preview, setPreview] = useState(false);

  if (fileUrl) {
    const isPdf = /\.pdf(\?|$)/i.test(fileUrl);
    if (isPdf) {
      const filename = fileName ?? fileUrl.split('/').pop()?.split('?')[0] ?? 'ไฟล์ PDF';
      return (
        <>
          <button
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 text-left underline-offset-2 hover:underline"
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span className="break-all text-sm">{filename}</span>
          </button>
          {preview && <FilePreviewModal url={fileUrl} onClose={() => setPreview(false)} />}
        </>
      );
    }
    return (
      <>
        <img
          src={fileUrl}
          alt="รูปภาพ"
          className="max-w-full cursor-pointer rounded-xl transition hover:opacity-90"
          style={{ maxHeight: 240 }}
          onClick={() => setPreview(true)}
        />
        {preview && <FilePreviewModal url={fileUrl} onClose={() => setPreview(false)} />}
      </>
    );
  }
  return <>{content}</>;
}

export default function ChatBubble({
  content,
  fileUrl,
  fileName,
  updatedAt,
  senderLabel,
  isMine,
  menuOpen,
  onToggleMenu,
  onDelete,
  deleteLabel,
  onSaveEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

  function startEdit() {
    setEditText(content);
    setIsEditing(true);
    if (menuOpen) onToggleMenu();
  }

  function saveEdit() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== content) onSaveEdit?.(trimmed);
    setIsEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(); }
    if (e.key === 'Escape') setIsEditing(false);
  }

  const canEdit = !!onSaveEdit && !fileUrl;

  return (
    <div className={`flex flex-col gap-0.5 ${isMine ? 'items-end' : 'items-start'}`}>
      <span className="text-[10px] text-slate-400">{senderLabel}</span>
      <div className={`flex w-full items-start gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
          isMine
            ? 'rounded-tr-sm bg-indigo-500 text-white shadow-indigo-200'
            : 'rounded-tl-sm bg-slate-100 text-slate-800'
        }`}>
          {isEditing ? (
            <div className="flex flex-col gap-1.5">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                rows={2}
                autoFocus
                className={`w-full resize-none rounded-lg px-2 py-1 text-sm outline-none ${
                  isMine ? 'bg-indigo-400 text-white placeholder:text-indigo-200' : 'bg-white text-slate-800'
                }`}
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => setIsEditing(false)}
                  className={`rounded-lg px-2 py-0.5 text-xs transition ${
                    isMine ? 'bg-indigo-400 text-white hover:bg-indigo-300' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  ยกเลิก
                </button>
                <button
                  onClick={saveEdit}
                  disabled={!editText.trim() || editText.trim() === content}
                  className={`rounded-lg px-2 py-0.5 text-xs font-medium transition disabled:opacity-50 ${
                    isMine ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-500 text-white hover:bg-indigo-600'
                  }`}
                >
                  บันทึก
                </button>
              </div>
            </div>
          ) : (
            <>
              <MessageContent content={content} fileUrl={fileUrl} fileName={fileName} />
              {updatedAt && (
                <span className={`mt-0.5 block text-[10px] ${isMine ? 'text-indigo-200' : 'text-slate-400'}`}>
                  (แก้ไขแล้ว)
                </span>
              )}
            </>
          )}
        </div>
        {(onDelete || canEdit) && (
          <div className="relative">
            <button
              type="button"
              onClick={onToggleMenu}
              className="rounded-full p-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500"
              aria-label="Message actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-7 z-10 min-w-[140px] rounded-xl border border-slate-100 bg-white text-left text-sm shadow">
                {canEdit && (
                  <button
                    onClick={startEdit}
                    className="flex w-full items-center gap-2 px-4 py-2 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-500"
                  >
                    <Pencil className="h-4 w-4" />
                    แก้ไข
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="flex w-full items-center gap-2 px-4 py-2 text-slate-600 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleteLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
