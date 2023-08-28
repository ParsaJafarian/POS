# POS
POS is a point of sales system for small clothing businesses. It is a web application that allows users to create and manage products, customers, and orders. It also allows users to view reports on sales and inventory. For more information about the user implementation of the application, please refer to the following link: https://youtu.be/g0eF8T9rfFY

## Installation
1. Clone the repository
2. Go to the project's database directory
```
cd POS/database
```
3. Create the database
```
mysql -u <username> -p <password>
mysql> source pos.sql;
```
4. Go to the project's root directory
```
cd POS
```
5. Install dependencies
```
npm install
```
6. Insert fake data
```
node fake_data/seeds.js
```
7. Start the server
```
npm start
```
8. Open http://localhost:3000 in your browser

## Usage
1. Create a new account or login to an existing account
2. Create products, customers, and orders
3. View reports on sales and inventory
4. Read the home page for more information

## Program Structure

### Database
The database system used is MySQL as it provides good visualization of data and data relationships. The database is not yet hosted on a server, so the database must be installed locally. The database is composed of the following tables and views:

1. employees
2. products
3. transactions
4. tp (stands for transaction_products)
5. tp_view

There exists some other tables but they remain unused for the moment. 

The employees table stores all the personal credentials of employees so that they can register, log in and make transactions.

The products table stores all information of products. One important aspect of this table is that it points to its most recent transaction number with the column 'last_trans_num'. This table is later used to visualize products on the client side. 

The transations table stores the date, employee number and the customer number (the customer table is still not implemented)

tp is the index table that describes the relationship between a product and its associated transaction and vice versa. This table is created becasue products and transactions have a many to many relationships. A product can be in multiple transactions and a transaction can have multiple products. Moreover, the columns "is_return" and "last_trans_num" help keep a history of what was bought or returned. They also organize the data just like in a linked list: newly inserted data points to the last inserted data. Thanks to this table, clear data visualizations can be made on the client side.

tp_view is a more detailed version of the transactions. With the help of tp , all tables are joined onto tp_view and the finer details of the amount of money returned or bought are filtered out. This view is later used to visualize transactions.

### Server
In this section, a brief overview of the server is given and the utilities that help its routes. The routes are organized in a RESTful manner so that the organization is simple and understandable. 

#### Database Connection
In .utils/db, a pool that connects to the local database is created and exported. A pool was chosen because it provided promise functionalities. Thanks to this, the code can be kept clean with the "async" and "await" keywords as well as the "then" and "catch" methods.

#### Error Handling
In the ./utils directory, the ExpressError.js and the catchAsync.js files are used to handle errors throughout the whole application. ExpressError is a class extended from Error but it has a new added attribute of statusCode. The catchAsync function is used throughout the routes in order to pass on to the error handling middle ware that is next. Moreoever, it keeps code clean so that try and catch statements are not used everywhere.

To notify the users of errors, the flash library is used. In most error handling middlewares, a flash message is passed onto the request. Then, the server redirects the user to a certain page where they could see the flash message. If no redirection is provided, the user is redirected to the /error route where they could see the stack trace of the error.

#### Routes
The server is split into 4 main routes;
1. /auth (stands for authentication)
2. /register
3. /transactions
4. /products

#### Auth
The auth route handles the login and logout functionalities of the program. These functionalities are implemented with
the use of passport.js, a library for authentication. In ./utils/configPassport.js, two processes take place for authentication:
- Use of a local strategy to validate a user's login
- Deserialization and Serializatino of the user

Passport is then finally set up as a middle-ware in app.js.

#### Register
The GET route of register shows the register page on the client side while the POST route validates and inserts the registration data.

#### Transactions
The transactions route sends a specific transaction when requested by the client, renders the transactions index page and inserts new transactions. The most important aspect is the insertion. In ./utils/completeTransaction, several queries are used to:
- Insert new data in the transactions table
- Update data in products by toggling a product availability and changing their last_trans_num
- Insert new data in tp to keep track of the transaction's relation with its products 

Another important route is the GET /transactions/:num/products route. This GET route renders the page that indicates all products associated to a given transaction. 

#### Products
The products is similiar to the transactions route. The only difference is that there is no POST route that inserts new products as of the moment. The products are only inserted through the fake data script.

### Client
The client side is composed of 4 main pages:
1. Login
2. Register
3. Transactions/new
4. Indexes for transactions and products
5. Home

#### Login
The login page is a simple form that sends a POST request to the /auth/login route. If the user is authenticated, they are redirected to the new transactions apge. If not, they are redirected to the login page with a flash message. Moreover, bootstrap validation is used in case any required fields are left empty. 

#### Register
The register page is a simple form that sends a POST request to the /register route. If the user is authenticated, they are redirected to the login page. If not, they are redirected to the register page with a flash message. Moreover, bootstrap validation is used in case any required fields are left empty.

#### Transactions/new
The transactions/new page is a form that allows the user to create a new transaction. Its functionalities are mainly implemented by a set of buttons. The buttons are:
 - Buy (adds a product to the transaction as a purchase)
 - Return (adds a product to the transaction as a return, if clicked for the first time, a modal is opened to ask for the last transaction number of the product)
 - Delete (deletes a product from the transaction, it is marked by an "X")
 - Reset (resets the transaction page)
 - Checkout (sends a POST request to the /transactions route to insert the transaction into the database after asking for method of payment)

To access the script that handles the buttons, please go to ./public/scripts/productsList.js.

#### Indexes for transactions and products
The indexes for transactions and products are tables that display all the transactions and products in the database. They are implemented with the use of the DataTables library. The tables are searchable and sortable. The transaction table gets its data from the tp_view view while the product table gets its data from the products table.

#### Home
The home page is a guiding page for employees using the application. It contains a brief description of the application and explains possible rrors that could occur.

## Future Work
- Implement a customer table in the database
- Implement RESFUL routes for customers 
- Optimize memory storage in database by removing unneccessary columns in tables
- Add an admin role to the application (ex. admin can delete products, employees, etc.)
- Add a POST route to the products route to insert new products

## Credits
- [Bootstrap](https://getbootstrap.com/)
- [DataTables](https://datatables.net/)
- [Express](https://expressjs.com/)
- [Express-Session](https://www.npmjs.com/package/express-session)
- [Express-Flash](https://www.npmjs.com/package/express-flash)
- [JQuery](https://jquery.com/)
- [MySQL](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en/)
- [Passport](http://www.passportjs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Faker.js](https://www.npmjs.com/package/faker)
