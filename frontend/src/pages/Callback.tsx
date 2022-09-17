import React, { useEffect } from "react";
import { Loader } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/src/hooks/auth";
import { magic } from "~/src/services/magic";

export default function Callback(): JSX.Element {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const location = useLocation();

  useEffect(() => finishLogin(), []);

  const finishLogin = () => {
    const magicCredential = new URLSearchParams(location.search).get(
      "magic_credential"
    );
    if (magicCredential != null) {
      magic.auth
        .loginWithCredential()
        .then((didToken: string | null) => authenticateWithServer(didToken));
    }
  };

  const authenticateWithServer = async (didToken: string | null) => {
    const res = await fetch(`${process.env.SERVER_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${didToken}`,
      },
    });

    if (res.status === 200) {
      const userMetadata = await magic.user.getMetadata();
      setUser(userMetadata);
      navigate("/");
    }
  };

  return <Loader />;
}
