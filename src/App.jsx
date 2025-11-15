import React, { useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AdminHome from "./pages/AdminHome";
import ClientHome from "./pages/ClientHome";
import ApiHome from "./pages/ApiHome";
import PublicHome from "./pages/PublicHome";
import NotFound from "./pages/NotFound";

function detectTenant(hostname) {
  const host = (hostname || "").toLowerCase();

  if (host.startsWith("admin.") || host.includes("admin.localhost"))
    return "admin";
  if (host.startsWith("client.") || host.includes("client.localhost"))
    return "client";
  if (host.startsWith("api.") || host.includes("api.localhost")) return "api";

  return "public";
}

export default function App() {
  const realHost = window.location.hostname;
  const [host, setHost] = useState("");

  const hostname = host || realHost;
  const tenant = useMemo(() => detectTenant(hostname), [hostname]);

  return (
    <div style={{padding: 20 }}>
      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <h2>Domain Routing Demo</h2>
        <div style={{ marginLeft: "auto" }}>
          <label style={{ marginRight: 8 }}>Host:</label>
          <select value={host} onChange={(e) => setHost(e.target.value)}>
            <option value="">(use real host: {realHost})</option>
            <option value="admin.localhost">admin.localhost</option>
            <option value="client.localhost">client.localhost</option>
            <option value="api.localhost">api.localhost</option>
            <option value="myapp.localhost">myapp.localhost</option>
          </select>
        </div>
      </header>

      <div style={{ marginBottom: 12 }}>
        <strong>Detected host: </strong> 
        {hostname} — 
        <strong>Tenant:</strong>{" "}
        {tenant}
      </div>

      <nav style={{ marginBottom: 12 }}>
        <Link to="/">Home</Link> {" | "}
        <Link to="/about">About</Link> {" | "}
        <Link to="/settings">Settings</Link>
      </nav>

      {/*tane bsed routing*/}
      {tenant === "admin" && (
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/about" element={<div>Admin about page</div>} />
          <Route path="/settings" element={<div>Admin settings</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      {tenant === "client" && (
        <Routes>
          <Route path="/" element={<ClientHome />} />
          <Route path="/about" element={<div>Client about</div>} />
          <Route path="/settings" element={<div>Client settings</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      {tenant === "api" && (
        <Routes>
          <Route path="/" element={<ApiHome />} />
          <Route
            path="*"
            element={<div>API endpoint - this app simulates API docs</div>}
          />
        </Routes>
      )}

      {tenant === "public" && (
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/about" element={<div>Public about</div>} />
          <Route path="/settings" element={<div>Public settings</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}
