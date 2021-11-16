import { Router } from 'express';
import { CreateUSerController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUSerController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
