import { apiFetch } from '../httpClient';
import type { ConversationListResult, Message, MessageListResult, MessagingService, SendMessageInput } from './types';

export const apiMessagingService: MessagingService = {
  async listConversations(params = {}) {
    return apiFetch<ConversationListResult>('/v1/conversations', { query: { ...params } });
  },

  async getMessages(conversationId: string, params = {}) {
    return apiFetch<MessageListResult>(`/v1/conversations/${encodeURIComponent(conversationId)}/messages`, {
      query: { ...params },
    });
  },

  async sendMessage(conversationId: string, input: SendMessageInput) {
    return apiFetch<Message>(`/v1/conversations/${encodeURIComponent(conversationId)}/messages`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async markConversationRead(conversationId: string) {
    await apiFetch<void>(`/v1/conversations/${encodeURIComponent(conversationId)}/read`, { method: 'POST' });
  },
};
