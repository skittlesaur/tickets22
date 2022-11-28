# Tickets22

Tickets22 is a simple ticketing system for FIFA World Cup Qatar 22. It is a web application where users can purchase
tickets for the matches. The application is built using the MERN stack and typescript.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the dependencies.

```bash
yarn install
```

## Usage

Tickets22 uses [MongoDB](https://www.mongodb.com/) as the database. Make sure you have MongoDB installed and running on
your machine or through a cloud service.

Create a `.env` file in the root directory and add the following environment variables:

```bash
DATABASE_URL=mongodb://localhost:27017/tickets22
JWT_SECRET=your_jwt_secret
```

To start the application, run the following command:

```bash
yarn start
```

## Ports

The monorepo uses the following ports:

**Frontend**
- Client: 9000

**Backend**
- Server: 3000

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors

- Baraa - *[@skittlesaur](https://github.com/skittlesaur)*
- Youssef Saad - *[@youssefsaadgiu](https://github.com/youssefsaadgiu)*