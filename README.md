# Multivendor-Billing-System

```yaml
-Multivendor Billing System  is fully Responsive MERN App
-Each vendor can create, fetch, update as well as delete their own products. 
-Based on their own products, vendor can create as well as fetch their own bills.
-Implemented download bill functionality.
-Implemented Authentication and Authorization with encrypted password.
-Admin can fetch anyone's details.
```

To Start Backend Server

- Go inside main folder .

```yaml
Step1: Clone repo to your local
Step2: npm i
Step3: create a .env file and add "MONGO_URL" , "PORT" and "JWT_SECRET"
Step4: npm start
```

To Start Frontend Server

- Go inside client folder .

```yaml
Step1: npm i
Step2: npm start
```

## Backend Includes

- User, Product, Bill and BillItems model
- User, Product and Bill controller
- Auth and joi middleware
- User, Product and Bill routes
- index file

### Models

- User Model

```yaml
    {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
      default: "VENDOR",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
```

- Product Model

```yaml
    {
    productName: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
```
- Bill Model

```yaml
 {
    customerName: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
```

- BillItem Model

```yaml
   {
    billId: {
      type: ObjectId,
      ref: "bill",
    },
    productId: {
      type: ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
```

## USER APIs

### POST /api/register

- Create a user by taking data from a request body .
- Password Should be in Encrypted Format.
- **Response format**
  - _**On success**_ - Return HTTP status 201 with user document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### POST /api/login

- Allow an user to login with their email and password.
- **Response format**
  - _**On success**_ - Return HTTP status 200, userId and JWT token in response body.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/user (Authentication required)

- Allow admin to get everyone's user details. And vendor to get all the user details of their own.
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/user/:userId (Authentication required)

- Allow an user to fetch details of their document.
- Make sure that userId in url param and in token is same
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

## Products APIs

### PRODUCTS /api/productss

- Create Products by taking the data from request body.
- **Response format**
  - _**On success**_ - Return HTTP status 201 and Post Into in response body.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/products (Authentication required)

- Allow admin to get everyone's products details. And vendor to get all the products of their own.
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/products/id/:productId (Authentication required)

- Get a user's product.
- Read userId from Request Params.
- Make sure that userId in url param and in token is same
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the post document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### PUT /api/products/update/:productId (Authentication required)

- Update the products details.
- Read id of the product from params .
- Get UserId from token.
- Make sure that userId in url param and in token is same
- **Response format**

  - _**On success**_ - Return HTTP status 200 and returns the updated Product document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

  ### PUT /api/products/delete/:productId (Authentication required)

- Delete the product.
- Read id of the product from params .
- Get UserId from token.
- Make sure that userId in url param and in token is same
- Mark isDeleted:true (soft delete)
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the updated Product document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

## Bill APIs

### POST /api/bill (Authentication required)

- Create Bill by taking customerName, phone, items from request body.
- **Response format**
  - _**On success**_ - Return HTTP status 201 and Bill info in response body.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/bill/getBills (Authentication required)

- Allow admin get everyone's Bill details. And vendor to get all the bills of their own.
- read id of the user from Params.
- Make sure that userId in url param and in token is same

- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the Friends document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/bill/vendor/:userId (Authentication required)

- Get a user's bill by userId.
- read id of the user from Params.
- Make sure that userId in url param and in token is same

- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the bill document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

### GET /api/bill/:billId (Authentication required)

- Get a user's bill by billId. Admin can fetch anyone's bill by billId
- read id of the bill from Params.
- Make sure that billId in url param and in token is same

- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the bill document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

## BillItem APIs

### GET /api/billItem/:billId (Authentication required)

- Get a bill's billItems by billId. Admin can fetch anyone's billItems by billId
- read id of the bill from Params.
- Make sure the userId from bill document(which you get from billId that you get from url params) and in token is same

- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the billItem document.
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.

## Middleware

### Authentication

- Make sure all the restricted routes are protected.

## Front-End

### Register

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Register.png?raw=true)

### Login

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Login.png?raw=true)

### Create Bill(After login)

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Create%20Bill.png?raw=true)

### Fetch Bills

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Fetch%20Bills.png?raw=true)

### Download Bill

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Download%20Bill.png?raw=true)


### Create Product

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Create%20Product.png?raw=true)

### Fetch Products

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Fetch%20Products.png?raw=true)

### Update Product

![App Screenshot](https://github.com/bhavi321/Multivendor-Billing-System/blob/main/screenshots/Update%20Product.png?raw=true)

