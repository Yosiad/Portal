const bcrypt = require('bcryptjs');

module.exports = (db) => {
  const User = {};

  User.create = async (user) => {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    try {
      const { rows } = await db.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
        [user.name, user.email, user.password, user.role]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }; 

  // ... other methods for user authentication, authorization, fetching profile details, etc.

  return User;
};
