import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

class NotificationHandler {
  _onNotification: ((notification: Omit<ReceivedNotification, "userInfo">) => void) | undefined
  _onRegister: ((token: { os: string; token: string })=>void) | undefined

  onNotification(notification: Omit<ReceivedNotification, "userInfo">) {
    console.log('NotificationHandler:', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token: { os: string; token: string }) {
    console.log('NotificationHandler:', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification: ReceivedNotification) {
    console.log ('Notification action received:');
    console.log(notification.action);
    console.log(notification);

    if(notification.action === 'Yes') {
      //PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err: any) {
    console.log(err);
  }
  
  attachRegister(handler: (token: { os: string; token: string })=>void) {
    this._onRegister = handler;
  }

  attachNotification(handler: (notification: Omit<ReceivedNotification, "userInfo">) => void) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

export default handler;