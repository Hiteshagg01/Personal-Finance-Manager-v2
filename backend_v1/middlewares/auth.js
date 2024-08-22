import { verifyToken } from "../configs/jwt.js"

export const checkAuth = (req ,res, next) => {
    if (req.isAuthenticated()) {
        const token = req.headers.authorization?.split(' ')[1]
        
        if(!token) {
            return res.status(401).json({message : 'Unauthorized, please login first'})
        }
        const verify = verifyToken(token)     
        if(!verify) {
            return res.status(401).json({message : 'Unauthorized, please login first'})
        }
        next()
    } else {
        return res.status(401).json({message : 'Unauthorized, please login first'})
    }
} 

export const checkUnAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({message : 'You are already logged in'})
    } else {
        next()
    }
}