import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { magic } from "~/services/magic";
import { userAtom, userLoading } from "~/stores/auth";

const App = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setUserLoading] = useAtom(userLoading);

  useEffect(() => {
    setUserLoading(true);
    magic.user.isLoggedIn().then((isLoggedIn) => {
      isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser(null);
    });
  }, []);

  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  );
};

export default App;
