export interface NotificationPayload {
  userIds: string[];
  eventTitle: string;
  groupName: string;
}

export interface OneSignalNotification {
  app_id: string;
  contents: {
    en: string;
    ja: string;
  };
  include_external_user_ids: string[];
}

export interface NotificationResponse {
  id: string;
  recipients: number;
  external_id?: string;
}
