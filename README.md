# 🏆 Tickets22

Tickets22 is a ticketing system for FIFA World Cup Qatar 22. It allows users to buy tickets for the matches and view their tickets.

Tickets22 is designed to provide a seamless and efficient ticket booking experience for fans of all teams.
The platform is built on a microservice architecture, which allows for greater flexibility and scalability
as the demand for tickets grows. The use of NextJS, a popular framework for building server-rendered React 
applications, and Express, a widely-used Node.js web application framework, ensures that the platform is fast, 
reliable, and easy to use.

One of the key features of Tickets22 is its use of a distributed system, where multiple teams are connected 
via a Kafka broker. This allows for real-time data updates, ensuring that tickets are always available and that
users have access to the most up-to-date information.

Additionally, Tickets22 is built with security in mind. We use the latest encryption techniques to ensure that all 
transactions are secure and that personal information is protected. As well as introducing a personal API key for
each user, we also use a CAPTCHA to prevent bots from accessing the platform.

## Project Specifications

The project follows a microservice architecture. It includes 6 main services which are Shop, Shop Consumer, Reservations, Security, Analytics, Payments. The duration of the project is set to be completed in a month (2 sprints).

## Screenshots
![Landing Page](https://user-images.githubusercontent.com/61744498/213901665-116e0fc6-a993-46d5-bab6-2bb2f53ba57c.png)
![Login Page](https://user-images.githubusercontent.com/61744498/213902236-ad53fec7-63f2-4aa5-aa78-777ca175f264.png)
![Reservation Page](https://user-images.githubusercontent.com/61744498/213902200-38a8bb3e-b95a-4127-89c2-a5320dcb035d.png)
![Reservation Page - Selected Seat](https://user-images.githubusercontent.com/61744498/213902204-9c2eaf9b-d35a-451c-a243-d8a3a8ca3117.png)
![Help Page](https://user-images.githubusercontent.com/61744498/213902089-a05c2d83-5c7b-4675-a209-6e326e0f3528.png)

## Ports

The monorepo uses the following ports:

**Frontend**

- Client: 9000

**Backend**

- Shop: 3000
- Shop Consumer: 3010
- Reservations: 3020
- Analytics: 3030
- Payments: 3040
- Security: 3050

## Authors

- Baraa - *[@skittlesaur](https://github.com/skittlesaur)*
- Youssef Saad - *[@youssefsaadgiu](https://github.com/youssefsaadgiu)*
