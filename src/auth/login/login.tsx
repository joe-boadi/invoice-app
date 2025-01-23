import { useContext, useRef, useState, useEffect } from "react";
import Button from "../../components/button/Button";
import AuthContext from "../context/AuthProvider";
import axios from "../../services/api/axios";
import { isAxiosError } from "axios";
import { CiCircleAlert } from "react-icons/ci";
import styles from "../../assets/styles/modules/Login.module.css";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "https://invoice-app-bknd-strapi-cloud.onrender.com/login";

const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const { setAuth } = authContext;

  const [email, setEmail] = useState("isaac.hayfron@amalitech.com");
  const [password, setPassword] = useState("Fe|3V3=$T_.K");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const accessToken = response?.data?.token;

      setAuth(accessToken);
      localStorage.setItem("token", accessToken);

      setEmail("");
      setPassword("");

      navigate("/app");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (!err.response) {
          setErrorMsg(`No Server Response ${errorMsg}`);
        } else if (err.response?.status === 400) {
          setErrorMsg("Invalid Credentials");
        } else if (err.response?.status === 401) {
          setErrorMsg("You are Unauthorized");
        } else {
          setErrorMsg("Login Failed");
        }
      } else {
        setErrorMsg("An unexpected error occurred");
      }
      emailRef.current?.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login</h2>
        {errorMsg && (
          <div className={styles.alertContainer}>
            <CiCircleAlert className={styles.alertIcon} />
            <p>{errorMsg}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              name="email"
              placeholder="john-asumasi@amalitech.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            className={styles.login_button}
            type={"submit"}
            variant={"default"}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
