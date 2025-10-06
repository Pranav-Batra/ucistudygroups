const express = require('express')
const db = require('../config/db')
const router = express.Router()
const ensureAuthenticated = require('../middleware/auth')

router.get('/:id', async (req, res) => {
    const profileID = req.params.id
    try
    {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [profileID])
        res.json(user.rows[0])
    }
    catch (err)
    {
        // console.error("Error: ", err)
        res.status(500).send("Internal server error.")
    }
})

router.put('/:id', ensureAuthenticated, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // logged-in user
  
    // Only allow user to edit their own profile
    if (parseInt(id) !== userId) {
      return res.status(403).json({ error: 'Unauthorized: cannot edit this profile.' });
    }
  
    const { email, username, discord, instagram, phone_number, reddit } = req.body;
  
    try {
      const updateQuery = `
        UPDATE users
        SET 
          email = COALESCE($1, email),
          username = COALESCE($2, username),
          discord = COALESCE($3, discord),
          instagram = COALESCE($4, instagram),
          phone_number = COALESCE($5, phone_number),
          reddit = COALESCE($6, reddit)
        WHERE id = $7
        RETURNING id, email, username, discord, instagram, phone_number, reddit;
      `;
  
      const values = [email, username, discord, instagram, phone_number, reddit, id];
  
      const result = await db.query(updateQuery, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      // console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Server error updating profile.' });
    }
  });
  
  module.exports = router;