import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'

export const register = async ({ name, email, password }: any) => {
  const userExists = await User.findOne({ email })
  if (userExists) throw new Error('El correo ya está registrado')

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashedPassword })
  await user.save()
  return { id: user._id, email: user.email }
}

export const login = async ({ email, password }: any) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Credenciales inválidas')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Credenciales inválidas')

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' })
  return token
}