import promisePool from "../../lib/db";
import { Notification } from "@sharedTypes/DBTypes";
import { ResultSetHeader, RowDataPacket } from 'mysql2';


const createNotification = async (notification: Omit<Notification, 'created_at' | 'read_status' | 'notification_id' >): Promise<Notification> => {
    const [result] = await promisePool.query<ResultSetHeader>(
        `INSERT INTO Notifications (user_id, notification_type, notification_content, reference_id) VALUES (?, ?, ?, ?)`,
        [notification.user_id, notification.notification_type, notification.notification_content, notification.reference_id]
    );
    const insertId = result.insertId;
    const [newNotificationRows] = await promisePool.query<RowDataPacket[]>(
        `SELECT * FROM Notifications WHERE notification_id = ?`,
        [insertId]
    );
    return newNotificationRows[0] as Notification;
};


const getNotifications = async (user_id: number) => {
  const [rows] = await promisePool.query(
    `SELECT * FROM Notifications WHERE user_id = ? ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
};
const markNotificationAsRead = async (notification_id: number) => {
  await promisePool.query(
      `UPDATE Notifications SET read_status = TRUE WHERE notification_id = ?`,
      [notification_id]
  );
  const [updatedRows] = await promisePool.query<RowDataPacket[]>(
      `SELECT * FROM Notifications WHERE notification_id = ?`,
      [notification_id]
  );
  return updatedRows[0];
};



export { createNotification, getNotifications, markNotificationAsRead };
