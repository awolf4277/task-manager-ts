import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #eee"}}>
      <Link to="/" style={{fontWeight:700}}>Task Manager (TS)</Link>
      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        {isAuthenticated ? (
          <>
            <span>Hi, {user?.given_name || user?.nickname || user?.name}</span>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login / Register</button>
        )}
      </div>
    </header>
  );
}
