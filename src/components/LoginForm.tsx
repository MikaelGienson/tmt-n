// import loginImg from "../../login.svg";
import { FC, useRef, useState, useEffect, useContext } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import './LoginForm.scss'
import axios from "../api/axios";
import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const schema = yup.object().shape({
//   username: yup.string().min(4).max(20).required('Username is required'),
//   password: yup.string().min(4).max(20).required('Password is required')
// });

const LoginForm = () => {
  // const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrorMsg] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [pwdVisibility, setPwdVisibility] = useState(true)

  const userRef = useRef<HTMLInputElement>(null!);
  const errRef = useRef<HTMLDivElement>(null);

  // focus on input element when component mounts
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd]);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // try {
      const response = await axios.post(
        // LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response))
  //     const accessToken = response?.data?.accessToken;
  //     const roles = response?.data?.roles;
  //     // setAuth({ user, pwd, roles, accessToken });
  //     setUser("");
  //     setPwd("");
  //     setSuccess(true); //just for tutorial
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrorMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrorMsg("Missing username or password");
  //     } else if (err.response?.status === 401) {
  //       setErrorMsg("Unauthorized");
  //     } else {
  //       setErrorMsg("Login Failed");
  //     }
  //     (errRef.current as HTMLInputElement).focus();
    // }
  }

  return (
    <div className="base-container">
      <div className="errmsg-container">
        <div
          ref={errRef}
          className={errMsg ? "errmsg  errmsg-show" : "errmsg"}
          aria-live="assertive"
        >
          Wrong username or password
        </div>
      </div>
      <div className="logo">TMT</div>
      <form>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username / email</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div className="form-group password">
              <label htmlFor="password">Password</label>
              <input
                type={pwdVisibility ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <FontAwesomeIcon className='password-icon' icon={['fas', `${pwdVisibility ? 'eye-slash' : 'eye'}`]} onClick={() => setPwdVisibility(!pwdVisibility)} />
            </div>
              <a href="#" className="not-remember">
                I don't remember username or password
              </a>
          </div>
        </div>
        <div className="footer">
          <button type="submit" onClick={handleLogin} className="btn">
            Login
          </button>
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;