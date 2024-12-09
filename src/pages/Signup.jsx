import { Button } from "@/components/ui/button";
import { Forward } from "iconsax-react";
const Signup = () => {
  return (
    <div className="text-zinc-200 grid gap-3 py-5">
      <h2 className="md:text-4xl text-3xl text-blue-300 font-bold text-center py-5 ">
        Racc
      </h2>
      <div className="grid gap-5">
        <div className="flex justify-center gap-2">
          <div className="rounded-xl w-10 md:w-20 p-1 bg-gray-400"></div>
          <div className="rounded-xl w-10 md:w-20 p-1 bg-gray-400"></div>
          <div className="rounded-xl w-10 md:w-20 p-1 bg-gray-400"></div>
          <div className="rounded-xl w-10 md:w-20 p-1 bg-gray-400"></div>
        </div>
        <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
          <div className="grid gap-6">
            <h2 className="text-center text-3xl font-bold">Hi, Lets get to know you</h2>
            <div className="grid gap-3">
              <div className="grid md:flex items-center md:gap-10 gap-3">
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">First Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] text-[0.9rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="Ex. John "
                  />
                </div>
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">Last Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] text-[0.9rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="Ex. Doe "
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Email address:</label>
                <input
                  type="text"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Ex. johndoe@gmail.com"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Password:</label>
                <input
                  type="password"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Must not be less than 6 digits"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Repeat password:</label>
                <input
                  type="password"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>
              <Button type="icon">
                <p>Next</p>
                <Forward />
              </Button>
          </div>
        </div>
        <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
          <div className="grid gap-6">
            <h2 className="text-center text-3xl font-bold">Tell us more about you, Fisayo</h2>
            <div className="grid gap-3">
              <div className="grid md:flex items-center md:gap-10 gap-3">
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">First Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="Ex. John "
                  />
                </div>
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">Last Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="Ex. Doe "
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Email address:</label>
                <input
                  type="text"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Ex. johndoe@gmail.com"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Password:</label>
                <input
                  type="password"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Must not be less than 6 digits"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Repeat password:</label>
                <input
                  type="password"
                  className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>
              <Button type="icon">
                <p>Next</p>
                <Forward />
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
