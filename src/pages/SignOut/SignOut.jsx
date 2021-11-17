import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function SignOut() {
  const history = useHistory();
  useEffect(() => {
    AuthService.logout();
    history.push("/login");
  }, [history]);

  return <div></div>;
}
