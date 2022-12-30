import sgMail from '@sendgrid/mail'
import { SENDGRID_API_KEY, SENDGRID_FROM } from '../../constants'

sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (subject: string, to: string, html: string, text: string) => {
  await sgMail.send({
    to,
    from: SENDGRID_FROM,
    subject,
    html,
    text,
  })
}

export default sendEmail