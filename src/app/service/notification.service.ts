import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly notifications = this._notifications.asObservable();
  
  constructor() { }

  addNotification(notification: string) {
    const currentNotifications = this._notifications.getValue();
    currentNotifications.push(notification);
    this._notifications.next(currentNotifications);
  }
}
