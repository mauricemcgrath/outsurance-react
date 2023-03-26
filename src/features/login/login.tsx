import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import LoginService  from "./login.service";
import "./css/login.css";
import { Subscription } from "rxjs";

let loginSubscription:Subscription = new Subscription();
let listUsersUrl = "/user-list";
let loginService = new LoginService();

function Login(props: any) {

  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  function doLogin(e:any) {

    e.preventDefault();
    setError("");

    if (checkIsValid()) {
      setIsBusy(true);

      loginSubscription = loginService.userLogin(user.email, user.password).subscribe(
        (response) =>
          response.json().then((data) => {
            if (data.token) {

              sessionStorage.setItem(loginService.tokenName, data.token);
              props.setAuth(true);
              navigate(listUsersUrl);
            } else {
              props.setAuth(false);
              setError(data.error);
            }
            setIsBusy(false);
          }
        )
      );
    }
  }

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event.code);
    debugger;
    if (event.code === "Enter") {
      doLogin(event);
    }
  };

  function checkIsValid() {
    setPasswordIsValid(true);
    setEmailIsValid(true);

    if (user.password !== "" && user.email !== "") {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (user.email === "" || !user.email.match(validRegex)) {
        setError("Enter a valid email");
        setEmailIsValid(false);
        return false;
      } else {
        setEmailIsValid(true);
        return true;
      }
    } else {
      if (user.password === "") {
        setError("Password is required");
        setPasswordIsValid(false);
      }

      return false;
    }
  }

  useEffect(() => {
    return () => {
      if (loginSubscription) {
        loginSubscription.unsubscribe();
      }
    };
  }, []);

  const onItemChange = (event:any) => {
    setError("");

    if (event) {
      if (event.target.id === "email") {
        setUser({ email: event.target.value, password: user.password });
      } else {
        setUser({ email: user.email, password: event.target.value });
      }
    }
  };

  return (
    <div className="login-outer" onKeyDown={keyDownEvent} >
      {isBusy ? <div>Loading...</div> : <div>&nbsp;</div>}

      <div className="login-error">{error}</div>

      <Form className="login-form" onSubmit={(e) => doLogin(e)} >
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => onItemChange(e)}
            invalid={!emailIsValid}
            value={user.email}
          />
          <Label for="exampleEmail">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => onItemChange(e)}
            invalid={!passwordIsValid}
            value={user.password}
          />
          <Label for="examplePassword">Password</Label>
        </FormGroup>{" "}
        <Button id="btn-submit" type="submit" >
          Login{" "}
          {isBusy ? (
            <Spinner size="sm">Loading...</Spinner>
          ) : (
            <span className="spinner-space"></span>
          )}
        </Button>{" "}
      </Form>
   
    </div>
  );
}

export default Login;
