# Authentication in Angular with NGRX

## Want to use this project?

1. Fork/Clone/Download
1. Install dependencies - `npm install`
1. Check the value for `apiUrl` in `src/environments/environment.prod.ts` and `src/environments/environment.ts` (depending on prod / dev environment and probably adjust it
1. Run the development server - `npm start`

You will need to also spin up a back-end with the following routes:

| URL                            | HTTP Verb | Action              | Request Data                              | Response Data           |
|--------------------------------|-----------|---------------------|-------------------------------------------|-----------------------|
| http://localhost:8080/register | POST      | Register a new user |                                           |                       |
| http://localhost:8080/login    | POST      | Log a user in       | { email: _string_, password: _string_ }| { expires: _number_, token: _string_, user: { email: _string_ }} |
| http://localhost:8080/api/v1/example    | GET      | Get some example data       | | some JSON object |

The returned token expiration will be checked against the current date. If the token is already expired, the backend should return an error.

## Backend
For trying out you can use the [This example backend](https://github.com/d-koppenhagen/auth-backend-example).
