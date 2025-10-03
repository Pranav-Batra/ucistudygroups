const express = require('express')
const db = require('../config/db')
router = express.Router()

router.get('/', async (req, res) => {
    var query = 'SELECT * FROM study_groups ORDER BY created_at DESC'
    try
    {
        const result = await db.query(query)
        res.json(result.rows)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal server error.")
    }
})


router.post('/new', async (req, res) => {
    const {department, classCode, professor, maxMembers, description} = req.body
    const userID = req.user.id 
    try
    {
        const newStudyGroup = await db.query(`INSERT INTO study_groups 
        (department, class_code, professor, max_members, description, user_id, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
        [department, classCode, professor, maxMembers, description, userID])
        res.json(newStudyGroup.rows)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error.")
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    var userPostedID = await db.query('SELECT user_id FROM study_groups WHERE id=$1', [id])
    userPostedID = userPostedID.rows[0].user_id
    if (req.user.id !== userPostedID)
    {
        res.status(404).send("Invalid permissions.")
        return
    }
    try
    {
        const deletedGroup = await db.query('DELETE FROM study_groups WHERE id=$1 RETURNING *', [id])
        console.log(deletedGroup.rows)
        res.status(200).send("Successfully deleted item.")
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal server error.")
    }
})

module.exports = router;