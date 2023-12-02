# Find A Friend 🐶

## ❓ What's Find A Friend

FindAFriend is a web application for individuals seeking to adopt pets, where organizations can sign up and post their pets for anyone looking to find a new friend and contact them!

This project is the Server Side of Find A Friend containing:

- API for all the entities of the application
- End to end and unitary tests
- Auth using JWT token
- SOLID principles
- Business rules

## 👨‍💻 What makes up Find A Friend Back

FindAFriend Back was made using:

- **Node.js:** JavaScript runtime for server-side execution.
- **Fastify:** Lightweight web framework for efficient API development.
- **Vite:** Used for end-to-end (e2e) and unit testing in the project.
- **Prisma:** Node.js and TypeScript ORM for simplified database interaction.
- **Docker:** Container platform for streamlined application packaging and deployment.

## 💻 How to install in your machine

Required to install and setup:
- Git
- Node.js
- Docker

1. install the above dependecies
2. clone this repository in your machine using: `git clone https://github.com/ViniciusCestarii/FindAFriendWeb.git`
3. in root of the project run: `npm i`
4. in root of the project create a .env file and add this:
   ```
   DATABASE_URL="postgresql://docker:docker@localhost:5432/findafriend?schema=public"
   NODE_ENV=dev
   JWT_SECRET=supersecret
   APPLICATION_URL="http://localhost:3000"
   ```
5. install bitnami/postgresql image and create new container using:
   ```
   docker run --name finda-a-friend -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=findafriend -p 5432:5432 bitnami/postgresql
   ```
   or using:
   ```
   docker compose up -d
   ```
7. in root of the project run: `npm run prisma migrate dev`
8. in root of the project run: `npm run dev`
9. now your server is running on default port 3333, just acess localhost: http://localhost:3333 and enjoy!

### For development i made some extra commands:
- test end to end
`npm run test:e2e`

- unitary test
`npm run test`

- fill Database
`npm run fillDb`

- clean Database
`npm run cleanDb`

## ✅ Requirements and Business Rules met 

### Functional requirement

- [x] Able to register a pet
- [x] Able to list all the adoptable pets in a city
- [x] Able to filter pets by its characteristics
- [x] Able to show details of a pet for adoption
- [x] Able to register an organization
- [x] Able to login as a organization

### Business rules

- [x] To list the pets, it's necessary to have the city
- [x] A organization needs to have a adress and a phone number
- [x] A pet must be related to a organization
- [x] The user who wants to adopt is going to enter in touch with the organization by phone
- [x] To a organization acess the application as a admin, it's necessary to be logged in
