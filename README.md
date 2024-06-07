This is a fun little project where a user can collect Pokemon!

Register with a username and password to start collecting Pokemon.

To run locally, launch the React client and Express server applications. An in-memory option for database provides a quick any easy launch of the backend.

## Development

### Client

- Open a terminal and navigate to the client folder

```console
$ cd client/
```

#### Install Dependencies

```console
$ npm i
```

#### Run Development Server

```console
$ npm start
```

- The client is accessible at http://localhost:3000

### Express Server

- Open a terminal and navigate to the client folder

```console
$ cd expressserver/
```

#### Install Dependencies

```console
$ npm i
```

#### Run Development Server

```console
$ npm run dev
```

- The server is accessible at http://localhost:8080

#### Run Development Server With In Memory Database

```console
$ npm run dev-in-memory-db
```

- The server is accessible at http://localhost:8080

### .NET Server (WIP)

- Open a terminal and navigate to the client folder

```console
$ cd dotnetserver/
```

#### Build

```console
$ dotnet build
$ dotnet ef database update
```

#### Run Development Server

```console
$ dotnet run
```

- The server is accessible at http://localhost:8080
