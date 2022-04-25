import { Request, Response } from "express";
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
    
    public async create (request: Request, reponse: Response ): Promise<Response>{
        const {email, password} = request.body;

        const creationSession = new CreateSessionService();

        const user = await creationSession.execute({
            email,
            password
        })
        
        return reponse.json(user);
    }
}
