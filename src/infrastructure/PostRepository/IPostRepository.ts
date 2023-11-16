export interface IPostRepository {
    postPicture(pictureBuffer: Buffer, postCaption: string): Promise<string>;
    //postStory(creationText: string): Promise<string>;
    //postVideo(videoBuffer: Buffer, postCaption: string): Promise<string>;
}
