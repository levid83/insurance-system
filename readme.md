# Insurance System Test App

## Prerequisites

You will need Postgres version 14.x and Node.js version 12.x or greater installed on your system.

## Setup

Get the code by cloning this repository using git

```
git clone https://github.com/levid83/insurance-system.git
```

## Running locally in development mode

For the server create a `.env` file in the `backend` folder of the project

You need to specify:

```
DB_CONNECTION_URL = postgres://<user>:<password>@localhost:5432/insurance-system
DB_SYNCHRONIZE = true
```

To start the server, run the following commands in the root folder:

```
cd server
npm install
npm run dev
```

The server should now be up and running at http://localhost:3001

For the admin tool create `.env.local` file in the `frontend` folder of the project

You need to specify:

```
REACT_APP_SERVER_URL=http://localhost:3001/
```

To start the client, run the following commands in the root folder:

```
cd client
npm install
npm start
```

The app should now be up and running at http://localhost:3000
