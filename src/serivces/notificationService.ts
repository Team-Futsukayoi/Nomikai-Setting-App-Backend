import axios from 'axios';
import { config } from '../config/env';
import {
  NotificationPayload,
  OneSignalNotification,
  NotificationResponse,
} from '../types/notification';
import { logger } from '../utils/logger';

export class NotificationService {
  private readonly baseUrl = 'https://onesignal.com/api/v1';

  async sendNotification(
    payload: NotificationPayload
  ): Promise<NotificationResponse> {
    const notification: OneSignalNotification = {
      app_id: config.oneSignal.appId,
      contents: {
        en: `New event "${payload.eventTitle}" created in ${payload.groupName}!`,
        ja: `${payload.groupName}で新しいイベント「${payload.eventTitle}」が作成されました！`,
      },
      include_external_user_ids: payload.userIds,
    };

    try {
      const response = await axios.post<NotificationResponse>(
        `${this.baseUrl}/notifications`,
        notification,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${config.oneSignal.restApiKey}`,
          },
        }
      );

      logger.info('Notification sent successfully', { id: response.data.id });
      return response.data;
    } catch (error) {
      logger.error('Failed to send notification', { error });
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
