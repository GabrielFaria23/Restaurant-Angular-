import {Request, Response} from 'express'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken'

export const handleAuthentication = (req: Request, resp: Response)=>{
    const user = req.body
    if(isValid(user)){
        const dbUser: User = users[user.email]
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, 'meat-api-password') //sub: portador do token iss: quem esta emitindo o token, password para assinar o token (não compartilhaa token com cliente assim fica mais seguro)
        resp.json({name: dbUser.name, email:dbUser.email, accessToken: token})
    }else{
        resp.status(403).json({message: 'Dados inválidos.'})
    }

    function isValid(user: User): boolean {
        if (!user){
            return false
        }
        const dbUser = users[user.email]
        return dbUser !== undefined && dbUser.matches(user)
    }
}