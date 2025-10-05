const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const db = require('../config/db')

let transporter

(async () => {
    const testAccount = await nodemailer.createTestAccount(); // 🔥 generates valid creds
  
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("Ethereal test account ready!");
  console.log("Login:", testAccount.user);
  console.log("Password:", testAccount.pass);
}
)()
// Wrap in an async IIFE so we can use await.

router.post('/:id', async (req, res) => {
    console.log(req.body)
    const groupID = req.params.id
    const {meetingTime, description} = req.body
    const date = new Date(meetingTime)

    const local = date.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles', // optional, force specific tz
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

    try
    {
        const result = await db.query(`
        SELECT * FROM users 
        JOIN group_members ON users.id = group_members.member_id
        JOIN study_groups ON group_members.study_group_id = study_groups.id
        WHERE study_groups.id = $1`, [groupID])
        const group_name = await db.query(`
        SELECT department, class_code FROM study_groups WHERE id=$1`, [groupID])
        const department = group_name.rows[0].department
        const class_code = group_name.rows[0].class_code

        const members = result.rows
        if (members.length === 0)
        {
            return res.status(404).send("A group needs members to send a message.")
        }
        
        const emailPromises = members.map((member) => {
            const mailOptions = {
                from: '"UCI Study Groups" <ucistudygroups@etheral.email>',
                to: member.email,
                subject: `New Meeting Scheduled`,
                text: `Hello ${member.username || ''},\n\nA new meeting has been scheduled for your group "${department} ${class_code}".\n\n🗓️ Date: ${local}\n📝 Description: ${description}\n\nSee you there!`,
                html: `
                <p>Hello <strong>${member.username || ''}<strong>,</p>
                <p>A new meeting has been scheduled for your group <b>${department} ${class_code}</b>.</p>
                <p><b>🗓️ Date:</b> ${local}<br/>
                <b>📝 Description:</b> ${description}</p>
                <p>See you there!</p>
                `
            }

            return transporter.sendMail(mailOptions)
        })

        const results = await Promise.all(emailPromises)
        const previewLinks = results.map(info => nodemailer.getTestMessageUrl(info));

        console.log("Preview links:", previewLinks);
            res.status(200).json({
            message: "Meeting created and emails sent successfully.",
            previewLinks, // You can open these in browser to view emails
            });


    }
    catch (err)
    {
        res.status(500).json({message: `failed to send emails dickhead. ${err}`})
    }
})

module.exports = router;