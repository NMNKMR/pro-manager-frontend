import styles from "./css/Auth.module.scss";
import {CiMail} from "react-icons/ci";
import PasswordInput from "../components/form-inputs/PasswordInput";
import Button from "../components/form-inputs/Button";
import { useState } from "react";
import { loginUser } from "../apis/auth.js";
import AuthWrap from "../components/AuthWrap.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/user.context.js";

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setUser((prev)=> ({...prev, [name]: value}))
    }

    const handleLogin = async (e)=> {
        e.preventDefault();
        setError("");
        setProcessing(true);

        let loginError = "";

        if(user.email.trim() === "" || user.password.trim() === "") loginError="All fields are required";
        else if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) loginError="Invalid email address";
        else if(user.password.length < 8) loginError="Password of minimum 8 characters required"

        if(loginError) {
            setError(loginError);
            setProcessing(false);
            return;
        }

        const {data: userData, error} = await loginUser({...user});
        if(error) {
            setError(error);
            setProcessing(false);
            return;
        }
        
        login({...userData})
        localStorage.setItem("accessToken", userData.accessToken);
        navigate('/dashboard');

    }

  return (
    <AuthWrap>
      <div className={styles.auth}>
        <main>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <div className={styles.form_input}>
                <CiMail />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <div className={styles.form_input}>
                <PasswordInput
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <p>{error}</p>
            <div>
              <Button type="submit" processing={processing}>
                Log in
              </Button>
            </div>
          </form>
          <section>
            <p>Have no account yet?</p>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </section>
        </main>
      </div>
    </AuthWrap>
  );
}

export default Login