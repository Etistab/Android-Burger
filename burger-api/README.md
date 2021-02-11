# Burger API

## Description

Simple REST API built for fastfood environments.

It has 3 modes:

* Admin: manage products, menus and special offers.

* Customer: see products, menus and special offers and order food.

* Staff: see orders and fulfill them.

## Installation

### Prerequisites

- Clone the repos with a git client.

```bash
git clone https://github.com/TheGhostSpirit/burger-api.git
```

### Register an application in Azure

This API uses Microsoft accounts to authenticate users. For it to work you will need to register an application in the Azure Portal. [This guide](https://docs.microsoft.com/en-us/graph/auth-register-app-v2) covers the steps to register your application.

### Environment

This part covers the steps in order to run the project on a given environment. Follow the steps of the environement of your choice then skip to the next part.

#### Development

- Install Docker & Docker Compose.

- Navigate to the project's folder.

- Run the project.

```bash
docker-compose up
```

#### Production

- Install Docker.

- Build the image in the project's folder.

```bash
docker build -t burger-api .
```

- Deploy the Docker image in your production environment.

- Add the following environement variables to your shell before running the project:

  * ```EXPOSED_PORT``` the port you wish to expose to the outside world

  * ```NODE_PORT``` the inner port of the Docker container (must match the port in the config, see below)

```bash
export EXPOSED_PORT=8000
export NODE_PORT=3000
```

- Run the project in a Docker container.

```bash
docker run -p $EXPOSED_PORT:$NODE_PORT burger-api
```

- Create a MongoDB instance on your prodution environment.

### Configuration

You will need to configure the .env file at the root of the project with your environment settings.

``AZURE_TENANT``

The Azure Active Directory Tenant GUID in which you registered your application.

``AZURE_CLIENT_ID``

The client id (or application id) of the registered application.

``NODE_PORT``

The port on which the NodeJS API should listen for HTTP requests (default 3000).

``MONGO_HOST``

The URL on which the MongoDB instance is deployed. If running the environment in docker-compose this must match the ``container_name`` of the MongoDB container (default burger-database).

``MONGO_PORT``

The port on which the Mongo daemon listens (default 27017).

``MONGO_DBNAME``

The name of the database to use on the MongoDB instance (default burger).
