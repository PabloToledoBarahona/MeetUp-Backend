import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const sendInvitationEmail = async (to: string, eventName: string, invitedName: string) => {
  const mailOptions = {
    from: `"MeetUp Invitaciones" <${process.env.EMAIL_FROM}>`,
    to,
    subject: `Estás invitado a ${eventName}`,
    html: `
      <p>Hola <b>${invitedName}</b>,</p>
      <p>Has sido invitado a participar en el evento <strong>${eventName}</strong>.</p>
      <p>Por favor confirma tu asistencia dentro de la app MeetUp.</p>
      <p>Gracias,<br/>Equipo MeetUp</p>
    `
  }

  return transporter.sendMail(mailOptions)
}