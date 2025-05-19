import dotenv from 'dotenv'
dotenv.config()

const required = (value: string | undefined, key: string): string => {
  if (!value) throw new Error(`La variable de entorno ${key} no está definida.`)
  return value
}

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: required(process.env.MONGO_URI, 'MONGO_URI'),
  jwtSecret: required(process.env.JWT_SECRET, 'JWT_SECRET'),
  emailFrom: required(process.env.EMAIL_FROM, 'EMAIL_FROM'),
  emailPassword: required(process.env.EMAIL_PASSWORD, 'EMAIL_PASSWORD'),
  baseUrl: required(process.env.BASE_URL, 'BASE_URL')
}