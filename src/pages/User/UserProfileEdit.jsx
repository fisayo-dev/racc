import { useEffect, useState } from "react";
import { Header } from "../../components";
import { Loader2Icon, CalendarIcon } from "lucide-react";
import { ImageUp } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import db from "../../appwrite/databases";
import { storage } from "../../appwrite/config";
import { Query, ID } from "appwrite";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Edit2 } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileEdit = () => {
  const { user } = useAuth();
  const [userColId, setUserColId] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [profileTags, setProfileTags] = useState([]);
  const [selectedTagsForProfile, setSelectedTagsForProfile] = useState([]);
  const [date, setDate] = useState(null);
  const [fetchedImageId, setFetchedImageId] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [error, setError] = useState(null);

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const handleSelectingTag = (tagName) => {
    if (selectedTagsForProfile.includes(tagName)) {
      setSelectedTagsForProfile((prev) =>
        prev.filter((tag) => tag !== tagName)
      );
    } else {
      setSelectedTagsForProfile((prev) => [...prev, tagName]);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      console.log(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchOldData = async () => {
    setLoading(true);
    try {
      //   Step 1 : Fetch universal tags
      const fetchedTags = new Set(); // Defining fetched tags
      // Fetching all documents
      const results1 = await db.votes.list();
      const votes = results1.documents;

      // Looping through votes
      votes.map((vote) => {
        const tagsArrayForVote = JSON.parse(vote.tags); // Get each vote tags array
        tagsArrayForVote.map((tag) => {
          // Loop through each vote tag
          fetchedTags.add(tag); // Sotre each vote tag in a set
        });
      });

      setProfileTags(Array.from(fetchedTags)); // store it later in an array

      // Step 2: Fetch other data
      const results2 = await db.users.list([Query.equal("user_id", user.$id)]);
      const data = results2.documents;
      const thisUser = data[0];

      setUserColId(thisUser.$id);

      // Getting other input data for user
      const thisUserFirstName = thisUser.first_name;
      const thisUserProfileTags = JSON.parse(thisUser.profile_tags);
      const thisUserLastName = thisUser.last_name;
      const thisUserCountry = thisUser.country;
      const thisUserBirthDate = thisUser.birth_date;
      const thisUserGender = thisUser.gender;

      //Step 3: FetchImage
      const prevImgId = thisUser.profile_image;
      setFetchedImageId(prevImgId);
      const fetchedImage = storage.getFileDownload(
        import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID,
        prevImgId
      );

      // Set other user input to repective states
      setFirstName(thisUserFirstName);
      setLastName(thisUserLastName);
      setGender(thisUserGender);
      setCountry(thisUserCountry);
      setDate(thisUserBirthDate);

      setSelectedTagsForProfile(thisUserProfileTags);
      setProfilePreview(fetchedImage);
    } catch (err) {
      console.log("Error:", err.message);
    }
    setLoading(false);
  };

  const editProfile = async () => {
    setLoading(true);
    try {
      let newImageUpdateId = fetchedImageId; // Default to the current image ID

      if (profilePictureFile) {
        try {
          // Step 1: Delete old image if it exists
          if (fetchedImageId) {
            await storage.deleteFile(
              import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID,
              fetchedImageId
            );
          }
        } catch (deleteError) {
          console.warn(
            "Warning: Old image could not be deleted. Proceeding with the new image upload.",
            deleteError
          );
        }

        try {
          // Step 2: Upload the new image
          const newImageUpload = await storage.createFile(
            import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID,
            ID.unique(), // Generate a new unique ID
            profilePictureFile
          );
          newImageUpdateId = newImageUpload.$id;
        } catch (uploadError) {
          throw new Error("New image upload failed: " + uploadError.message);
        }
      }

      // Step 3: Update the vote details in the database
      await db.users.update(userColId, {
        profile_image: newImageUpdateId,
        first_name: firstName,
        last_name: lastName,
        profile_tags: JSON.stringify(selectedTagsForProfile),
        country,
        gender,
        birth_date: date,
        user_id: user.$id,
      });

      // Step 4: Notify the user of success
      Swal.fire({
        toast: true,
        text: "Profile update was successful!",
        icon: "success",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(`/profile`);
    } catch (err) {
      console.error("Error updating user:", err.message);
      Swal.fire({
        toast: true,
        text: "Failed to update your profile. Please try again!",
        icon: "error",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) fetchOldData();
  }, [user]);

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

  return (
    <div>
      <Header />
      <div className="app-container my-[8rem]">
        {loading ? (
          <Loader2Icon className="mx-auto h-24 w-24 md:h-28 md:w-28 animate-spin my-20" />
        ) : (
          <div className="grid gap-10">
            <h2 className="text-center font-bold text-4xl">Edit Vote</h2>
            <div className="grid gap-4 mx-auto 2xl:w-3/5 md:w-4/6 w-full">
              <div className="grid gap-5 w-full">
                <label className="font-bold">Upload your profile picture</label>
                <div className="relative overflow-hidden justify-center hover:bg-zinc-700 bg-zinc-800 flex px-4 mx-auto md:w-3/5 w-full py-3 rounded-lg cursor-pointer items-center gap-2 shadow-lg">
                  <Input
                    type="file"
                    className="absolute opacity-0 h-full w-full cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  <ImageUp className="h-6 w-6 cursor-pointer" />
                  <p>
                    {profilePreview ? "Change the image" : "Upload an image"}
                  </p>
                </div>
                <div
                  className="md:h-[350px] md:w-[350px] h-[200px] w-[200px] mt-5 mx-auto rounded-full bg-zinc-300 bg-cover bg-center"
                  style={{ backgroundImage: `url(${profilePreview})` }}
                ></div>
              </div>
              <div className="grid md:flex items-center gap-4 md:gap-5">
                <div className="md:w-full grid gap-4">
                  <label className="font-bold">First Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="md:w-full grid gap-4">
                  <label className="font-bold">Last Name:</label>
                  <input
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <label className="font-bold">Profile Tags</label>
                <div className="w-full mx-auto px-5">
                  <div className="grid gap-6 justify-center">
                    {profileTags.length == 0 && (
                      <div className="my-6 mx-auto grid justify-center">
                        <Loader2Icon className="h-6 w-6 animate-spin" />
                      </div>
                    )}
                    <div className="flex my-5 text-sm md:text-md items-center flex-wrap gap-3 md:gap-5 justify-center mx-auto">
                      {profileTags.length !== 0 &&
                        profileTags.map((tag, index) => (
                          <div
                            key={index}
                            className={`transition-all duration-200 ${
                              selectedTagsForProfile.includes(tag)
                                ? "bg-blue-400 border-blue-400  text-zinc-900 scale-105"
                                : "hover:bg-blue-200 hover:text-zinc-900 border-zinc-700 scale-100"
                            } p-2 rounded-lg`}
                            onClick={() => handleSelectingTag(tag)} // Bind the function her
                          >
                            #{tag}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 w-full">
                <label className="font-bold">Country:</label>
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
                <label className="font-bold">Gender:</label>
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
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Birth Date:</label>
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
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePicker
                      selected={date}
                      onChange={(selectedDate) => setDate(selectedDate)}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      inline
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div
              onClick={editProfile}
              className="flex px-4 py-3 rounded-lg item-center overflow-hidden mx-auto bg-zinc-300 text-zinc-900 cursor-pointer hover:bg-zinc-200 items-center gap-2 justify-center"
            >
              <Edit2 className="h-6 w-6" />
              <p>Save Changes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileEdit;
