import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	});

	it('should not be able to add a new specification to an non-existent car', async () => {
		expect(async () => {
			const car_id = '1234';
			const specifications_id = [ '54321' ];

			await createCarSpecificationUseCase.execute({ car_id, specifications_id });
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to add a new specification to the car', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car1 2',
			description: 'Car description',
			daily_rate: 110.0,
			license_plate: 'DEF-1234',
			fine_amount: 40,
			brand: 'Car_brand_test',
			category_id: 'category_id'
		});

		const specification = await specificationsRepositoryInMemory.create({
			description: 'test',
			name: 'test'
		});

		const specifications_id = [ specification.id ];

		const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
		expect(specificationCars).toHaveProperty('specifications');
		expect(specificationCars.specifications.length).toBe(1);
	});
});
