after cloning the project, use npm install for installing all the dependencies, and run npm run start:dev to start development server. Server starts at port 3000 by default.

used express, mongoose for mongodb, multer for file handling, http status for status codes, nodemon in development,

Databse design is also given in image.png.

I have chosen mongodb for databse because it is free to use and it offers a deployed db for free. And other than being free, I wanted a more flexible structure for the data, and still the application is in development state. There is no fixed schema or the relationships between them. which becomes easy for development.
Made publisher and user. both types of users. for the sake of development, we can create publisher only through backend. Assuming the email for user and publisher are unique.

tasks:
use httpstatus codes for responses
publisher schema
user schema
jwt middleware
send access tokens
hashing passwords
keep the databse image in this
rewrite the get offers using publisher id
do error handling
#   t o d a y q - b a c k e n d  
 