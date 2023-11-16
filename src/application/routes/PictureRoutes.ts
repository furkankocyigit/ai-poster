import { Router } from 'express';
import { PictureController } from '../controllers/PictureController';
import { diContainer } from '../../config/inversify.config';
import { CONTROLLERS } from '../../config/identifiers';

const pictureRoutes = Router();

const pictureController = diContainer.get<PictureController>(CONTROLLERS.PictureController);

pictureRoutes.post('/', pictureController.postPicture);

export default pictureRoutes;
