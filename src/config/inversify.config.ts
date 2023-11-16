import 'reflect-metadata';
import { Container } from 'inversify';
import { IPictureRepository } from '../infrastructure/IPictureRepository';
import { INSTANCES, REPOSITORIES, SERVICES } from './identifiers';
import { EnvExporter } from '../utils/EnvExporter';
import OpenAI from 'openai';
import { OpenAIPicturRepository } from '../infrastructure/OpenAIPictureRepository';
import { IPictureGeneratorService } from '../domain.services/IPictureGeneratorService';
import { PictureGeneratorService } from '../domain.services/PictureGeneratorService';

const OPENAI_API_KEY = EnvExporter.export('OPENAI_API_KEY');

const diContainer = new Container();

diContainer.bind<OpenAI>(INSTANCES.OpenAIClient).toConstantValue(new OpenAI({ apiKey: OPENAI_API_KEY }));
diContainer.bind<IPictureRepository>(REPOSITORIES.OpenAIPictureRepository).to(OpenAIPicturRepository).inSingletonScope();
diContainer.bind<IPictureGeneratorService>(SERVICES.PictureGeneratorService).to(PictureGeneratorService).inSingletonScope();

export { diContainer };
