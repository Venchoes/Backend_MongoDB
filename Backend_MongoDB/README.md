# Backend_MongoDB

A backend project using Node.js, TypeScript, Express, and MongoDB with JWT authentication.

## Project Structure

```
Backend_MongoDB
├── src
│   ├── server.ts
│   ├── app.ts
│   ├── config
│   │   └── env.config.ts
│   ├── database
│   │   └── connection.database.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models
│   │   └── user.model.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   └── protected.controller.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   └── protected.routes.ts
│   ├── utils
│   │   ├── logger.util.ts
│   │   └── jwt.util.ts
│   └── types
│       └── index.ts
├── requests
│   └── requests.yaml
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Backend_MongoDB
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage

1. Start the application:
   ```
   npm run start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### Public Routes

- **POST /register**: Create a new user in the system.
- **POST /login**: Authenticate a user and generate a JWT token.

### Protected Routes

- **GET /protected**: Access this route only with a valid JWT token in the Authorization header.

## Logging

The application includes logging functionality to track actions and errors throughout the application.

## Requests

Refer to the `requests/requests.yaml` file for examples of API requests that can be imported into Insomnia.

## License

This project is licensed under the MIT License.