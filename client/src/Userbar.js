import { useContext } from "react";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./contexts";
export default function UserBar() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;

  if (user) {
    return <Logout />;
  } else {
    return (
      <>
        <Login dispatchUser={dispatchUser} />
        <Register dispatchUser={dispatchUser} />
      </>
    );
  }
}
