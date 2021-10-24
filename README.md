# Books Management

### What is this service for? ###
To Manage books in the library
The project is created using [LoopBack](http://loopback.io) framework.

### Data source ###
Mongodb database is used to store user and books details


### How do I get set up? ###
Summary of set up:
1. Install node and npm and verify installation by running below commands in shell
    ```PowerShell
    node -v
    npm -v
    ```
2. Install required dependencies using npm:
    * Run command **npm install** in terminal to install dependencies
    * Dependencies required: Loopback 
    ```PowerShell
        npm install
        npm install loopback-cli
      ```

### Start your Server ###
Start your server by running the below node command
  ```PowerShell
  node .
  ```


### APIs ###
Pass the access token of the user to hit the books APIs

**Users API**

- Api to signup the new user
  **POST**: http://localhost:3000/api/Users

  **Body params:** {"email", "password", "name"}

  **Returns:** UserId is created
  
- Api to login the existing user
  **GET**: http://localhost:3000/api/Users

  **Query params:** {"email", "password"}

  **Returns:** UserId along with autheticated access token

**Books API**
  Api accessed by the authenticated users are:
  - Add book: [POST] `http://localhost:3000/api/books?access_token=${access_token}`
  - Update book details: [PATCH] `http://localhost:3000/api/books/:bookId`
  - Get specific book detail: [GET] `http://localhost:3000/api/books/:bookId`
  - Get paginated list of book: [GET] `http://localhost:3000/api/books?filter={"limit": 10, "skip": 0}`
  - Delete book [DELETE] `http://localhost:3000/api/books/:bookId`
  - Delete all books [DELETE] `http://localhost:3000/api/books`