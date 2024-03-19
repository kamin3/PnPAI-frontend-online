export interface Notification {
    state: NotificationState;
    message: string;
    date: Date;
    isRead: boolean;
    link: string;
    id: string;
}


export enum NotificationState {
    Success = 0,
    Error = 1
}