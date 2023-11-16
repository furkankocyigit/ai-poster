import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';
import { diContainer } from '../../config/inversify.config';
import { CONTROLLERS } from '../../config/identifiers';

const chatRoutes = Router();
const chatController = diContainer.get<ChatController>(CONTROLLERS.ChatController);

chatRoutes.post('/', chatController.getChatResponse);

export default chatRoutes;
