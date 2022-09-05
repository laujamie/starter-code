import React from "react";
import { Text, Container, Grid, Paper, Group, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

type NavbarProps = {
  title: string;
  backgroundColor?: string;
};

export default function Navbar({
  title,
  backgroundColor,
}: NavbarProps): JSX.Element {
  return (
    <Paper shadow="xs" style={{ background: backgroundColor }} py={12}>
      <Container>
        <Grid align="center">
          <Grid.Col span={4}>
            <Anchor size="lg" variant="text" component={Link} to="/">
              {title}
            </Anchor>
          </Grid.Col>
          <Grid.Col span={8}>
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
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
}
