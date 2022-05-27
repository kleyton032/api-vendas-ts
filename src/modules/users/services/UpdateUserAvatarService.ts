import AppError from "@shared/errors/AppError";
import path from "path";
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload';

interface IRequest {
    user_id: string;
    fileName: string;
}

class UpdateUserAvatarService {

    public async execute({ user_id, fileName  }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(user_id);
        
        if(!user){
            throw new AppError('User not found.!');
        }

        if(user.avatar) {
            const userFilePath = path.join(uploadConfig.directoty, user.avatar);

            const userFileExists = await fs.promises.stat(userFilePath);

            //case file for update, remove file old
            if(userFileExists) {
                await fs.promises.unlink(userFilePath);
            }
        }

        user.avatar = fileName;

        await userRepository.save(user);

        return user;
        
    }
}

export default UpdateUserAvatarService;