import { RequestHandler } from 'express';
import { NotificationPayload } from '../types/notification';
import { logger } from '../utils/logger';
import { notificationService } from '@/serivces/notificationService';

export class NotificationController {
  public sendNotification: RequestHandler = async (req, res) => {
    try {
      const payload = req.body as NotificationPayload;

      if (!this.validatePayload(payload)) {
        res.status(400).json({ error: 'Invalid payload' });
        return;
      }

      const result = await notificationService.sendNotification(payload);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Error in notification controller', { error });
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  private validatePayload(payload: NotificationPayload): boolean {
    return !!(
      payload.userIds?.length &&
      payload.eventTitle &&
      payload.groupName
    );
  }
}

export const notificationController = new NotificationController();
