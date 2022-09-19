import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Button,
  Group,
  Alert,
  Paper,
  Divider,
  Box,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { handleLoginWithEmail } from "~/src/services/magic";
import { useAuth } from "~/src/hooks/auth";

type LoginForm = {
  email: string;
};

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const { user, setUser } = useAuth();
  const [loginError, setLoginError] = useState<Error | null>(null);

  useEffect(() => {
    user != null &&
      user.issuer != null &&
      user.issuer.length > 0 &&
      navigate("/");
  }, [user, navigate]);

  return (
    <Container size="xs">
      <Paper shadow="xs" p="xl">
        <Text component="h2" size={24}>
          Welcome back!
        </Text>
        <Divider />
        <Box pt="md">
          <form
            onSubmit={form.onSubmit((values) => {
              setFormDisabled(true);
              handleLoginWithEmail(values.email)
                .then((u) => {
                  setLoginError(null);
                  setUser(u);
                  navigate("/");
                })
                .catch((err: Error) => setLoginError(err))
                .finally(() => setFormDisabled(false));
            })}
          >
            <TextInput
              withAsterisk
              required
              label="Email"
              placeholder="johndoe@gmail.com"
              {...form.getInputProps("email")}
            />
            {loginError != null && (
              <Group mt="md" grow>
                <Alert color="red" title={"Login failed"}>
                  {loginError.message}
                </Alert>
              </Group>
            )}
            <Group grow mt="md">
              <Button type="submit" disabled={formDisabled}>
                Login/Sign Up
              </Button>
            </Group>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
