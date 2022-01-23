import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import s from "./StartPage.module.scss";

export const StartPage = ({ ...props }): JSX.Element => {
  return (
    <div className={s.container}>
      <LoginForm />
    </div>
  );
};
