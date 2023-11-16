import { inject, injectable } from 'inversify';
import { IPostRepository } from './IPostRepository';
import { IgApiClient } from 'instagram-private-api';
import { CONSTANTS, INSTANCES } from '../config/identifiers';

@injectable()
export class InstagramPostRepository implements IPostRepository {
    private ig: IgApiClient;
    private igUserName: string;
    private igPassword: string;
    private defaultTags = ' #ai #aipictures #generatedbyai ';

    constructor(
        @inject(INSTANCES.IgApiClient) instgramClient: IgApiClient,
        @inject(CONSTANTS.IG_USERNAME) igUserName: string,
        @inject(CONSTANTS.IG_PASSWORD) igPassword: string
    ) {
        this.ig = instgramClient;
        this.igUserName = igUserName;
        this.igPassword = igPassword;
        this.ig.state.generateDevice(igUserName);
    }
    async login(igUserName: string, igPassword: string) {
        await this.ig.account.login(igUserName, igPassword);
    }

    async postPicture(pictureBuffer: Buffer, postCaption: string): Promise<string> {
        await this.login(this.igUserName, this.igPassword);

        const postResult = await this.ig.publish.photo({
            file: pictureBuffer,
            caption: postCaption + this.defaultTags,
        });

        if (!postResult || !postResult.upload_id) {
            throw new Error('Post could not be shared! Caption: ' + postCaption);
        }

        return postResult.upload_id;
    }
}
