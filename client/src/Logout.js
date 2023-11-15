import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Logout() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // setUser("");
        dispatchUser({ type: "LOGOUT" });
      }}
    >
      <input type="submit" value="Logout" />
    </form>
  );
}
