# Yoga Reservation App

## Requirements
- Java 11
- Node.js 16
- MySQL (port 3306)
- Angular CLI 14

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/steevelefort/Testez-une-application-full-stack.git
cd Testez-une-application-full-stack
```

### 2. Database setup
Connect to MySQL as root user:
```bash
mysql -u root -p
```

Create the database and import the schema:
```sql
CREATE DATABASE yoga;
USE yoga;
SOURCE ./ressources/sql/script.sql;
```

> **⚠️ Production Warning**: This setup uses the root user for development purposes only. In a production environment, create a dedicated MySQL user with limited privileges for the application.

Verify the installation:
```sql
SHOW TABLES;
```

Expected output:
```
+----------------+
| Tables_in_yoga |
+----------------+
| PARTICIPATE    |
| SESSIONS       |
| TEACHERS       |
| USERS          |
+----------------+
4 rows in set (0.000 sec)
```

Exit MySQL:
```sql
EXIT;
```

### 3. Backend setup
Configure the database connection by editing `back/src/main/resources/application.properties`.

Change these properties to match your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/yoga?allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

Replace `root` and `your_mysql_password` with your actual MySQL credentials. Change the database name from `test` to `yoga` in the URL.

Then build and run the backend:
```bash
cd back
mvn clean compile
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### 4. Frontend setup
Open a new terminal in the project directory:
```bash
cd front
npm install
npm start
```

The application will be available at `http://localhost:4200`

## Usage

### Default accounts
- **Admin**: yoga@studio.com / test!1234
- **User**: Create a new account through the registration form

### Admin features
- Create, edit and delete yoga sessions
- View all sessions and participants

### User features
- View available sessions
- Register for sessions
- Unregister from sessions
- Manage personal account

## Testing

### Frontend tests (Jest)
```bash
cd front
npm test
```

### Backend tests (JUnit)
```bash
cd back
mvn test
```

### End-to-end tests (Cypress)
```bash
cd front
npm run e2e
```
If the frontend doen’t run, you can run all tests in terminal with:
```bash
npm run e2e:ci
```

## Coverage reports

### Frontend coverage
```bash
cd front
npm test -- --coverage
```
Report available at: `front/coverage/lcov-report/index.html`

### Backend coverage
```bash
cd back
mvn test jacoco:report
```
Report available at: `back/target/site/jacoco/index.html`

### E2E coverage
```bash
cd front
npm run e2e:coverage
```
Report available at: `front/coverage/lcov-report/index.html`
