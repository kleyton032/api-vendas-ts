import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string
}

class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<IResponse> {
 
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);
        
        if (!user) {
            
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const confirmedPassword = await compare(password, user.password);

        if (!confirmedPassword) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const token = sign({}, 'ff28c933bcfbe947de0332297edf0f15', {
            subject: user.id,
            expiresIn: '1d', 
        })

        return {
            user,
            token
        };
    }
}

export default CreateSessionService;