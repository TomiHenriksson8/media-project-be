import { ResultSetHeader, RowDataPacket, FieldPacket } from "mysql2";
import promisePool  from '../../lib/db'

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

const followersCountList = async (userId: number): Promise<number> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      'SELECT COUNT(follower_id) AS count FROM UserFollows WHERE following_id = ?',
      [userId]
    );
    return rows[0].count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const followingCountList = async (userId: number): Promise<number> => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      'SELECT COUNT(following_id) AS count FROM UserFollows WHERE follower_id = ?',
      [userId]
    );
    return rows[0].count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkFollow = async (followerId: number, followingId: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      'SELECT * FROM UserFollows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    if (rows.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export { addFollow, deleteFollow, followersList, followingList, followersCountList, followingCountList, checkFollow}
