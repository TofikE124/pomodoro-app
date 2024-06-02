import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  requestPermission(): void {
    if (typeof window == 'undefined') return;
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.error('This browser does not support notifications.');
    }
  }

  showNotification(
    title: string,
    options?: NotificationOptions,
    duration: number = 5000
  ): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);

        // Close the notification after the specified duration
        setTimeout(() => {
          notification.close();
        }, duration);
      } else {
        console.error('Notification permission not granted.');
      }
    } else {
      console.error('This browser does not support notifications.');
    }
  }
}
