import { useState } from "react";
import { useNavigate } from "react-router-dom";
import _USERS from "../user/Users";
import { AuthService } from "../helper/AuthService";
import Button from "../../components/button/Button";
import { User } from "../interface";

import styles from "../../assets/styles/modules/Login.module.css"

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const my_user: User | undefined = _USERS.find(
      (user: User) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );
    if (!my_user) return alert("Invalid credentials");
    AuthService.saveToken("mock-jwt-token");
    navigate("/app");
  };

  return (
      <div className={styles.container}>
        <div className={styles.box}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="user@org.com"
                    value={credentials.email}
                    onChange={handleChange}
                    />
            </div>
            <div className={styles.input_group}>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                value={credentials.password}
                onChange={handleChange}
                />
            </div>
            <Button className={styles.login_button} type={"submit"} variant={"default"}>
                Log in
            </Button>
        </form>
        </div>
    </div>
  );
};
