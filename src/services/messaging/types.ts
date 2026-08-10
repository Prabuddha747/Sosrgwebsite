// Verified live against https://sosrg-api-292824095440.asia-south1.run.app —
// GET /v1/conversations returns { items: [], nextCursor: null } for a fresh
// account with no conversations, so the populated shape below is inferred
// from the real DB schema (conversations/conversation_members tables in
// SosrgBackend/database/migrations/000003_workflows_community.sql), NOT
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

export interface MessagingService {
  listConversations(params?: { limit?: number; cursor?: string }): Promise<ConversationListResult>;
}
