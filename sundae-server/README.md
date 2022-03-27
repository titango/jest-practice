# sundae-server
### A server for the "Sundaes on Demand" app in the Udemy course "Testing Library for React"
( Original repo can be found at [https://github.com/bonnie/udemy-react-testing-library-projects])

## Installing
1. `cd` into the `sundae-server` directory (where this README is located).
2. Run `npm install` 

## Starting the server
Run `npm start`. The server will be found at [http://localhost:3030]

## Using the server
Server routes:
  - `GET /scoops` and `GET /toppings` return sundae options (array of objects with keys `name` and `imagePath`)
  - `POST /order` returns a random order number (does not process order)
  - images via static `/images` directory.

## Testing
To test, run `npm test`.