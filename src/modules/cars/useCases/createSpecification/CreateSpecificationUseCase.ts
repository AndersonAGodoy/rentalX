import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
	name: string;
	description: string;
}

class CreateSpecificationUseCase {
	constructor(private specificationsRepository: ISpecificationRepository) {}
	execute({ name, description }: IRequest): void {
		const specificcationAlreadyExists = this.specificationsRepository.findByName(name);

		if (specificcationAlreadyExists) {
			throw new Error('Specification already exists!');
		}

		this.specificationsRepository.create({
			name,
			description
		});
	}
}

export { CreateSpecificationUseCase };
