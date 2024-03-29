import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns'
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    token: string,
    password: string,
}

class ResetPasswordService {

    public async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists.');
        }

        const user = await userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) throw new AppError('User does not exists.');

        user.password = await hash(password, 8);

        await userRepository.save(user);

    }
}

export default ResetPasswordService;