import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AtSignIcon, CalendarIcon, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ImageUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import db from "../appwrite/databases";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuth } from "../context/AuthContext";
import { Eye, EyeSlash } from "iconsax-react";

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
  const [suggestedTagsForProfile, setSuggestedTagsForProfile] = useState([]);
  const [selectedTagsForProfile, setSelectedTagsForProfile] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  // Error states
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchTags = async () => {
    const fetchedTags = new Set(); // Defining fetched tags

    // Fetching all documents
    const results = await db.votes.list();
    const votes = results.documents;

    // Looping through votes
    votes.map((vote) => {
      const tagsArrayForVote = JSON.parse(vote.tags); // Get each vote tags array
      tagsArrayForVote.map((tag) => {
        // Loop through each vote tag
        fetchedTags.add(tag); // Sotre each vote tag in a set
      });
    });

    setSuggestedTagsForProfile(Array.from(fetchedTags)); // store it later in an array
  };

  const handleSelectingTag = (tagName) => {
    if (selectedTagsForProfile.includes(tagName)) {
      setSelectedTagsForProfile((prev) =>
        prev.filter((tag) => tag !== tagName)
      );
    } else {
      setSelectedTagsForProfile((prev) => [...prev, tagName]);
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (formStatus === 0) {
      if (!firstName) newErrors.firstName = "First name is required.";
      if (!lastName) newErrors.lastName = "Last name is required.";
      if (!email) newErrors.email = "Email address is required.";
      if (!password || password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
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
      console.log(file);
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
        profile_tags: JSON.stringify(selectedTagsForProfile),
        voting_id: votingId,
        profile_picture: profilePicture,
      };
      registerUser(userInfo);
    }
  };

  useEffect(() => {
    // Fetch country data
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    fetchTags();
  }, []);

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
          <div
            className={`rounded-xl w-10 md:w-20 p-1 ${
              formStatus >= 3 ? "bg-gray-400" : "bg-gray-600"
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
                    <div className="grid gap-2 w-full ">
                      <label className="font-bold">First Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full shadow-md"
                        placeholder="Ex. John "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <p className="text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="grid gap-2 w-full ">
                      <label className="font-bold">Last Name:</label>
                      <input
                        type="text"
                        className="border-[0.1rem]  text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md w-full shadow-md"
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
                    <div className="flex items-center gap-3 border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md">
                      <input
                        type={showPassword ? "text" : "password"}
                        className=" w-full"
                        placeholder="Must be at least 8 characters long"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className="cursor-pointer hover:text-white"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeSlash className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-400">{errors.password}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">Repeat password:</label>
                    <div className="flex items-center gap-3 border-[0.1rem] text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md">
                      <input
                        type={showRepeatPassword ? "text" : "password"}
                        className="w-full"
                        placeholder="Re-enter your password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      <div
                        className="cursor-pointer hover:text-white"
                        onClick={() => setShowRepeatPassword((prev) => !prev)}
                      >
                        {showRepeatPassword ? (
                          <EyeSlash className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </div>
                    </div>
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
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">Where do you live?</label>
                    {loadingCountries ? (
                      <p>Loading countries...</p>
                    ) : error ? (
                      <p className="text-red-400">{error}</p>
                    ) : (
                      <Select
                        className="outline-none shadow-md"
                        value={country}
                        onValueChange={(value) => setCountry(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((countryName) => (
                            <SelectItem key={countryName} value={countryName}>
                              {countryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="grid gap-2 w-full ">
                    <label className="font-bold">What’s your Gender?</label>
                    <Select
                      className="outline-none shadow-md"
                      value={gender}
                      onValueChange={(value) => setGender(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="I prefer to remain anonymous">
                          I prefer to remain anonymous
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-400">{errors.gender}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="font-bold">When were you born?</label>
                    <Popover className="shadow-md">
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
                    {errors.date && (
                      <p className="text-red-400">{errors.date}</p>
                    )}
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
                    onClick={handleNext}
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
              Boost your publicity
            </h2>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">
                      Upload your profile picture
                    </label>
                    <div className="relative overflow-hidden justify-center hover:bg-zinc-700 bg-zinc-800 flex px-4 py-3 rounded-lg cursor-pointer items-center gap-2 shadow-lg">
                      <Input
                        type="file"
                        className="absolute opacity-0 h-full w-full cursor-pointer"
                        onChange={handleImageUpload}
                      />
                      <ImageUp className="h-6 w-6 cursor-pointer" />
                      <p>
                        {profilePreview
                          ? "Change the image"
                          : "Upload an image"}
                      </p>
                    </div>
                    <div
                      className="md:h-[350px] md:w-[350px] h-[200px] w-[200px] mt-5 mx-auto rounded-full bg-zinc-300 bg-cover bg-center"
                      style={{ backgroundImage: `url(${profilePreview})` }}
                    ></div>
                  </div>
                  <div className="grid gap-2 w-full">
                    <label className="font-bold">Enter your username:</label>
                    <div className="flex items-center gap-2 border-[0.1rem] shadow-md text-[0.9rem] border-zinc-400 py-3 px-3 rounded-md ">
                      <AtSignIcon className="h-6 w-6 text-zinc-400" />
                      <input
                        type="text"
                        className="w-full text-zinc-200"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <label className="text-sm">
                      This is your public display name
                    </label>
                    {errors.username && (
                      <p className="text-red-400">{errors.username}</p>
                    )}
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
                    onClick={handleNext}
                    type="icon"
                  >
                    <p>Next</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {formStatus == 3 && (
          <div className="grid my-3 gap-5">
            <div className="grid gap-2">
              <h2 className="text-center text-3xl font-bold">
                Customize your feed
              </h2>
              <p className="text-center text-md ">
                Please choose at least two(2) tags.
              </p>
            </div>
            <div className="2xl:w-3/12 md:w-5/12 sm:w-3/5 w-full mx-auto px-5">
              <div className="grid gap-6 justify-center">
                {suggestedTagsForProfile.length == 0 && (
                  <div className="my-6 mx-auto grid justify-center">
                    <LoaderCircle className="h-28 w-28 animate-spin" />
                  </div>
                )}
                <div className="flex my-5 text-sm md:text-md items-center flex-wrap gap-3 md:gap-5 justify-center mx-auto">
                  {suggestedTagsForProfile.length !== 0 &&
                    suggestedTagsForProfile.map((tag, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedTagsForProfile.includes(tag)
                            ? "bg-blue-400 border-blue-400 text-zinc-900"
                            : "   hover:bg-blue-200 hover:text-zinc-900 border-zinc-700"
                        } px-4 py-3 rounded-lg border-[0.1rem] transition shadow-lg  font-bold  cursor-pointer`}
                        onClick={handleSelectingTag.bind(this, tag)}
                      >
                        #{tag}
                      </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    className="bg-zinc-700 hover:bg-zinc-600 text-[1rem]"
                    onClick={handlePrevious}
                    type="icon"
                  >
                    <p>Previous</p>
                  </Button>
                  <div
                    className={`${
                      selectedTagsForProfile.length < 2 &&
                      "opacity-60 pointer-events-none cursor-not-allowed"
                    }`}
                  >
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
          </div>
        )}
      </div>
      <div className="text-sm grid text-center items-center gap-2 ">
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
