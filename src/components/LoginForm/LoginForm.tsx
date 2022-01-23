import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../../services/auth-service";
import { setUserLogin } from "../../store/Actions/Settings";
import { UserCredentialsT } from "../../utils/Types";

import s from "./LoginForm.module.scss";

const Schema = Yup.object({
  login: Yup.string()
    .min(6, "To short login...")
    .required("Need to fill the field*"),
  password: Yup.string()
    .min(6, "To short password...")
    .required("Need to fill the field*"),
});

export const LoginForm = ({ ...props }): JSX.Element => {
  const dispatch = useDispatch();
  const [isRegistrationChosen, setIsRegistrationChosen] =
    React.useState<boolean>(false);
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [serverErrors, setServerErrors] = React.useState<string>("");
  const [serverErrorFlag, setServerErrorFlag] = React.useState<boolean>(false);
  const navigation = useNavigate();

  const loginInitialState: UserCredentialsT = {
    login,
    password,
  };

  const setErrorFlagHandler = (): void => {
    setTimeout(() => {
      setServerErrorFlag(false);
    }, 7000);
    setServerErrorFlag(true);
  };

  const choseRegistration = (setActivity: boolean) => (): void => {
    setIsRegistrationChosen(setActivity);
  };

  const setLoginOnChange = (e: any): void => {
    setLogin(e.target.value);
  };

  const setPasswordOnChange = (e: any): void => {
    setPassword(e.target.value);
  };

  const registrationClickHandler =
    (login: string, password: string) => async () => {
      try {
        const response = await AuthService.registration(login, password);
        navigation(`/chats/${login}`);
        dispatch(setUserLogin(login));
        localStorage.setItem("token", response.data.accessToken);
      } catch (e: any) {
        setServerErrors(e.response?.data?.message);
        setErrorFlagHandler();
      }
    };

  const loginClickHandler = (login: string, password: string) => async () => {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setUserLogin(login));
      navigation(`/chats/${login}`);
    } catch (e: any) {
      setServerErrors(e.response?.data?.message);
      setErrorFlagHandler();
    }
  };

  const chooseFunction: any = isRegistrationChosen
    ? registrationClickHandler(login, password)
    : loginClickHandler(login, password);

  return (
    <div className={s.container}>
      {serverErrorFlag && (
        <div className={s.container_errors}>
          <span>{serverErrors}</span>
        </div>
      )}
      <Formik
        initialValues={loginInitialState}
        validationSchema={Schema}
        onSubmit={chooseFunction}
        validateOnChange
        enableReinitialize
      >
        {(props) => {
          const { errors } = props;
          return (
            <Form className={s.container_main}>
              <div className={s.container_main_header}>
                <span>USER LOGIN</span>
              </div>
              <div className={s.container_main_inputs}>
                <div className={s.login}>
                  <span>Login:</span>
                  <Field type="text" name="login" onChange={setLoginOnChange} />
                  <p>{errors.login}</p>
                </div>
                <div className={s.password}>
                  <span>Password:</span>
                  <Field
                    type="password"
                    name="password"
                    onChange={setPasswordOnChange}
                  />
                  <p>{errors.password}</p>
                </div>
              </div>
              <div className={s.container_main_btn}>
                {isRegistrationChosen ? (
                  <div>
                    <button type="submit">Registration</button>
                    <span onClick={choseRegistration(false)}>Login</span>
                  </div>
                ) : (
                  <div>
                    <button type="submit">LOGIN</button>
                    <span onClick={choseRegistration(true)}>Registration</span>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
