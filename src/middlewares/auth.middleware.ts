import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ success: false, message: 'Token no proporcionado' })
    return
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      res.status(403).json({ success: false, message: 'Token inválido' })
      return
    }

    // @ts-ignore: lo asignamos temporalmente al objeto request
    req.user = user
    next()
  })
}