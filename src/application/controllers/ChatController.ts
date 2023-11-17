import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { INSTANCES } from '../../config/identifiers';

// Possible models to use:
// gpt-4-1106-preview   ----> latest gpt4 model with 128,000 tokens and up to date to Apr 2023
// gpt-4-vision-preview ----> latest gpt4 model with visiual input with 128,000 tokens and up to date to Apr 2023
// gpt-4                ----> 8,192 tokens	Up to Sep 2021
// gpt-3.5-turbo-1106   ----> The latest GPT-3.5 Turbo model with 16,385 tokens	Up to Sep 2021
// gpt-3.5-turbo        ----> 4,096 tokens	Up to Sep 2021

// TODO: Refactor this as not to use the OpenAI client directly in the controller, add service layer
@injectable()
export class ChatController {
    private openai: OpenAI;
    private model = 'gpt-4-1106-preview';
    constructor(@inject(INSTANCES.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }

    getChatResponse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message } = req.body;

            const gptResponse = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: message }],
                model: this.model,
            });

            const responseString = gptResponse.choices[0].message;
            res.send(responseString);
        } catch (err) {
            next(err);
        }
    };
}
