import OpenAI from 'openai';
import { IPictureRepository } from './IPictureRepository';
import { inject, injectable } from 'inversify';
import { INSTANCES } from '../../config/identifiers';

@injectable()
export class OpenAIPicturRepository implements IPictureRepository {
    private openai: OpenAI;

    constructor(@inject(INSTANCES.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }
    async generatePictureUrl(creationText: string): Promise<string> {
        const pictureResponse = await this.openai.images.generate({
            prompt: creationText,
            model: 'dall-e-3',
            n: 1,
            size: '1792x1024',
        });

        const pictureUrl = pictureResponse.data[0].url;
        if (!pictureUrl) {
            throw new Error('Picture url could not be generated for creation text: ' + creationText);
        }
        return pictureUrl;
    }
}
