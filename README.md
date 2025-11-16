# 🌐 Client-Side Domain Routing in React

A clean and simple React project demonstrating **domain-based multi-tenant routing**.  
The UI and routes change automatically based on the **hostname** or **emulated host**, allowing one React app to behave like multiple apps (Admin, Client, API, Public).

---

## 🚀 Features

- Client-side **domain & subdomain routing**
- **Tenant detection** from hostname (`admin.`, `client.`, `api.`)
- **Different UI + routes per tenant**
- **Emulate Host** dropdown for easy local testing
- Clean, modern UI styled with **Tailwind CSS**
- Simple + modular folder structure

---

## 🧠 How It Works

1. The app reads `window.location.hostname`.
2. The function `detectTenant()` maps hostnames to tenants:
   - `admin.localhost` → **Admin**
   - `client.localhost` → **Client**
   - `api.localhost` → **API**
   - Anything else → **Public**
3. Based on the detected tenant, React conditionally renders:
   ```jsx
   {tenant === "admin" && <AdminRoutes />}
---

## Folder Structure
```
src/
├── App.jsx
├── main.jsx
├── index.css
└── pages/
    ├── AdminHome.jsx
    ├── ClientHome.jsx
    ├── ApiHome.jsx
    ├── PublicHome.jsx
    └── NotFound.jsx


```

## Run the project
```
npm install
npm run dev
```

