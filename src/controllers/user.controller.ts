import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import User from '../models/user.model'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body)
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body)
    res.status(200).json({ token })
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}


export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.id

    const user = await User.findById(userId).select('-password')

    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      return
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor' })
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('_id name email')
    res.status(200).json({ success: true, data: users })
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message })
  }
}