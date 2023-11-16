import { inject, injectable } from 'inversify';
import { IPictureRepository } from '../../infrastructure';
import { IPictureGeneratorService } from './IPictureGeneratorService';
import { REPOSITORIES } from '../../config/identifiers';

@injectable()
export class PictureGeneratorService implements IPictureGeneratorService {
    private pictureRepository: IPictureRepository;

    constructor(@inject(REPOSITORIES.OpenAIPictureRepository) pictureRepository: IPictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    async generatePictureUrl(creationText: string) {
        return this.pictureRepository.generatePictureUrl(creationText);
    }
}
