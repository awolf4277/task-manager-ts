import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Home</h2>
      <p>If you see this, the app is running.</p>
      <p><Link to="/secret">Go to protected page</Link></p>
    </div>
  );
}

function Secret() {
  return (
    <div style={{ padding: 16 }}>
      <h2>🔒 Secret Area</h2>
      <p>You can only see this when logged in.</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={<ProtectedRoute><Secret /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

