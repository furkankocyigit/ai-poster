import { inject, injectable } from 'inversify';
import { IPostService } from './IPostService';
import { REPOSITORIES } from '../config/identifiers';
import { IPostRepository } from '../infrastructure/IPostRepository';

@injectable()
export class PostService implements IPostService {
    private postRepository: IPostRepository;

    constructor(@inject(REPOSITORIES.PostRepository) postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    postPicture(pictureBuffer: Buffer, postCaption: string): Promise<string> {
        return this.postRepository.postPicture(pictureBuffer, postCaption);
    }
}
