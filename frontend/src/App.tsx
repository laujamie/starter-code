import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Container, MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { magic } from "~/src/services/magic";
import { userAtom, userLoading } from "~/src/stores/auth";
import Navbar from "~/src/components/Navbar";

const App = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setUserLoading] = useAtom(userLoading);

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
      <Navbar title="Starter Project" />
      <Container>
        <Outlet />
      </Container>
    </MantineProvider>
  );
};

export default App;
