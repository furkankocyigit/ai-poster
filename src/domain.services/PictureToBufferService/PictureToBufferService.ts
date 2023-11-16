import sharp from 'sharp';
const { get } = require('request-promise');
import { IPictureToBufferService } from './IPictureToBufferService';
import { injectable } from 'inversify';

@injectable()
export class PictureToBufferService implements IPictureToBufferService {
    async pictureToBuffer(pictureUrl: string): Promise<Buffer> {
        const imageBuffer = await get({
            url: pictureUrl,
            encoding: null,
        });

        const resizedPictureBuffer = await sharp(imageBuffer).resize(1696, 1064).jpeg().toBuffer(); // instagram picture size will be constant for this app
        return resizedPictureBuffer;
    }
}
