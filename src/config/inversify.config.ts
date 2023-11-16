import 'reflect-metadata';
import { Container } from 'inversify';
import { IPictureRepository } from '../infrastructure/IPictureRepository';
import { CONSTANTS, CONTROLLERS, INSTANCES, REPOSITORIES, SERVICES } from './identifiers';
import { EnvExporter } from '../utils/EnvExporter';
import OpenAI from 'openai';
import { OpenAIPicturRepository } from '../infrastructure/OpenAIPictureRepository';
import { IPictureGeneratorService } from '../domain.services/IPictureGeneratorService';
import { PictureGeneratorService } from '../domain.services/PictureGeneratorService';
import { IPostRepository } from '../infrastructure/IPostRepository';
import { InstagramPostRepository } from '../infrastructure/InstagramRepository';
import { IgApiClient } from 'instagram-private-api';
import { IPostService } from '../domain.services/IPostService';
import { PostService } from '../domain.services/PostService';
import { PictureController } from '../application/controllers/PictureController';
import { ChatController } from '../application/controllers/ChatController';

const OPENAI_API_KEY = EnvExporter.export('OPENAI_API_KEY');
const IG_USERNAME = EnvExporter.export('IG_USERNAME');
const IG_PASSWORD = EnvExporter.export('IG_PASSWORD');

const diContainer = new Container();

diContainer.bind<string>(CONSTANTS.IG_USERNAME).toConstantValue(IG_USERNAME);
diContainer.bind<string>(CONSTANTS.IG_PASSWORD).toConstantValue(IG_PASSWORD);

diContainer.bind<OpenAI>(INSTANCES.OpenAIClient).toConstantValue(new OpenAI({ apiKey: OPENAI_API_KEY }));
diContainer.bind<IgApiClient>(INSTANCES.IgApiClient).toConstantValue(new IgApiClient());

diContainer.bind<IPictureRepository>(REPOSITORIES.OpenAIPictureRepository).to(OpenAIPicturRepository).inSingletonScope();
diContainer.bind<IPictureGeneratorService>(SERVICES.PictureGeneratorService).to(PictureGeneratorService).inSingletonScope();

diContainer.bind<IPostRepository>(REPOSITORIES.PostRepository).to(InstagramPostRepository).inSingletonScope();
diContainer.bind<IPostService>(SERVICES.PostService).to(PostService).inSingletonScope();

diContainer.bind<PictureController>(CONTROLLERS.PictureController).to(PictureController).inSingletonScope();
diContainer.bind<ChatController>(CONTROLLERS.ChatController).to(ChatController).inSingletonScope();

export { diContainer };
