import { Router } from 'express';
import { PictureController } from '../controllers/PictureController';

const pictureRoutes = Router();
const pictureController = new PictureController();

pictureRoutes.post('/', pictureController.postPicture);

export default pictureRoutes;
