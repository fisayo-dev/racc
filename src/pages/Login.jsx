import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  // Input states
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emailUsernameError, setEmailUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = () => {
    if (password.trim() != "") {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (emailUsername.trim() != "") {
      setEmailUsernameError(false);
    } else {
      setEmailUsernameError(true);
    }

    if (password.trim() != "" && emailUsername.trim() != "") {
      const userData = {
        email: emailUsername,
        password,
      };
      loginUser(userData);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="text-zinc-200 grid gap-5 py-5">
      <Link to="/">
        <h2 className="md:text-4xl text-3xl text-blue-300 font-bold text-center py-5 ">
          Racc
        </h2>
      </Link>
      <div className="grid my-3 gap-5">
        <h2 className="text-center md:text-3xl text-2xl font-bold">
          Hey, Glad to have you back
        </h2>
        <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto p-5 my-3">
          <div className="grid gap-5">
            <form className="grid gap-2 w-full shadow-md">
              <label className="font-bold">Username / Email Address</label>
              <input
                type="email"
                className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                placeholder="Place in your username or email"
                value={emailUsername}
                onChange={(e) => setEmailUsername(e.target.value)}
              />
              {emailUsernameError && (
                <label htmlFor="" className="text-sm text-red-400">
                  This field cannot be empty
                </label>
              )}
            </form>
            <div className="grid gap-2 w-full shadow-md">
              <label className="font-bold">Password:</label>
              <input
                type="password"
                className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                placeholder="Place in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <label htmlFor="" className="text-sm text-red-400">
                  This field cannot be empty
                </label>
              )}
            </div>
            <Button
              className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
              onClick={handleSubmit}
              type="icon"
            >
              <p>Login</p>
            </Button>
            <div className="text-sm grid text-center items-center gap-2 ">
              <p>New to Racc? </p>
              <Link
                to="/login"
                className="text-zinc-300 hover:text-zinc-200 font-bold"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
