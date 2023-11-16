import { Request, Response, NextFunction } from 'express';

import 'dotenv/config';
import { IPictureGeneratorService, IPictureToBufferService, IPostService } from '../../domain.services';
import { SERVICES } from '../../config/identifiers';
import { inject, injectable } from 'inversify';

@injectable()
export class PictureController {
    private pictureGeneratorService: IPictureGeneratorService;
    private postService: IPostService;
    private pictureToBufferService: IPictureToBufferService;

    constructor(
        @inject(SERVICES.PictureGeneratorService) pictureGeneratorService: IPictureGeneratorService,
        @inject(SERVICES.PostService) postService: IPostService,
        @inject(SERVICES.PictureToBufferService) pictureToBufferService: IPictureToBufferService
    ) {
        this.pictureGeneratorService = pictureGeneratorService;
        this.postService = postService;
        this.pictureToBufferService = pictureToBufferService;
    }

    postPicture = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { creationText } = req.body;

            const pictureUrl = await this.pictureGeneratorService.generatePictureUrl(creationText);
            const PictureBuffer = await this.pictureToBufferService.pictureToBuffer(pictureUrl);
            const postID = await this.postService.postPicture(PictureBuffer, creationText);

            res.send('picture is shared with id: ' + postID + ' url: ' + pictureUrl);
        } catch (err) {
            next(err);
        }
    };
}
