import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
	name: string;
	description: string;
}
@injectable()
class CreateSpecificationUseCase {
	constructor(@inject('SpecificationsRepository') private specificationsRepository: ISpecificationRepository) {}
	async execute({ name, description }: IRequest): Promise<void> {
		const specificcationAlreadyExists = await this.specificationsRepository.findByName(name);

		if (specificcationAlreadyExists) {
			throw new Error('Specification already exists!');
		}

		await this.specificationsRepository.create({
			name,
			description
		});
	}
}

export { CreateSpecificationUseCase };
