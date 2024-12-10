import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";;
const Login = () => {
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
            <div className="grid gap-2 w-full shadow-md">
              <label className="font-bold">Username / Email Address</label>
              <input
                type="text"
                className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                placeholder="Place in your username or email"
              />
            </div>
            <div className="grid gap-2 w-full shadow-md">
              <label className="font-bold">Password:</label>
              <input
                type="password"
                className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                placeholder="Place in your password"
              />
            </div>
            <Button 
                className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                  onClick={() => setFormStatus((prev) => prev + 1)}
                  type="icon"
                >
                  <p>Login</p>
            </Button>
            <div className="text-sm flex justify-center items-center gap-1">
              <p>Are you new here ? </p>
              <Link to="/signup" className="text-zinc-300 hover:text-zinc-200 font-bold">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
