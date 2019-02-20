# API

Api is build with express and mongoose and uses [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) for generating Swagger documentation from commentaries in code.

## Getting Started

To get API server running locally:

- Install NodeJS ([instructions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages))
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Install required dependencies `npm install`
- `npm start` to run the local server

After that you will see message saying that API is up on port 3000. You can also find full Swagger docs at http://localhost:3000/docs.

Optionally:

- `npm docs` to generate new swagger.json from commentaries in code.
- change config.js up to your needs
