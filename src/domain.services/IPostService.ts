export interface IPostService {
    postPicture(pictureBuffer: Buffer, postCaption: string): Promise<string>;
}
