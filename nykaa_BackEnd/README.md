# Nykaa Backend

## Overview
This is the backend of the Nykaa Clone project, built using Node.js, Express, and MongoDB. The backend includes user authentication, product management, cart functionality, and order processing. It also integrates Cloudinary for image uploads and JWT for authentication.

## Features
- User Authentication (Signup, Login, Logout)
- Role-Based Access Control (Admin, Seller, Buyer)
- Product Management (Add, Edit, Delete, Search)
- Cart Management (Add to Cart, Edit, Delete, View)
- Order Management (Place Order, View Orders, Admin Order Management)
- JWT-based Authentication
- Cloudinary Image Uploads
- Secure API with Middleware for Authentication and Authorization

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary for Image Storage
- Multer for File Uploads
- bcrypt for Password Hashing

**Environment Variables**
   ```env
   port=YOUR_PORT_NUMBER
   database=YOUR_MONGODB_URL
   key=YOUR_JWT_SECRET_KEY
   cloudName=YOUR_CLOUDINARY_CLOUD_NAME
   APIKEY=YOUR_CLOUDINARY_API_KEY
   APISecret=YOUR_CLOUDINARY_API_SECRET
   ```

## API Endpoints
### User Routes (`/users`)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/users/signIn` | Register a new user |
| POST | `/users/login` | Login and get JWT tokens |
| GET | `/users/logout` | Logout and blacklist tokens |
| PATCH | `/users/edit/:id` | Edit user details |
| DELETE | `/users/delete/:id` | Delete a user account |
| GET | `/profile/:id` | Get the login user data |

### Product Routes (`/products`)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/products/addProducts` | Add a new product (Admin/Seller) |
| PATCH | `/products/editProducts/:id` | Edit product details (Admin/Seller) |
| DELETE | `/products/deleteProducts/:id` | Delete a product (Admin/Seller) |
| GET | `/products/allProducts` | Fetch all products |
| GET | `/products/searchProduct?q=keyword` | Search products |

### Cart Routes (`/cart`)
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/cart/allcart` | Get all carts (Admin) |
| GET | `/cart/mycart` | Get current user's cart |
| POST | `/cart/addtocart` | Add item to cart |
| PATCH | `/cart/editOrders/:id` | Edit cart item quantity |
| DELETE | `/cart/deleteOrders/:id` | Remove item from cart |

### Order Routes (`/orders`)
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/orders/allOrders` | Get all orders (Admin) |
| GET | `/orders/myOrders` | Get current user's orders |
| POST | `/orders/addOrders` | Place a new order |

## Middleware
- `auth.js` - Authentication middleware for verifying JWT tokens
- `userAuth.js` - Middleware to validate user phone number
- `RoleBasedAccessControl.js` - Middleware to restrict access based on user roles

## Database Models
- **User Model**: Stores user details (name, email, password, phone number, role)
- **Product Model**: Stores product details (name, category, type, description, price, image)
- **Cart Model**: Stores cart items linked to users and products
- **Order Model**: Stores order details with multiple items and order status


## Author
[Ritesh_Kumar_Jena]

