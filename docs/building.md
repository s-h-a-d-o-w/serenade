# Building Serenade

Serenade is built using the [Gradle](https://gradle.org) build system. We also have a few scripts useful for running various Serenade services.

## Client (dev)

To run the Serenade app, simply run:

    cd client
    ./bin/dev.py

This will run a local version of the client that uses Serenade Cloud as the backend.

If you'd instead like the client to connect to a specific endpoint (e.g., a local server you're running yourself), you can run:

    ENDPOINT=http://localhost:17200 ./bin/dev.py

## Client (release)

The following works on Windows too!

1. Set `SERENADE_SOURCE_ROOT` to wherever you have the source code checked out.
2. Run (see sections below for more detail):
```
docker compose -f config/docker-compose.yaml up -d
docker compose -f config/docker-compose.yaml exec serenade bash
```
3. In the docker container shell (this creates the files necessary to distribute the local server):
```
gradle installd
gradle client:installServer
exit
docker compose -f config/docker-compose.yaml down --remove-orphans
```
4. In `client`:
```
npm install
npm run package
```
5. Packaged files will be in `client/dist`.

## Service Setup

### Docker

We provide a Dockerfile and Docker Compose file that you can use to set up a Serenade environment.

#### Images

Docker images are available at [Docker Hub](https://hub.docker.com/u/serenadeai). We provide the following images:

* `serenadeai/serenade`: Contains all of the dependencies needed to run Serenade as well as train models. (~30GB)
* `serenadeai/serenade-gpu`: Contains all of the dependencies needed to run Serenade as well as train models on a GPU. (~30GB)
* `serenadeai/serenade-minimal`: Contains only the dependencies needed to run Serenade. (~9GB)

If you don't intend to train any models, then you can use the `serenadeai/serenade-minimal` image, which is significantly smaller.

You can also build these images yourself.

For the standard image:

    docker build -f config/Dockerfile -t serenade .

For the GPU image:

    docker build -f config/Dockerfile -t serenade-gpu --build-arg DEVICE_TYPE=gpu .

For the minimal image:

    docker build -f config/Dockerfile -t serenade-minimal --build-arg BUILD_TYPE=minimal .

#### Compose

The provided Docker Compose file sets up ports and mount points to enable you to edit files on a host machine and run Serenade inside of a container.

To start Docker Compose, run:

    docker compose -f config/docker-compose.yaml up -d

By default, this will use the `serenadeai/serenade` image. To use a different image, run:

    SERENADE_IMAGE=serenadeai/serenade-minimal docker-compose -f config/docker-compose.yaml up -d

To get a shell in the running container, run:

    docker compose -f config/docker-compose.yaml exec serenade bash

To stop Docker Compose, run:

    docker compose -f config/docker-compose.yaml down --remove-orphans

### System

You can also install Serenade and its dependencies directly onto your system.

Serenade uses two environment variables to describe where source code and dependencies will be on the filesystem:

- `SERENADE_SOURCE_ROOT`: The location of the `serenade` repository. Defaults to `~/serenade`.
- `SERENADE_LIBRARY_ROOT`: The location of Serenade dependencies. Defaults to `~/libserenade`.

If you're using a Mac, make sure you're running all of these commands in [Rosetta](https://support.apple.com/en-us/HT211861). Serenade currently only supports x86-64 architectures, and not arm64.

To install necessary system-wide dependencies onto your system, run:

    scripts/setup/setup-ubuntu.sh
    scripts/setup/setup-mac.sh

Then, to download and build Serenade libraries and models, run:

    scripts/setup/build-dependencies.sh

As with the Docker image, this will build all of the dependencies needed to run Serenade as well as train models. To build only the dependencies needed to run Serenade, you can instead run:

    scripts/setup/build-dependencies.sh --minimal

## Compiling Services

To compile all Serenade services, from the root directory, run:

    gradle installd

To compile an individual service, like `speech-engine`, run:

    gradle speech-engine:installd

## Running Services

To run all online Serenade services, you can use the provided script:

    scripts/serenade/bin/run.py

To run a specific set of services, you can run:

    scripts/serenade/bin/run.py --service speech-engine --service code-engine

## Running Tests

To run all of the Serenade tests:

    scripts/serenade/bin/run.py --tests 'gradle test'

To run tests for a specific service:

    scripts/serenade/bin/run.py --tests 'gradle core:test'

To run a specific set of tests:

    scripts/serenade/bin/run.py --tests 'gradle core:test --tests *PythonTest.testAdd*'

To run tests with extra debug output:

    scripts/serenade/bin/run.py --tests 'gradle core:test -i'

## Client Integration

If you'd like to build your own version Serenade Local to be used by the client, you can run:

    gradle installd
    gradle client:installServer

Then, when you run the client (following the instructions above) and use the Serenade Local endpoint, you'll be running the version that you built locally.

## Static Site

To make changes to the serenade.ai website (including documentation), you can run:

    cd web
    npm install
    npm run dev
