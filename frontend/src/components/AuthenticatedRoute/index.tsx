import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/src/hooks/auth";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps): ReactNode {
  const { user, loading: userLoading } = useAuth();

  if (userLoading) return null;

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return children;
}
