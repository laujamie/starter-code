import React, { useEffect } from "react";
import {
  Container,
  LoadingOverlay,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { magic } from "~/src/services/magic";
import { useAuth } from "~/src/hooks/auth";
import Navbar from "~/src/components/Navbar";
import "./App.css";

const App = () => {
  const {
    user,
    setUser,
    loading: isUserLoading,
    setLoading: setUserLoading,
  } = useAuth();

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
      <Stack align="center" spacing={0} sx={{ flexGrow: 1 }}>
        <Navbar title="Starter Project" user={user} />
        <Container
          py="md"
          sx={{ minHeight: "100%", flexGrow: 1, width: "100%" }}
        >
          <LoadingOverlay visible={isUserLoading} />
          <Outlet />
        </Container>
      </Stack>
    </MantineProvider>
  );
};

export default App;
