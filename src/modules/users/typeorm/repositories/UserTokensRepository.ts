import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        })

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const token = await this.create({
            user_id,
        })

        await this.save(token)

        return token;
    }

}