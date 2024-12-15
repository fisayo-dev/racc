import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formStatus, setFormStatus] = useState(0);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  // Input states
  const [date, setDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [votingId, setVotingId] = useState("");
  const [country, setCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // Error states
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateStep = () => {
    const newErrors = {};

    if (formStatus === 0) {
      if (!firstName) newErrors.firstName = "First name is required.";
      if (!lastName) newErrors.lastName = "Last name is required.";
      if (!email) newErrors.email = "Email address is required.";
      if (!password || password.length < 8) {
        newErrors.password =
          "Password must be at least 8 characters long.";
      }
      if (password !== repeatPassword) {
        newErrors.repeatPassword = "Passwords must match.";
      }
    }

    if (formStatus === 1) {
      if (!country) newErrors.country = "Country is required.";
      if (!gender) newErrors.gender = "Gender is required.";
      if (!date) newErrors.date = "Birth date is required.";
    }

    if (formStatus === 2) {
      if (!username) newErrors.username = "Username is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setFormStatus((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setFormStatus((prev) => prev - 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = () => {
    if (validateStep()) {
      const userInfo = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        country,
        gender,
        birth_date: date,
        username,
        voting_id: votingId,
        profile_picture: profilePicture,
      };
      registerUser(userInfo);
    }
  };

  return (
    <div className="text-zinc-200 grid gap-5 py-5">
      <Link to="/">
        <h2 className="md:text-4xl text-3xl text-blue-300 font-bold text-center py-5 ">
          Racc
        </h2>
      </Link>
      <div className="grid gap-5 my-3">
        <div className="flex justify-center gap-2">
          <div className="rounded-xl w-10 md:w-20 p-1 bg-gray-400"></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus >= 1 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus >= 2 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
        </div>

        {formStatus === 0 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Hi, Let’s get to know you
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid md:flex items-center md:gap-10 gap-3">
                    <div className="grid gap-2 w-full shadow-md">
                      <label className="font-bold">First Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                        placeholder="Ex. John "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <p className="text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="grid gap-2 w-full shadow-md">
                      <label className="font-bold">Last Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                        placeholder="Ex. Doe "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.lastName && (
                        <p className="text-red-400">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Email address:</label>
                    <input
                      type="text"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Ex. johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-red-400">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Password:</label>
                    <input
                      type="password"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Must be at least 8 characters long"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <p className="text-red-400">{errors.password}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Repeat password:</label>
                    <input
                      type="password"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Re-enter your password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {errors.repeatPassword && (
                      <p className="text-red-400">{errors.repeatPassword}</p>
                    )}
                  </div>
                </div>

                <Button
                  className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                  onClick={handleNext}
                  type="icon"
                >
                  <p>Next</p>
                </Button>
              </div>
            </div>
          </div>
        )}

        {formStatus === 1 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Tell us more about yourself
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid gap-2 w-full shadow-md">
                    <label className="font-bold">Where do you live?</label>
                    <Select
                      className="outline-none"
                      value={country}
                      onValueChange={(value) => setCountry(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="South America">
                          South America
                        </SelectItem>
                        <SelectItem value="China">China</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-red-400">{errors.country}</p>
                    )}
                  </div>
                  <div className="grid gap-2 w-full shadow-md">
                    <label className="font-bold">What’s your Gender?</label>
                    <Select
                      className="outline-none"
                      value={gender}
                      onValueChange={(value) => setGender(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-400">{errors.gender}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">When were you born?</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-zinc-700 hover:bg-zinc-600 text-gray-200 justify-start text-left font-normal",
                            !date && "text-gray-300"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={handlePrevious}
                    type="icon"
                  >
                    <p>Previous</p>
                  </Button>
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={() => setFormStatus((prev) => prev + 1)}
                    type="icon"
                  >
                    <p>Next</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {formStatus == 2 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Let people be able to see you
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">
                      Upload your profile picture
                    </label>
                    <Input type="file" className="text-slate-300" />
                    <div className="md:h-[350px] md:w-[350px] h-[200px] w-[200px] mt-5 mx-auto rounded-full bg-zinc-300"></div>
                  </div>
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">Enter your username:</label>
                    <input
                      type="text"
                      className="border-[0.1rem] shadow-md text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="@fisayobadina"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="text-sm">
                      This is your public display name
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={handlePrevious}
                    type="icon"
                  >
                    <p>Previous</p>
                  </Button>
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={submitForm}
                    type="icon"
                  >
                    <p>Finish Account</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm flex justify-center items-center gap-1">
        <p>Already have an account? </p>
        <Link
          to="/login"
          className="text-zinc-300 hover:text-zinc-200 font-bold"
        >
          Login to the account
        </Link>
      </div>
    </div>
  );
};

export default Signup;


// Generated Result
/*

                         

*/

// Requested promp
/*

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const [formStatus, setFormStatus] = useState(0);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  // Inpur states
  const [date, setDate] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [votingId, setVotingId] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const submitForm = () => {
    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      country,
      gender,
      birth_date: date,
      username,
      voting_id: votingId,
    };
    registerUser(userInfo);
  };
  return (
    <div className="text-zinc-200 grid gap-5 py-5">
      <Link to="/">
        <h2 className="md:text-4xl text-3xl text-blue-300 font-bold text-center py-5 ">
          Racc
        </h2>
      </Link>
      <div className="grid gap-5 my-3">
        <div className="flex justify-center gap-2">
          <div
            className="rounded-xl w-10 md:w-20 p-1 bg-gray-400
          "
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus >= 1 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus >= 2 ? "bg-gray-400" : "bg-gray-600"
            }`}
          ></div>
          
        </div>
        {formStatus == 0 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Hi, Lets get to know you
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid md:flex items-center md:gap-10 gap-3">
                    <div className="grid gap-2 w-full shadow-md">
                      <label className="font-bold">First Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                        placeholder="Ex. John "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2 w-full shadow-md">
                      <label className="font-bold">Last Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                        placeholder="Ex. Doe "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Email address:</label>
                    <input
                      type="text"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Ex. johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Password:</label>
                    <input
                      type="password"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Must not be less than 6 digits"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Repeat password:</label>
                    <input
                      type="password"
                      className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="Re-enter your password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                  onClick={() => setFormStatus((prev) => prev + 1)}
                  type="icon"
                >
                  <p>Next</p>
                </Button>
              </div>
            </div>
          </div>
        )}
        {formStatus == 1 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Tell us more about yourself, Fisayo
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid gap-2 w-full shadow-md">
                    <label className="font-bold">Where do you live ?</label>
                    <Select
                      className="outline-none"
                      value={country}
                      onValueChange={(value) => setCountry(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="South America">
                          South America
                        </SelectItem>
                        <SelectItem value="China">China</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 w-full shadow-md">
                    <label className="font-bold">What's your Gender ?</label>
                    <Select
                      className="outline-none"
                      value={gender}
                      onValueChange={(value) => setGender(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
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
                            "bg-zinc-700 hover:bg-zinc-600 text-gray-200 justify-start text-left font-normal",
                            !date && "text-gray-300"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={() => setFormStatus((prev) => prev - 1)}
                    type="icon"
                  >
                    <p>Previous</p>
                  </Button>
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={() => setFormStatus((prev) => prev + 1)}
                    type="icon"
                  >
                    <p>Next</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {formStatus == 2 && (
          <div className="grid my-3 gap-5">
            <h2 className="text-center text-3xl font-bold">
              Let people be able to see you
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">
                      Upload your profile picture
                    </label>
                    <Input type="file" className="text-slate-300" />
                    <div className="md:h-[350px] md:w-[350px] h-[200px] w-[200px] mt-5 mx-auto rounded-full bg-zinc-300"></div>
                  </div>
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">Enter your username:</label>
                    <input
                      type="text"
                      className="border-[0.1rem] shadow-md text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full"
                      placeholder="@fisayobadina"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="text-sm">
                      This is your public display name
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={() => setFormStatus((prev) => prev - 1)}
                    type="icon"
                  >
                    <p>Previous</p>
                  </Button>
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={submitForm}
                    type="icon"
                  >
                    <p>Finish Account</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm flex justify-center items-center gap-1">
        <p>Already have an account? </p>
        <Link
          to="/login"
          className="text-zinc-300 hover:text-zinc-200 font-bold"
        >
          Login to the account
        </Link>
      </div>
    </div>
  );
};

export default Signup;

Please implement a client-side validation. The passwords must equal the repeat password. The password must be at least 8 characters long. User should not be able to move unto the next phase until they have filled the criterias. Use a text to display the error mesages of each input.  The text of the input should be text-red-400.  Also, implement image upload functionality for the profile picture. Let is refelect in the div element before it as an image background. 

Make this process fast and efficient.
*/