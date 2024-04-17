# URL Shortener

This is a simple URL shortener application built with Express.js and MongoDB. It allows users to shorten long URLs into more manageable short links.

## Features

- Shorten and save long URLs into shorter, more readable links.
- Track the number of clicks on each short URL.
- Delete unwanted URLs.

## Getting Started

To get started with the URL shortener, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/rachels-archive/url-shortener.git
    ```

2. Install dependencies:

    ```
    cd url-shortener
    npm install
    ```

3. Configure MongoDB:

    - Make sure you have MongoDB installed and running on your system.
    - Update the MongoDB connection string in `server.js` to point to your MongoDB instance.

4. Run the application:

    ```
    npm run devStart
    ```

5. Access the URL shortener in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

### Shortening a URL

To shorten a URL, enter the long URL into the input field on the homepage and click the "Shorten" button. The shortened URL will be displayed below.

### Deleting a URL

To delete a URL, navigate to the list of shortened URLs on the homepage. Each URL entry will have a "Delete" button. Clicking this button will remove the URL from the list.

## Dependencies

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- [ShortId](https://github.com/dylang/shortid) - Unique string ID generator.
- [EJS](https://ejs.co/) - Embedded JavaScript templating engine.
- [Method-Override](https://github.com/expressjs/method-override) - Middleware to override HTTP methods.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
