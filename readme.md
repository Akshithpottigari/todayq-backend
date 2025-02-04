Technologies used:

- Node.js
- Express.js: web framework for Node.js, facilitating the creation of APIs and web servers.
- MongoDB
- Mongoose: for mongodb modelling, schema creation and data manipulation.
- Bcrypt: A library used for hashing passwords, ensuring secure storage and authentication.
- Cors: Middleware for Express.js to enable Cross-Origin Resource Sharing, allowing controlled access to resources from different origins.
- Dotenv: A zero-dependency module for loading environment variables from a .env file into process.env.
- Jsonwebtoken (JWT): A standard for securely transmitting information between parties as JSON objects, commonly used for implementing stateless authentication mechanisms.
- Multer: Middleware for handling multipart/form-data, primarily used for file uploads.

Types of Users
Our application distinguishes between two types of users:

Publisher: Users with publisher privileges, allowing them access to certain restricted routes and functionalities.
User: Regular users who utilize the platform's services without publisher privileges.

NOTE: Default users for both publishers and regular users are created within the backend. These users are essential for the functioning of the application and are not accessible for creation or modification via the frontend. This approach ensures data integrity and prevents unauthorized user creation.

Authentication and Authorization
Token-Based Authentication: Users are authenticated using JSON Web Tokens (JWT), providing a secure and stateless authentication mechanism.
Password Hashing: User passwords are hashed using the bcrypt library before being stored in the database, ensuring data security.
Token Expiry: JWT tokens are issued with an expiration time, enhancing security by limiting the lifespan of authentication tokens.

MongoDB is selected as the database solution due to its flexibility, scalability, and cost-effectiveness. The NoSQL nature of MongoDB allows for easy schema adaptation and supports dynamic relationships, making it ideal for rapid development and deployment scenarios.

Utilized JWT Middleware for authorization.