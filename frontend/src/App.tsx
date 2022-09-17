import React, { useEffect } from "react";
import { Container, LoadingOverlay, MantineProvider } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { magic, handleLogout as logoutHelper } from "~/src/services/magic";
import { useAuth } from "~/src/hooks/auth";
import Navbar from "~/src/components/Navbar";

const App = () => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    loading: isUserLoading,
    setLoading: setUserLoading,
  } = useAuth();

  const handleLogout = () => {
    logoutHelper().then(() => {
      navigate("/login");
      setUser(null);
    });
  };

  useEffect(() => {
    setUserLoading(true);
    magic.user.isLoggedIn().then((isLoggedIn) => {
      setUserLoading(false);
      isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser(null);
    });
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <Navbar
        title="Starter Project"
        user={user != null}
        logout={handleLogout}
      />
      <Container>
        <LoadingOverlay visible={isUserLoading} />
        <Outlet />
      </Container>
    </MantineProvider>
  );
};

export default App;
