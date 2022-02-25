import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	id: string;
}

@injectable()
class DeleteCarUseCase {
	constructor(@inject('CarsRepository') private carsRepository: ICarsRepository) {}
	async execute({ id }: IRequest): Promise<void> {
		const car = await this.carsRepository.findById(id);

		if (car.available === false) {
			throw new AppError('This car can not be deleted, make sure that it is not rented before try again', 406);
		}

		console.log(car);
		await this.carsRepository.deleteCar(id);
	}
}

export { DeleteCarUseCase };
