import 'reflect-metadata';
import { Container } from 'inversify';
import { CONSTANTS, CONTROLLERS, INSTANCES, REPOSITORIES, SERVICES } from './identifiers';
import OpenAI from 'openai';
import { IgApiClient } from 'instagram-private-api';
import { OpenAIPicturRepository, InstagramPostRepository, IPostRepository, IPictureRepository } from '../infrastructure';
import { IPictureGeneratorService, PictureGeneratorService, IPostService, PostService } from '../domain.services';
import { IPictureToBufferService, PictureToBufferService } from '../domain.services';
import { PictureController, ChatController } from '../application/controllers';
import { EnvExporter } from '../utils/EnvExporter';

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
diContainer.bind<IPictureToBufferService>(SERVICES.PictureToBufferService).to(PictureToBufferService).inSingletonScope();

diContainer.bind<PictureController>(CONTROLLERS.PictureController).to(PictureController).inSingletonScope();
diContainer.bind<ChatController>(CONTROLLERS.ChatController).to(ChatController).inSingletonScope();

export { diContainer };
