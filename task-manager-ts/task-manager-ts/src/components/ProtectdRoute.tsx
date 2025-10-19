import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

const Protected: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;
export const ProtectedRoute = withAuthenticationRequired(Protected, {
  onRedirecting: () => <p style={{padding:16}}>Checking authentication…</p>,
});
