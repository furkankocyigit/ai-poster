import { Request, Response, NextFunction } from 'express';
import { IgApiClient } from 'instagram-private-api';
import OpenAI from 'openai';
import sharp from 'sharp';
const { get } = require('request-promise');
import 'dotenv/config';
import { EnvExporter } from '../../utils/EnvExporter';
import { IPictureGeneratorService } from '../../domain.services/IPictureGeneratorService';
import { diContainer } from '../../config/inversify.config';
import { SERVICES } from '../../config/identifiers';

const defaultTags = ' #ai #aipictures #generatedbyai ';
const IG_USERNAME = EnvExporter.export('IG_USERNAME');
const IG_PASSWORD = EnvExporter.export('IG_PASSWORD');

export class PictureController {
    private pictureGeneratorService: IPictureGeneratorService;
    private ig: IgApiClient;

    constructor() {
        this.pictureGeneratorService = diContainer.get<IPictureGeneratorService>(SERVICES.PictureGeneratorService);
        this.ig = new IgApiClient();
        this.ig.state.generateDevice(IG_USERNAME);
    }

    postPicture = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { creationText } = req.body;
            const pictureUrl = await this.pictureGeneratorService.generatePictureUrl(creationText);
            const imageBuffer = await get({
                url: pictureUrl,
                encoding: null,
            });
            const resizedPictureBuffer = await sharp(imageBuffer).resize(1696, 1064).jpeg().toBuffer();
            await this.ig.account.login(IG_USERNAME, IG_PASSWORD);
            await this.ig.publish.photo({
                file: resizedPictureBuffer,
                caption: creationText + defaultTags,
            });
            res.send('picture is shared: ' + pictureUrl);
        } catch (err) {
            next(err);
        }
    };
}
