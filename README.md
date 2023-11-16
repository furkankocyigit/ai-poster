# AI Picture Generator for Instagram

This project leverages TypeScript and Node.js to interact with the OpenAI API, converting text input into AI-generated images. These images are then seamlessly posted to an Instagram account using the Instagram Private API.

### Prerequisites

Ensure you have the following set up:

- Node.js installed
- An Instagram account
- OpenAI API key
- Environment variables set in a `.env` file

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/furkankocyigit/ai-poster.git
    ```
2. Navigate to the root folder:
    ```bash
    cd ai-poster
    ```
4. Install dependencies by running:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the root folder and set the following environment variables:
- IG_USERNAME=your_instagram_username
- IG_PASSWORD=your_instagram_password
- OPENAI_API_KEY=your_openai_api_key

### Usage

1. Ensure the environment variables are properly set in the `.env` file.
2. Start the application:
    ```bash
    npm run start
    ```
3. Trigger the picture root with 'creationText' param as the following example 
   ```bash
    http://localhost:3000/picture?creationText= your creation text prompt here
    ```
5. The application will generate the AI picture from the text using the OpenAI API.
6. The generated image will be automatically posted to your Instagram account.

### Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests to enhance the functionality or fix any issues.
1. Fork the project
2. Create your feature branch (**git checkout -b feature/YourFeature**)
3. Commit your changes (**git commit -am 'Add your feature'**).
4. Push to the branch (**git push origin feature/YourFeature**).
5. Open a pull request.

### License

This project is licensed under the [Apache License](LICENSE).

