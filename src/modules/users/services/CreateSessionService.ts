import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);
        
        if (emailExists) {
            throw new AppError("Email adress is already use!");
        }

        const passwors_hash = await hash(password, 8);

        const user = userRepository.create({
            email,
            password : passwors_hash,
        });
        await userRepository.save(user);

        return user;
    }
}

export default CreateSessionService;