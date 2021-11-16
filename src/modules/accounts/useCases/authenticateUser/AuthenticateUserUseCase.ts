import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/IUsersRepostory';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error('Email or Password incorrect!');
		}

		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new Error('Email or Password incorrect!');
		}

		const token = sign({}, '6788e0c18c6755ec06af01ca88ef9658', {
			subject: user.id,
			expiresIn: '1d'
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		};

		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };
