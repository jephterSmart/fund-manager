# Fund Manager

The fund manager application enables a fund manager to manage fund by taking money from investors and distributing it to businesses.

This application show cases how domain driven design concepts can help us in dealing with business rules and making business rules very explicit in our application, rather than it being scattered across the application. Everything about the domain is centralized in the `domain.model` module.

To start application create your .env file and fill the data required as specified in the `.env.example`. If you're using docker compose for your database, supply the `mysql.env` with your own content, `mysql.env.example`.

## Technology used

- nestjs
- typeorm (mysql)
- nestjs/cqrs
