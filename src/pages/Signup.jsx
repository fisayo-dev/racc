import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Forward } from "iconsax-react";
import { FingerPrintIcon } from "@heroicons/react/24/outline";
const Signup = () => {
  const [date, setDate] = useState();
  const [formStatus, setFormStatus] = useState(0);
  return (
    <div className="text-zinc-200 grid gap-3 py-5">
      <h2 className="md:text-4xl text-3xl text-blue-300 font-bold text-center py-5 ">
        Racc
      </h2>
      <div className="grid gap-5">
        <div className="flex justify-center gap-2">
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus == 0 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus == 1 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus == 2 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus == 3 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
        </div>
        {formStatus == 0 && (
          <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
            <div className="grid gap-6">
              <h2 className="text-center text-3xl font-bold">
                Hi, Lets get to know you
              </h2>
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
                      className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
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
              <Button
                onClick={() => setFormStatus((prev) => prev + 1)}
                type="icon"
              >
                <p>Next</p>
                <Forward />
              </Button>
            </div>
          </div>
        )}
        {formStatus == 1 && (
          <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
            <div className="grid gap-6">
              <h2 className="text-center text-3xl font-bold">
                Tell us more about yourself, Fisayo
              </h2>
              <div className="grid gap-3">
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">Where do you live ?</label>
                  <Select className="outline-none">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Nigeria</SelectItem>
                      <SelectItem value="dark">South America</SelectItem>
                      <SelectItem value="system">China</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 w-full shadow-md">
                  <label className="font-bold">What's your Gender ?</label>
                  <Select className="outline-none">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Male</SelectItem>
                      <SelectItem value="dark">Female</SelectItem>
                      <SelectItem value="system">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="font-bold">When were you born ?</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "bg-transparent text-gray-200 justify-start text-left font-normal",
                          !date && "text-gray-300"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button
                onClick={() => setFormStatus((prev) => prev + 1)}
                type="icon"
              >
                <p>Next</p>
                <Forward />
              </Button>
            </div>
          </div>
        )}
        {formStatus == 2 && (
          <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
            <div className="grid gap-6">
              <h2 className="text-center text-3xl font-bold">
                Let people be able to see you
              </h2>
              <div className="grid gap-3">
                <div className="grid gap-2 w-full">
                  <label className="font-bold">
                    Upload your profile picture
                  </label>
                  <Input type="file" className="text-slate-300" />
                  <div className="h-[350px] w-[350px] mt-5 mx-auto rounded-full bg-zinc-300"></div>
                </div>
                <div className="grid gap-2 w-full">
                  <label className="font-bold">Enter your username:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] shadow-md text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="@fisayobadina"
                  />
                  <label className="text-sm">
                    This is your public display name
                  </label>
                </div>
              </div>
              <Button
                onClick={() => setFormStatus((prev) => prev + 1)}
                type="icon"
              >
                <p>Next</p>
                <Forward />
              </Button>
            </div>
          </div>
        )}
        {formStatus == 3 && (
          <div className=" md:w-5/12 sm:w-3/5 w-full shadow-md mx-auto bg-zinc-700 md:rounded-xl rounded-t-3xl p-5 my-5">
            <div className="grid gap-6">
              <h2 className="text-center text-3xl font-bold">
                How do you want to vote ?
              </h2>
              <div className="grid gap-3">
                <div className="grid gap-2 w-full">
                  <label className="font-bold">Use Voting ID</label>
                  <input
                    type="text"
                    className="border-[0.1rem] shadow-md text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                    placeholder="must be at least 10 character long"
                  />
                  <label className="text-sm">
                    You will use this ID anytime you want to vote
                  </label>
                </div>
                <p className="text-center py-1 text-zinc-300">
                  {" "}
                  OR
                </p>
                <div className="grid gap-2 w-full">
                  <label className="font-bold">Use Fingerprint</label>
                  <div className="border-[0.1rem] cursor-pointer hover:text-zinc-800 shadow-md text-[0.9rem] hover:bg-zinc-400 border-zinc-400 py-3 px-3 rounded-md w-full">
                    <div className="flex items-center gap-2 justify-center">
                      <FingerPrintIcon className="w-6 h-6" />
                      <p>Intergrate my Fingerprint</p>
                    </div>
                  </div>
                  <label className="text-sm">
                    You will have to verify via fingerprint each time you want
                    to vote
                  </label>
                </div>
              </div>
              <Button
                type="icon"
              >
                <p>Finish Account</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
