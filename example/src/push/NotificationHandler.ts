// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

class NotificationHandler {
  _onNotification: ((notification: Omit<ReceivedNotification, "userInfo">) => void) | undefined
  _onRegister: ((token: { os: string; token: string })=>void) | undefined

  onNotification(notification: Omit<ReceivedNotification, "userInfo">) {
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token: { os: string; token: string }) {
    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
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