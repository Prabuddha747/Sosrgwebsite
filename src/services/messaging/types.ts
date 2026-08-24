// Verified live against https://SosrG-api-292824095440.asia-south1.run.app —
// GET /v1/conversations returns { items: [], nextCursor: null } for a fresh
// account with no conversations, so the populated shape below is inferred
// from the real DB schema (conversations/conversation_members tables in
// SosrGBackend/database/migrations/000003_workflows_community.sql), NOT
// confirmed against a real populated response. In particular, whether the
// other participant's display name/avatar comes denormalized on the
// conversation object, or only as a bare profile ID needing a separate
// lookup, is unverified — see doc/API_REQUIREMENTS.md. Code defensively
// against both until a populated example can be checked.
export interface ConversationParticipant {
  profileId: string;
  displayName?: string;
  username?: string;
  profileImagePath?: string | null;
}

export interface Conversation {
  id: string;
  conversationType: 'direct' | 'group';
  participants?: ConversationParticipant[];
  lastMessageAt?: string | null;
  createdAt: string;
}

export interface ConversationListResult {
  items: Conversation[];
  nextCursor: string | null;
}

// SendMessageDto's fields are published; the response body isn't. Couldn't
// verify against a real populated response this session — starting a NEW
// conversation requires the two profiles to already be "connected"
// (POST /v1/conversations/direct 403s without it, curl-verified), and
// there's no connections/follow endpoint anywhere in the API to satisfy
// that from a test account. Typed from SendMessageDto + REST convention;
// flag in doc/API_REQUIREMENTS.md if a populated response shows otherwise.
export interface Message {
  id: string;
  conversationId: string;
  senderProfileId: string;
  body: string;
  replyToMessageId: string | null;
  mediaAssetIds: string[];
  createdAt: string;
}

export interface MessageListResult {
  items: Message[];
  nextCursor: string | null;
}

export interface SendMessageInput {
  body: string;
  replyToMessageId?: string;
  mediaAssetIds?: string[];
}

export interface MessagingService {
  listConversations(params?: { limit?: number; cursor?: string }): Promise<ConversationListResult>;
  getMessages(conversationId: string, params?: { limit?: number; cursor?: string }): Promise<MessageListResult>;
  sendMessage(conversationId: string, input: SendMessageInput): Promise<Message>;
  markConversationRead(conversationId: string): Promise<void>;
}
