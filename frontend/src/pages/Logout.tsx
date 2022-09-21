import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { handleLogout } from "~/src/services/magic";
import { useAuth } from "~/src/hooks/auth";

export default function Logout(): JSX.Element {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const logoutFunc = async () => {
      await handleLogout();
      setUser(null);
    };

    logoutFunc().catch((err) => console.error(err));
  }, []);

  return user != null ? <Loader /> : <Navigate to="/login" />;
}
