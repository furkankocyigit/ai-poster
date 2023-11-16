export interface IPictureRepository {
    generatePictureUrl(creationText: string): Promise<string>;
}
