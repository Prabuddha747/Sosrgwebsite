import { apiFetch } from '../httpClient';
import type { ConversationListResult, MessagingService } from './types';

export const apiMessagingService: MessagingService = {
  async listConversations(params = {}) {
    return apiFetch<ConversationListResult>('/v1/conversations', { query: { ...params } });
  },
};
