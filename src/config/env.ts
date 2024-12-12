export const config = {
  port: process.env.PORT || 3000,
  oneSignal: {
    appId: process.env.ONESIGNAL_APP_ID || '',
    restApiKey: process.env.ONESIGNAL_REST_API_KEY || '',
  },
};
