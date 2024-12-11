# todo-app

This app is a 'To Do List' app with registration and login. Data is read from database, inserted, deleted and updated via API. Transactions are protected by the authentication token generated during registration and login.

## Usage

Add `.env` file in root folder.

```
PORT = your port
MONGO_URI = your mongo_uri
JWT_SECRET = your secret key
```

## Install

Backend dependencies:

```
npm install
```

Frontend dependencies:

```
cd frontend
npm install
```

## Run Server and Client

```
npm run server
npm run client
```