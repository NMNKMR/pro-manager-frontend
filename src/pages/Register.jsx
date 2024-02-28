import styles from "./css/Auth.module.scss";
import {CiMail} from "react-icons/ci";
import PasswordInput from "../components/form-inputs/PasswordInput";
import Button from "../components/form-inputs/Button";
import { useState } from "react";
import { registerUser } from "../apis/auth.js";
import AuthWrap from "../components/AuthWrap.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/user.context.js";
import { IoPersonOutline } from "react-icons/io5";

function Register() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [user, setUser] = useState({
        name: "",
        email: "",
        confirmPassword: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setUser((prev)=> ({...prev, [name]: value}))
    }

    const handleRegister = async (e)=> {
        e.preventDefault();
        setError("");
        setProcessing(true);

        let registerError = "";

        if([...Object.keys(user)].some((input)=> user[input].trim()==="")) registerError="All fields are required"
        else if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) registerError="Invalid email address"
        else if(user.password.length < 8) registerError="Password of minimum 8 characters required"
        else if(user.password !== user.confirmPassword) registerError="Password does not match"

        if(registerError) {
            setError(registerError);
            setProcessing(false);
            return;
        }

        const {data: newUser, error} = await registerUser({...user});
        if(error) {
            setError(error);
            setProcessing(false);
            return;
        }
        
        login({...newUser})
        localStorage.setItem("accessToken", newUser.accessToken);
        navigate('/dashboard');

    }

  return (
    <AuthWrap>
        <div className={styles.auth}>
        <main>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
            <div>
                <div className={styles.form_input}>
                <IoPersonOutline />
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                </div>
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
                <div className={styles.form_input}>
                <PasswordInput
                    value={user.confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                />
                </div>
            </div>
            <p>{error}</p>
            <div>
                <Button type="submit" processing={processing}>Register</Button>
            </div>
            </form>
            <section>
            <p>Have an account ?</p>
            <Button onClick={()=> navigate("/login")}>Log in</Button>
            </section>
        </main>
        </div>
    </AuthWrap>
  );
}

export default Register