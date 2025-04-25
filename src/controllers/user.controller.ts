import { Request, Response } from 'express'
import * as userService from '../services/user.service'

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