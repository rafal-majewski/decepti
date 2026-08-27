# Decepti

## Building

Run

```
npm run build
```

to build the application. The built application will be placed in the `./build` directory.

### Environment variables

The building process can be configured via [environment variables](https://en.wikipedia.org/wiki/Environment_variable). You can create a [.env](https://nodejs.org/api/environment_variables.html#env-files) file in the root of the project to set the environment variables.

#### List

- `ADAPTER__NAME`: The name of the adapter to use. The following values are possible:
  - `Node`: Use [the Node.js adapter](https://svelte.dev/docs/kit/adapter-node);
  - `static`: Use [the static adapter](https://kit.svelte.dev/docs/adapter-static);
- `HOSTING__BASE_PATH`: Base path under which the application is hosted. Use an empty string for root hosting, or a value that starts with a `/` such as `/app`;

## Environment variables

The application can be configured via [environment variables](https://en.wikipedia.org/wiki/Environment_variable). You can create a [.env](https://nodejs.org/api/environment_variables.html#env-files) file in the root of the project to set the environment variables.

### Adapter-specific

#### Node adapter

For the Node adapter, you need to provide the environment variables when starting the built application.

##### List

- `SERVER__BIND__ADDRESS`: Address/interface the internal HTTP server should bind to;
- `SERVER__BIND__PORT__NUMBER`: Port that the internal HTTP server listens on;
- `SERVER__BIND__PORT__TLS__IS_ENABLED`: Whether the internal HTTP server uses TLS. The following values are possible:
  - `no`: TLS is disabled;
  - `yes`: TLS is enabled. Then you must also set the following variables:
    - `SERVER__BIND__PORT__TLS__INTERMEDIATE_CA__CERTIFICATE` – The certificate of the intermediate CA;
    - `SERVER__BIND__PORT__TLS__SERVER__CERTIFICATE` – The certificate of the server;
    - `SERVER__BIND__PORT__TLS__SERVER__PRIVATE_KEY` – The private key of the server;

#### Static adapter

For the static adapter, you need to provide the environment variables when building the application.

##### List

### List

## Starting

To start the built application run:

```
npm run start:build
```

The built application must already be built as described in [the "Building" section](#building).

Note that you can only start the built application that was built using the Node adapter.

## Production setup with Node adapter

For production, you can use Docker to containerize and run the application.

1. Prepare the Docker image's build arguments:
   - `DEBIAN__DOCKER_IMAGE__TAG__DATE`: A part of the Debian Docker image tag to use. This is a date in the format of `YYYYMMDD`. You can find the available tags on the [Debian Docker Hub page](https://hub.docker.com/_/debian).
   - `HOSTING__BASE_PATH`: Base path under which the application is hosted. Use an empty string for root hosting, or a value that starts with `/` such as `/app`.
   - `NODE_JS__VERSION`: The version of Node.js to install in the Docker image.
2. Build the Docker image using the provided `./Dockerfile` while being in the project's root directory:
   ```bash
   docker build \
    --build-arg DEBIAN__DOCKER_IMAGE__TAG__DATE=${DEBIAN__DOCKER_IMAGE__TAG__DATE} \
    --build-arg HOSTING__BASE_PATH=${HOSTING__BASE_PATH} \
    --build-arg NODE_JS__VERSION=${NODE_JS__VERSION} \
    --tag decepti:$(npm pkg get version | tr -d '"') \
    .
   ```
3. Run the built Docker image.
