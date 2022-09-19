import React from "react";
import { Container, Grid, Paper, Group, Anchor, Text } from "@mantine/core";
import { Link } from "react-router-dom";

type NavbarProps = {
  title: string;
  backgroundColor?: string;
  user: boolean; // isolate component from business logic
  logout: () => void;
};

export default function Navbar({
  title,
  backgroundColor,
  user,
  logout,
}: NavbarProps): JSX.Element {
  return (
    <Paper
      shadow="xs"
      style={{ background: backgroundColor, width: "100%" }}
      py={12}
    >
      <Container>
        <Grid align="center">
          <Grid.Col span={4}>
            <Anchor size="lg" variant="text" component={Link} to="/">
              {title}
            </Anchor>
          </Grid.Col>
          <Grid.Col span={8}>
            {!user ? (
              <Group position="right">
                <Anchor
                  component={Link}
                  to="/login"
                  underline={false}
                  variant="text"
                >
                  Login
                </Anchor>
              </Group>
            ) : (
              <Group position="right">
                <Text onClick={logout} sx={{ cursor: "pointer" }}>
                  Logout
                </Text>
              </Group>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
}
