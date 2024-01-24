import { ResultSetHeader, RowDataPacket, FieldPacket } from 'mysql2'
import promisePool from '../../lib/db'


const searchForUser = async (searchTerm: string) => {
  try {
    const [results] = await promisePool.query(
      'SELECT user_id, username FROM Users WHERE username LIKE ?',
      [`%${searchTerm}%`]
    );

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export { searchForUser }
