# Book Management API

This is RESTful API for managing books, built using Node.js, Express, and MongoDB.

## API Endpoints , CURL and Usage

### Create a new book
- Endpoint: `POST /api/books`
- Usage: Create a new book by sending a JSON object with `title`, `author`, and `summary` fields in the request body.
- CURL : curl -X POST -H "Content-Type: application/json" -d '{"title": "Sample Book", "author": "John Doe", "summary": "A  sample book summary."}' http://localhost:3000/api/books


### View a list of all books
- Endpoint: `GET /api/books`
- Usage: Retrieve a list of all books in the database.
-CURL : curl http://localhost:3000/api/books


### View details of a specific book by its ID
- Endpoint: `GET /api/books/:bookId`
- Usage: Retrieve the details of a specific book by providing its ID in the URL.
- CURL : curl http://localhost:3000/api/books/:bookId


### Update a book's details
- Endpoint: `PUT /api/books/:bookId`
- Usage: Update the details of a specific book by providing its ID in the URL and sending a JSON object with the fields to be updated in the request body.
- CURL : curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Book Title", "author": "New Author", "summary": "Updated book summary."}' http://localhost:3000/api/books/:bookId


### Delete a book
- Endpoint: `DELETE /api/books/:bookId`
- Usage: Delete a specific book by providing its ID in the URL.
- CURL : curl -X DELETE http://localhost:3000/api/books/:bookId

