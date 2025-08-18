# Yoga

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Start the project

Git clone:

> git clone https://github.com/OpenClassrooms-Student-Center/P5-Full-Stack-testing

Go inside folder:

> cd yoga

Install dependencies:

> npm install

Launch Front-end:

> npm run start;


## Ressources

### Mockoon env 

### Postman collection

For Postman import the collection

> ressources/postman/yoga.postman_collection.json 

by following the documentation: 

https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman


### MySQL

SQL script for creating the schema is available `ressources/sql/script.sql`

By default the admin account is:
- login: yoga@studio.com
- password: test!1234


### Test

#### E2E

Launching e2e test:

> npm run e2e

Generate coverage report (you should launch e2e test before):

> npm run e2e:coverage

Report is available here:

> front/coverage/lcov-report/index.html

#### Unitary test

Launching test:

> npm run test

for following change:

> npm run test:watch





# Testing

## Front-end
### Unittests + integration / Jest

| File                                      | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ----------------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                                 | 100       | 100        | 100       | 100       |                     |
| app                                       | 100       | 100        | 100       | 100       |                     |
| app.component.html                        | 100       | 100        | 100       | 100       |                     |
| app.component.ts                          | 100       | 100        | 100       | 100       |                     |
| app/components/me                         | 100       | 100        | 100       | 100       |                     |
| me.component.html                         | 100       | 100        | 100       | 100       |                     |
| me.component.ts                           | 100       | 100        | 100       | 100       |                     |
| app/components/not-found                  | 100       | 100        | 100       | 100       |                     |
| not-found.component.html                  | 100       | 100        | 100       | 100       |                     |
| not-found.component.ts                    | 100       | 100        | 100       | 100       |                     |
| app/features/auth/components/login        | 100       | 100        | 100       | 100       |                     |
| login.component.html                      | 100       | 100        | 100       | 100       |                     |
| login.component.ts                        | 100       | 100        | 100       | 100       |                     |
| app/features/auth/components/register     | 100       | 100        | 100       | 100       |                     |
| register.component.html                   | 100       | 100        | 100       | 100       |                     |
| register.component.ts                     | 100       | 100        | 100       | 100       |                     |
| app/features/auth/services                | 100       | 100        | 100       | 100       |                     |
| auth.service.ts                           | 100       | 100        | 100       | 100       |                     |
| app/features/sessions/components/detail   | 100       | 100        | 100       | 100       |                     |
| detail.component.html                     | 100       | 100        | 100       | 100       |                     |
| detail.component.ts                       | 100       | 100        | 100       | 100       |                     |
| app/features/sessions/components/form     | 100       | 100        | 100       | 100       |                     |
| form.component.html                       | 100       | 100        | 100       | 100       |                     |
| form.component.ts                         | 100       | 100        | 100       | 100       |                     |
| app/features/sessions/components/list     | 100       | 100        | 100       | 100       |                     |
| list.component.html                       | 100       | 100        | 100       | 100       |                     |
| list.component.ts                         | 100       | 100        | 100       | 100       |                     |
| app/features/sessions/services            | 100       | 100        | 100       | 100       |                     |
| session-api.service.ts                    | 100       | 100        | 100       | 100       |                     |
| app/services                              | 100       | 100        | 100       | 100       |                     |
| session.service.ts                        | 100       | 100        | 100       | 100       |                     |
| teacher.service.ts                        | 100       | 100        | 100       | 100       |                     |
| user.service.ts                           | 100       | 100        | 100       | 100       |                     |

Test Suites: 13 passed, 13 total
Tests:       47 passed, 47 total
Snapshots:   0 total
Time:        8.956 s
Ran all test suites.

47 test / 32 unittests / 15 integration tests

### E2E / Cypress
| File                                          | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| --------------------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                                     | 96.55     | 95.45      | 97.89     | 96.02     |                     |
| src                                           | 50        | 50         | 0         | 50        |                     |
| main.ts                                       | 50        | 50         | 0         | 50        | 8,12                |
| src/app                                       | 88.88     | 100        | 90        | 84.61     |                     |
| app-routing.module.ts                         | 100       | 100        | 100       | 100       |                     |
| app.component.ts                              | 75        | 100        | 75        | 71.42     | 25-26               |
| app.module.ts                                 | 100       | 100        | 100       | 100       |                     |
| src/app/components/me                         | 100       | 100        | 100       | 100       |                     |
| me.component.ts                               | 100       | 100        | 100       | 100       |                     |
| src/app/components/not-found                  | 100       | 100        | 100       | 100       |                     |
| not-found.component.ts                        | 100       | 100        | 100       | 100       |                     |
| src/app/features/auth                         | 100       | 100        | 100       | 100       |                     |
| auth-routing.module.ts                        | 100       | 100        | 100       | 100       |                     |
| auth.module.ts                                | 100       | 100        | 100       | 100       |                     |
| src/app/features/auth/components/login        | 100       | 100        | 100       | 100       |                     |
| login.component.ts                            | 100       | 100        | 100       | 100       |                     |
| src/app/features/auth/components/register     | 100       | 100        | 100       | 100       |                     |
| register.component.ts                         | 100       | 100        | 100       | 100       |                     |
| src/app/features/auth/services                | 100       | 100        | 100       | 100       |                     |
| auth.service.ts                               | 100       | 100        | 100       | 100       |                     |
| src/app/features/sessions                     | 100       | 100        | 100       | 100       |                     |
| sessions-routing.module.ts                    | 100       | 100        | 100       | 100       |                     |
| sessions.module.ts                            | 100       | 100        | 100       | 100       |                     |
| src/app/features/sessions/components/detail   | 100       | 100        | 100       | 100       |                     |
| detail.component.ts                           | 100       | 100        | 100       | 100       |                     |
| src/app/features/sessions/components/form     | 96.55     | 93.75      | 100       | 96.42     |                     |
| form.component.ts                             | 96.55     | 93.75      | 100       | 96.42     | 35                  |
| src/app/features/sessions/components/list     | 100       | 100        | 100       | 100       |                     |
| list.component.ts                             | 100       | 100        | 100       | 100       |                     |
| src/app/features/sessions/services            | 100       | 100        | 100       | 100       |                     |
| session-api.service.ts                        | 100       | 100        | 100       | 100       |                     |
| src/app/guards                                | 87.5      | 87.5       | 100       | 85.71     |                     |
| auth.guard.ts                                 | 100       | 100        | 100       | 100       |                     |
| unauth.guard.ts                               | 75        | 75         | 100       | 71.42     | 16-17               |
| src/app/interceptors                          | 100       | 100        | 100       | 100       |                     |
| jwt.interceptor.ts                            | 100       | 100        | 100       | 100       |                     |
| src/app/services                              | 100       | 100        | 100       | 100       |                     |
| session.service.ts                            | 100       | 100        | 100       | 100       |                     |
| teacher.service.ts                            | 100       | 100        | 100       | 100       |                     |
| user.service.ts                               | 100       | 100        | 100       | 100       |                     |
| src/environments                              | 100       | 100        | 100       | 100       |                     |
| environment.ts                                | 100       | 100        | 100       | 100       |                     |


