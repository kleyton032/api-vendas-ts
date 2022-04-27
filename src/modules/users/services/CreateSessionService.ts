import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
}

class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<User> {
 
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);
        
        if (!user) {
            console.log("chegou aqui");
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const confirmedPassword = await compare(password, user.password);

        if (!confirmedPassword) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        return user;
    }
}

export default CreateSessionService;