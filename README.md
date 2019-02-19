# Test task for MEVN stack

Project consists of two directories: api and frontend

## API

Api is build with express and mongoose and uses [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) for generating Swagger documentation from commentaries in code.

requirements:

- nodejs v10.8.0
- mongodb v4.0.0

### Startup

Firsly, you need to specify your mongodb connection URI inside .env file in the root of project.
After that you can start project by running this commands:

```bash
cd api
npm install
npm start
```

After that you will see message saying that API is up on port 3000. You can also find full Swagger docs at `localhost/docs`. Optionally, if you changed commetaries with API definitions you can run `npm docs` to generate new swagger.json.

## Frontend

Frontend is build on Vue with help of vue-cli. It was my first Vue project so I needed some boilerplate code to start with. It also uses bootstrap 4 for some styling.

### Startup

To start in dev mode:

```bash
cd frontend
npm install
npm run dev
```

To build production version:

```bash
cd frontend
npm install
npm run build
```

## Todo

1. Add validation
2. Write smaller components for frontend
3. Write tests for API
