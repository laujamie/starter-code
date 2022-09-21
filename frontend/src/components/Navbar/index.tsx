import React from "react";
import {
  Container,
  Grid,
  Paper,
  Group,
  Anchor,
  Text,
  HoverCard,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons";
import type { MagicUserMetadata } from "magic-sdk";

type NavbarProps = {
  title: string;
  backgroundColor?: string;
  user: MagicUserMetadata | null; // isolate component from business logic
};

export default function Navbar({
  title,
  backgroundColor,
  user,
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
            <Group position="right">
              {user == null ? (
                <Anchor
                  component={Link}
                  to="/login"
                  underline={false}
                  variant="text"
                >
                  Login
                </Anchor>
              ) : (
                <HoverCard position="bottom-end" width="target">
                  <HoverCard.Target>
                    <Group sx={{ cursor: "pointer" }} spacing={0}>
                      <Text>{user.email}</Text>
                      <IconChevronDown size={12} />
                    </Group>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Anchor
                      component={Link}
                      to="/logout"
                      underline={false}
                      variant="text"
                    >
                      Logout
                    </Anchor>
                  </HoverCard.Dropdown>
                </HoverCard>
              )}
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
}
