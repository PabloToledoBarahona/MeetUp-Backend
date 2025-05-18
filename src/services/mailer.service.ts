import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

/**
 * Envía un correo de invitación con enlaces automáticos para confirmar o rechazar asistencia.
 * @param to Dirección de correo del invitado
 * @param subject Asunto del correo
 * @param htmlBody Contenido personalizado adicional del mensaje
 * @param guestId ID del invitado para generar los enlaces de confirmación
 */
export const sendInvitationEmail = async (
  to: string,
  subject: string,
  htmlBody: string,
  guestId?: string // opcional para que también funcione en recordatorios simples
) => {
  let fullHtml = htmlBody

  if (guestId && process.env.BASE_URL) {
    const confirmUrl = `${process.env.BASE_URL}/api/guests/confirm/${guestId}/attending`
    const rejectUrl = `${process.env.BASE_URL}/api/guests/confirm/${guestId}/not_attending`

    fullHtml += `
      <p style="margin-top:20px;">
        ¿Podrás asistir al evento?
        <br/>
        <a href="${confirmUrl}" style="color:green;">Sí, asistiré</a> |
        <a href="${rejectUrl}" style="color:red;">No podré asistir</a>
      </p>
    `
  }

  const mailOptions = {
    from: `"MeetUp Invitaciones" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html: fullHtml
  }

  return transporter.sendMail(mailOptions)
}