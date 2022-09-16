import React, { useEffect, useState } from "react";
import { TextInput, Checkbox, Button, Group, Box, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { handleLoginWithEmail } from "~/src/services/magic";
import { userAtom } from "../stores/auth";

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
  const [user, setUser] = useAtom(userAtom);
  const [loginError, setLoginError] = useState<Error | null>(null);

  useEffect(() => {
    user != null &&
      user.issuer != null &&
      user.issuer.length > 0 &&
      navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <h1>Login</h1>
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
        <Group position="right" mt="md">
          <Button type="submit" disabled={formDisabled}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}
