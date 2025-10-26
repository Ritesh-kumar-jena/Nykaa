# 🛒 Nykaa – Frontend 

A responsive Nykaa clone frontend built with **React** and **Chakra UI**, featuring dynamic product categories, search with suggestions, dark mode, wishlist, payment with order placement, and user authentication UI. It also has a static HTML/CSS/JS version demonstrating the responsive design and interactive components.

---

## 📸 Screenshots

### Desktop & Mobile Views

| Desktop | Mobile 1 | Mobile 2 |
|---------|----------|----------|
| ![Desktop](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536300/Screenshot_2025-10-04_050050_kxpjbv.png) | ![Mobile1](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536441/Screenshot_2025-10-04_051423_vu4jh2.png) | ![Mobile2](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536609/Screenshot_2025-10-04_051537_mrsgoe.png) |

### Home Page Variations

| Default | Dark Mode | Admin View |
|---------|-----------|------------|
| ![Home](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536697/Screenshot_2025-10-04_050223_jrvne1.png) | ![Home Dark](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536772/Screenshot_2025-10-04_050405_l5csly.png) | ![Home Admin](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536911/Screenshot_2025-10-04_050449_coy4tt.png) |

### Product Page Variations

| Default | Dark Mode |
|---------|-----------|
| ![Product](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536950/Screenshot_2025-10-04_050716_ofe88q.png) | ![Product Dark](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759536998/Screenshot_2025-10-04_050734_a5hp06.png) |

### Cart, Order, Wishlist & Billing

| Cart | Order | Wishlist | Billing |
|------|-------|----------|---------|
| ![Cart](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759537073/Screenshot_2025-10-04_050816_bf41qi.png) | ![Order](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759537117/Screenshot_2025-10-04_050538_ifxifn.png) | ![Wishlist](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759537278/Screenshot_2025-10-04_050650_qxptoo.png) | ![Billing](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759537321/Screenshot_2025-10-04_051152_h8gytq.png) |

### Footer

| Footer |
|--------|
| ![Footer](https://res.cloudinary.com/dy9gltg7s/image/upload/v1759537373/Screenshot_2025-10-04_052004_bhysaa.png) |


---

## 🚀 Features

- **Responsive Navbar & Footer**
  - Logo, dynamic category popovers, search bar with live suggestions, sign-in/sign-up, and cart icon.
  - Footer includes multi-column layout with navigation links, policies, and branding.

- **Dynamic Product Categories**
  - Uses `category → apply → type` structure from backend to generate menus dynamically.

- **Search with Debounce & Suggestions**
  - Typing triggers API calls after a delay for live search suggestions.

- **Dark Mode Support**
  - Toggle between light and dark themes using Chakra UI’s `useColorMode`.

- **Routing & Navigation**
  - Uses `react-router-dom` to navigate between Home, Products, Cart, Orders, Wishlist, Billing, etc.

- **Static HTML/CSS Version**
  - Demonstrates responsive design, interactive UI, and add-to-cart functionality (UI only).

- **Future-ready**
  - Easy integration with backend, authentication, payment gateway, and order tracking.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI library |
| Chakra UI | Component & styling system |
| React Router DOM | Client-side routing |
| React Context | State management for auth & products |
| Axios | API requests |
| React Icons | Icons (cart, search, etc.) |
| HTML5 | Static pages support |
| CSS3 | Styling & responsive layouts |
| JavaScript (ES6) | Interactive functionality |

---

## 📁 Project Structure

```
nykaa_ForntEnd/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DarkMode.jsx
│   │   ├── Allroutes.jsx.jsx
│   │   └── navComponents/ProductCategory.jsx
│   ├── contex/
│   │   ├── AuthContextProvider.jsx
│   │   ├── CartContextProvider.jsx
│   │   └── ProductContextProvider.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Product.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   ├── Billing.jsx
│   │   ├── AddProducts.jsx
│   │   ├── ContactUs.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsAndConditions.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/api.js
│   ├── App.jsx
│   └── main.jsx
├── index.html (for static version)
├── css/ (for static CSS)
├── js/ (for static JS)
├── package.json
└── README.md
```

---

## 🎯 Setup & Running Locally

### React Version
1. **Clone the repository**
```bash
git clone https://github.com/Ritesh-kumar-jena/Nykaa.git
cd Nykaa/nykaa_ForntEnd
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Visit `http://localhost:5173` (or shown port) to see the app.

### Static HTML/CSS/JS Version
1. Open `index.html` in your browser.
2. Browse products and interact with UI components.

---

## 🔧 Environment Variables & API

- Frontend `api.js` uses a base URL pointing to the backend.
- Backend must be running for full functionality.
- JWT tokens stored in LocalStorage for auth.

---

## Deployed Link :- https://ritesh-kumar-jena-n-y-k-a-a-clone.netlify.app/

## 💼 Author

**Ritesh Kumar Jena**  
Frontend Developer & MERN Stack Enthusiast 
- Email: jenariteshkumar85@gmail.com  
[GitHub](https://github.com/Ritesh-kumar-jena) | [LinkedIn](http://www.linkedin.com/in/ritesh-kumar-jena-aa6407270)

---

⚠️ *This project is for learning/portfolio purposes. Not intended for commercial use.*

