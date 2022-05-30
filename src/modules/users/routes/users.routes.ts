import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserUpdateAvatar from '../controllers/UserFileController';

 const usersRouter = Router();

 const usersController = new UsersController();
 const UpdateUserAvatar = new UserUpdateAvatar();

 const upload = multer(uploadConfig);

 usersRouter.get('/', isAuthenticated, usersController.index);

 usersRouter.post('/', celebrate({
     [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
     },
 }),
 usersController.create,
 );

 usersRouter.patch(
     '/avatar',
     isAuthenticated,
    upload.single('avatar'),
    UpdateUserAvatar.updade,
 )



 export default usersRouter;