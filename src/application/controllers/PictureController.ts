import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
const { get } = require('request-promise');
import 'dotenv/config';
import { IPictureGeneratorService, IPostService } from '../../domain.services';
import { SERVICES } from '../../config/identifiers';
import { inject, injectable } from 'inversify';

@injectable()
export class PictureController {
    private pictureGeneratorService: IPictureGeneratorService;
    private postService: IPostService;

    constructor(
        @inject(SERVICES.PictureGeneratorService) pictureGeneratorService: IPictureGeneratorService,
        @inject(SERVICES.PostService) postService: IPostService
    ) {
        this.pictureGeneratorService = pictureGeneratorService;
        this.postService = postService;
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
            const postID = await this.postService.postPicture(resizedPictureBuffer, creationText);
            res.send('picture is shared with id: ' + postID + ' url: ' + pictureUrl);
        } catch (err) {
            next(err);
        }
    };
}
