import { ResultSetHeader, RowDataPacket, FieldPacket } from "mysql2";
import { TokenContent } from "@sharedTypes/DBTypes";
import promisePool  from '../../lib/db'
import { UserFollows } from '@sharedTypes/DBTypes'; // use this

const addFollow = async (followerId: number, followingId: number) => {
  try {
    await promisePool.query(
      'INSERT INTO UserFollows (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    return true;
  } catch (error) {
    console.error(error);
    throw error
    return false;
  }
}

const deleteFollow = async (followerId: number, followingId: number) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM UserFollows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    ) as [ResultSetHeader, FieldPacket[]];

    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const followersList = async (userId: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT Users.user_id, Users.username
       FROM UserFollows
       JOIN Users ON UserFollows.follower_id = Users.user_id
       WHERE UserFollows.following_id = ?`,
      [userId]
    );

    const mappedRows = rows.map(row => ({
      userId: row.user_id.toString(),
      username: row.username,
    }));
    return mappedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const followingList = async (userId: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT Users.user_id, Users.username
       FROM UserFollows
       JOIN Users ON UserFollows.following_id = Users.user_id
       WHERE UserFollows.follower_id = ?`,
      [userId]
    );
    const mappedRows = rows.map(row => ({
      userId: row.user_id.toString(),
      username: row.username,
    }));
    return mappedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export { addFollow, deleteFollow, followersList, followingList }
