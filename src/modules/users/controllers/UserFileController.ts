import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";


export default class UserFileController{
    
    public async updade(request: Request, response: Response): Promise<Response>{
        
        const updateFile = new UpdateUserAvatarService();

        const user = updateFile.execute({
            user_id: request.user.id,
            fileName: request.file?.filename as string
        })

        return response.json(user);
        
    }

    

}