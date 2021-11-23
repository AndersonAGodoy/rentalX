import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepostory';

class UsersRepository implements IUsersRepository {
	private repositoy: Repository<User>;

	constructor() {
		this.repositoy = getRepository(User);
	}

	async create({ id, name, email, driver_license, password, avatar }: ICreateUserDTO): Promise<void> {
		const user = this.repositoy.create({
			id,
			name,
			email,
			driver_license,
			password,
			avatar
		});

		await this.repositoy.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repositoy.findOne({ email });
		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repositoy.findOne(id);
		return user;
	}
}

export { UsersRepository };
