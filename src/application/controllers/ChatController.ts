import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { INSTANCES } from '../../config/identifiers';

@injectable()
export class ChatController {
    private openai: OpenAI;

    constructor(@inject(INSTANCES.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }

    getChatResponse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message } = req.body;

            const gptResponse = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: message }],
                model: 'gpt-3.5-turbo',
            });

            const responseString = gptResponse.choices[0].message;
            res.send(responseString);
        } catch (err) {
            next(err);
        }
    };
}
