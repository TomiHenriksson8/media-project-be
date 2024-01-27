import promisePool from '../../lib/db'


/**
 * Fetch users by a search term from the database.
 *
 * This function searches for users where the username matches the provided search term.
 * The search is performed using a SQL LIKE query, allowing for partial matches.
 *
 * @param { string }searchTerm
 * @returns {Promise<object[]>}
 * @throws {Error}
 *
 */

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

/**
 * Fetch media items by a search term from the database.
 *
 * This function searches for media items where the title matches the provided search term.
 * The search is performed using a SQL LIKE query, allowing for partial matches.
 *
 * @param {string} SearchTerm - The term used for searching in media item titles.
 * @returns {Promise<object[]>} - A promise that resolves to an array of objects, each representing a media item that matches the search term.
 * @throws {Error} - Throws an error if the database query fails.
 */

const fetchByMediaSeachTerm = async (SearchTerm : string) => {
  try {
    const [results] = await promisePool.query('SELECT title FROM MediaItems WHERE title = ?',
    [`%${SearchTerm}%`])

    return results;

  } catch (error) {
    console.error
    throw error
  }
}

const searchByUserAndMedia = async (searchTerm: string) => {
  try {
    const [users] = await promisePool.query(
      'SELECT user_id, username FROM Users WHERE username LIKE ?',
      [`%${searchTerm}%`]
    );

    const [mediaItems] = await promisePool.query(
      'SELECT media_id, title FROM MediaItems WHERE title LIKE ?',
      [`%${searchTerm}%`]
    );
    console.log("MediaItems: ", mediaItems);


    return { users, mediaItems };
  } catch (error) {
    console.error(error);
    throw error;
  }
};




export { searchForUser, fetchByMediaSeachTerm, searchByUserAndMedia }
