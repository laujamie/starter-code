# Starter Code Repository

Opinionated starter built on TypeScript, React,
Golang, GORM, CockroachDB, and Docker.

This repository was built to reduce the amount of boilerplate that I write with each project and to simplify dev environment setup.

Some fun quirks of the repository include:

- [Jotai](https://jotai.org) for state management
- [Magic](https://magic.link) for auth
- [Echo](https://echo.labstack.com) for backend
- [Mantine](https://mantine.dev) for frontend styling
- [Parcel](https://parceljs.org) for bundling
- No tests :( - to be fixed soon!

## Getting Started

**Note:** This requires [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) to be installed to run.

From project root, run:

```bash
$ cd backend && cp .env.example .env
```

Then, fill out the required fields in the new `.env` file. Then, run

```bash
cd ../frontend && cp .env.local.example .env.local
```

Then, fill out the env file and you're good to get running!

To get your local dev running, all you need to run is:

```bash
$ docker-compose up
```

The backend server will be running on port 5001, frontend will be accessible at http://localhost:1235, and DB will be running on ports 8080 and 26257.
The ports are set like this to avoid conflicts with the host.

## Deploying the App

This section is still a work in progress. I will likely be using [Render](render.com).
