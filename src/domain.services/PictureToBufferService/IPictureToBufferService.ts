export interface IPictureToBufferService {
    pictureToBuffer(pictureUrl: string): Promise<Buffer>;
}
