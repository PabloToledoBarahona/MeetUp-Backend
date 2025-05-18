import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const sendInvitationEmail = async (to: string, subject: string, htmlBody: string) => {
  const mailOptions = {
    from: `"MeetUp Invitaciones" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html: htmlBody
  }

  return transporter.sendMail(mailOptions)
}