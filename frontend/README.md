
# Fresh market online
This is a full-stack SPA online shop application demo.

## Introduction
This project is an example to E-commerce application with a shopping cart model that can handle customers and sellers in a CRM platform with a database.

## features

* **Authorization panel** 
* **Notifications**  
* **Dynamic shopping cart** 
* **Client - Adding products to the cart**
* **Admin  - adding, editing and deleting product cards**
* **Displaying the last cart that was not sent to the order**
* **Displaying the product cards by category**  
* **Sending an order of the cart**

## Methods

| Method             | explanation                                   |                             
| ------------------- | ----------------------------------------------- |
| **Lazy loading** | for two features (admin and client).|
| **Shared Module** | shared singleton components.|
| **Core Module** | shared singleton services. |
| **Route guards** | Preventing unauthorized access.|
| **Directive** | for auto saving on exit.|
| **Dynamic components** | load new components at runtime.|
| **Global state** | management with RxJS.|
| **LocalStorage** | cart, token storage.|
| **Responsive display** | display adjustment for each device.|
| **Mongoose** | schemas, validation, Models, populate, virtual, queries, aggregation |
| **Hashing password** | salt Password, register and login. |
| **Authentication** | User identity verification. |
| **Authorization** | approval of actions according to the role. |


## Tech Stack

**Client:** Angular, TypeScript, Material UI, CSS, RxJS, JWT.

**Server:** Node.js, Express, Mongoose, cors, JWT, uuid.


## Lessons Learned

* Draw a diagram of the entire project before starting to program.
* Program the client and server side at the same time.
* Divide the project into parts and define a working time for each part.
* Management of a secondary git branch to the main.
## Run Locally

Clone the project

```bash
  git clone https://github.com/Lior-Halperin/ShoppingOnline.git
```
**The following commands must be run for both layers, frontend and backend.
Go to the project directory

```bash
  cd ShoppingOnline\enter the layer name
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Authors

- [@Lior-Halperin](https://www.github.com/Lior-Halperin)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lior-halperin-25a90b219/)


