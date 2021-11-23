import { Router } from 'express';
import multer from 'multer';
import { CreateUSerController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUSerAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUSerController();
const updateUSerAvatarController = new UpdateUSerAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUSerAvatarController.handle);

export { usersRoutes };
