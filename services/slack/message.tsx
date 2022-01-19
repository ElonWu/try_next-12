import { Message } from '@type/slack';
import { IronSession } from 'iron-session';
import { slackPost } from './base';

/**
 *
 * @param params
 * @returns Promise
 *
 * @description 发送信息
 */
export const postMessage = (params: any) =>
  slackPost(`/chat.postMessage`, params);

/**
 *
 * @param params
 * @returns Promise
 *
 * @description 对话历史
 */
export const getConversationHistory = (params: any) =>
  slackPost(`/conversations.history`, params);
