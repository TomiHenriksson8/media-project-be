import { Notification } from '@sharedTypes/DBTypes';
import { createNotification, getNotifications, markNotificationAsRead } from "../models/notificationModel"


export default {
  Query: {
    getNotifications: async (_parent: undefined, args: {user_id : number}) => {
      return await getNotifications(args.user_id)
    },
  },
  Mutation: {
    createNotification: async (_parent: undefined, args: {input: Omit<Notification, 'created_at' | 'notification_id' | 'read_status' >}) => {
      console.log(args.input);
      return await createNotification(args.input);
    },
    markNotificationAsRead: async (_parent: undefined, args: {notification_id: number}) => {
      return await markNotificationAsRead(args.notification_id);
    },
  },

}
