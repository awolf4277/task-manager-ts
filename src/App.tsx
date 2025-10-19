import { useAuth0 } from "@auth0/auth0-react";
export default function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div style={{ padding: 16 }}>
      <h1>Task Manager (TS)</h1>
      {isAuthenticated ? (
        <>
          <p>Hi, {user?.name}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login / Register</button>
      )}
      <p>If you see this, the app is running.</p>
    </div>
  );
}
