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

router.get('/usergroups', async (req, res) => {
    const userID = req.user.id
    try
    {
        const result = await db.query(`SELECT * FROM study_groups 
        JOIN group_members ON study_groups.id = group_members.study_group_id 
        WHERE group_members.member_id = $1`, [userID])
        res.json(result.rows)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("internal server error.")
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
        newGroupID = newStudyGroup.rows[0].id
        const addCreator = await db.query(`INSERT INTO group_members
        (study_group_id, member_id, member_status, created_at)
        VALUES ($1, $2, $3, NOW())`, [newGroupID, userID, 'admin'])
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

router.get('/:id/detail', async (req, res) => {
    const groupID = req.params.id
    try
    {
        userID = null
        if (req.user)
        {
            userID = req.user.id
        }
        const groupInfo = await db.query("SELECT * FROM study_groups WHERE id=$1", [groupID])
        const groupMembers = await db.query(`
        SELECT * FROM users 
        JOIN group_members ON users.id = group_members.member_id
        JOIN study_groups ON group_members.study_group_id = study_groups.id
        WHERE study_groups.id = $1`, [groupID])
        let userPartOf = false
        if (Number.isInteger(userID))
        {
            const userInGroup = await db.query(
                `SELECT EXISTS (SELECT 1 FROM group_members 
                WHERE study_group_id = $1 AND member_id=$2)`, [groupID, userID])
            if (userInGroup.rows && userInGroup.rows.length > 0)
            {
                userPartOf =  userInGroup.rows[0].exists
            }
        }
        res.json({
            groupInfo: groupInfo.rows[0],
            groupMembers: groupMembers.rows,
            userInGroup: userPartOf
        }
        )
    }
    catch (err)
    {
        console.log('Error: ', err)
        res.status(500).send("Internal Server Error.")
    }
})

router.post('/:id/join', async (req, res) => {
    const groupID = req.params.id
    const userJoiningID = req.user.id
    let userOwns = false
    console.log("JOINING GROUP.")
    try
    {
        const memberRes = await db.query(`SELECT COUNT(*) from group_members WHERE study_group_id = $1`, [groupID])
        const limitRes = await db.query('SELECT max_members FROM study_groups WHERE id=$1', [groupID])
        console.log(`memberRes: `)
        console.dir(memberRes.rows[0])
        console.log('limitres: ')
        console.dir(limitRes.rows[0])
        if (memberRes.rows[0].count >= limitRes.rows[0].max_members)
        {
            return res.status(404).send("Invalid permissions. This group is full.")
        }
        const result = await db.query("SELECT EXISTS (SELECT 1 FROM study_groups WHERE id=$1 AND user_id=$2)", [groupID, userJoiningID])
        if (result.rows && result.rows.length > 0)
        {
            console.log(`Result stuff: ${result.rows}`)
            userOwns = result.rows[0].exists
            console.log(`User owns this group: ${userOwns}`)
        }
        const userStatus = userOwns ? 'admin' : 'normal'
        const newMember = await db.query(
        `INSERT INTO group_members 
        (study_group_id, member_id, member_status, created_at)
        VALUES ($1, $2, $3, NOW()) RETURNING *`, [groupID, userJoiningID, userStatus])
        res.json(newMember.rows)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal server error. ")
    }

})

router.delete('/:id/join', async (req, res) => {
    const groupID = req.params.id
    const userID = req.user.id
    console.log("DELETING FROM GROPU.")
    try
    {
        const result = await db.query(`DELETE FROM group_members
        WHERE study_group_id=$1 AND member_id=$2 RETURNING *`, [groupID, userID])
        res.json(result.rows)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server error. ")
    }
})

module.exports = router;