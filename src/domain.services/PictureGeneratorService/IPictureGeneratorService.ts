export interface IPictureGeneratorService {
    generatePictureUrl(creationText: string): Promise<string>;
}
