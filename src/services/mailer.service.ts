import nodemailer from 'nodemailer'
import { config } from '../config/config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailFrom,
    pass: config.emailPassword
  }
})

export const sendInvitationEmail = async (
  to: string,
  subject: string,
  htmlBody: string,
  guestId?: string
) => {
  let fullHtml = htmlBody

  if (guestId) {
    const confirmUrl = `${config.baseUrl}/api/guests/confirm/${guestId}/attending`
    const rejectUrl = `${config.baseUrl}/api/guests/confirm/${guestId}/not_attending`

    fullHtml += `
      <p style="margin-top:20px;">
        ¿Podrás asistir al evento?
        <br/>
        <a href="${confirmUrl}" style="color:green;">Sí, asistiré</a> |
        <a href="${rejectUrl}" style="color:red;">No podré asistir</a>
      </p>
    `
  }

  return transporter.sendMail({
    from: `"MeetUp Invitaciones" <${config.emailFrom}>`,
    to,
    subject,
    html: fullHtml
  })
}