import { ResultSetHeader, RowDataPacket, FieldPacket } from "mysql2";
import promisePool  from '../../lib/db'


const createComNotification = async (userId: number, notiContent: string, refId: number) => {
  try {
    await promisePool.query(
      `INSERT INTO Notifications (user_id, notification_type, notification_content, reference_id, read_status)
      VALUES (?, 'COMMENT', ?, ?, FALSE)`,
      [userId, notiContent, refId]
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const createLiNotification = async (userId: number, notiContent: string, refId: number) => {
  try {
    await promisePool.query(
    `INSERT INTO Notifications (user_id, notification_type, notification_content, reference_id, read_status)
    VALUES (?, 'LIKE', ?, ?, FALSE)`,
    [userId, notiContent, refId]
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createFolNotification = async (userId: number, notiContent: string, refId: number) => {
  try {
    await promisePool.query(
    `INSERT INTO Notifications (user_id, notification_type, notification_content, reference_id, read_status)
    VALUES (?, 'FOLLOW', ?, ?, FALSE)`,
    [userId, notiContent, refId]
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const fetchNotificationsById = async (userId: number) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Notifications WHERE user_id = ?',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const markNotiAsRead = async (notiId: number) => {
  try {
    await promisePool.query(
      'UPDATE Notifications SET read_status = TRUE WHERE notification_id = ?',
      [notiId]
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const deleteNotification = async (notiId: number) => {
  try {
    await promisePool.query(
      'DELETE FROM Notifications WHERE notification_id = ?',
      [notiId]
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const getUnreadNotificationsCount = async (userId: number) => {
  try {
    const query = `
      SELECT COUNT(*) AS count
      FROM Notifications
      WHERE read_status = FALSE
      AND user_id = ?
    `;
    const [rows] = await promisePool.query<RowDataPacket[]>(query, [userId]);
    if (rows.length > 0) {
      return rows[0].count;
    } else {
      return 0;
    }
  } catch (e) {
    console.error('Error fetching unread notifications count:', e);
    throw e;
  }
};


export { createComNotification, createLiNotification, createFolNotification, fetchNotificationsById, markNotiAsRead, deleteNotification, getUnreadNotificationsCount };
