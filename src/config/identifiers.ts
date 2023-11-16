export const INSTANCES = {
    OpenAIClient: Symbol.for('OpenAIClient'),
    IgApiClient: Symbol.for('IgApiClient'),
};

export const CONSTANTS = {
    IG_USERNAME: Symbol.for('IG_USERNAME'),
    IG_PASSWORD: Symbol.for('IG_PASSWORD'),
};

export const REPOSITORIES = {
    OpenAIPictureRepository: Symbol.for('OpenAIPictureRepository'),
    PostRepository: Symbol.for('PostRepository'),
};

export const SERVICES = {
    PictureGeneratorService: Symbol.for('PictureGeneratorService'),
    PostService: Symbol.for('PostService'),
};

export const CONTROLLERS = {
    PictureController: Symbol.for('PictureController'),
    ChatController: Symbol.for('ChatController'),
};
