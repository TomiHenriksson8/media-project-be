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



const followersList =  async (userId: number) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT follower_id, followed_at FROM UserFollows WHERE following_id = ?',
      [userId]
    )
    return rows;
  } catch (error) {
    console.error(error)
    throw error
  }
};


const followingList = async (userId: number) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT following_id FROM UserFollows WHERE follower_id = ?',
      [userId]
    )
    return rows;
  } catch (error) {
    console.error(error)
    throw error
  }
};


export { addFollow, deleteFollow, followersList, followingList }
