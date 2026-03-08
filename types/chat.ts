export interface BaseChatMessage {
  id: string;
  sender: string;
  isAdmin: boolean;
  content: string;
  createdAt: string | Date;
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
