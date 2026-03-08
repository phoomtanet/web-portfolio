export interface BaseChatMessage {
  id: string;
  sender: string;
  isAdmin: boolean;
  content: string;
  fileUrl?: string | null;
  fileName?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date | null;
}

export interface AdminChatMessage extends BaseChatMessage {
  roomId: string;
}

export interface UserChatMessage extends BaseChatMessage {
  isRead: boolean;
}

export type ProjectChatMessage = BaseChatMessage;

export interface ChatRoomSummary {
  roomKey: string;
  username: string;
  createdAt: string | Date;
  unreadCount: number;
  lastMessage: { sender: string; content: string; createdAt: string | Date } | null;
}

export interface ChatMessageDeletedPayload {
  messageId: string;
  roomKey: string;
  lastMessage: { sender: string; content: string; createdAt: string | Date } | null;
}

export interface ChatMessageEditedPayload {
  messageId: string;
  roomKey: string;
  content: string;
}
