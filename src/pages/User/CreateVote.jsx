import { Building, Hashtag, Trash } from "iconsax-react";
import { Header } from "../../components";
import {
  Cog8ToothIcon,
  ListBulletIcon,
  CalendarIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import {
  ImageIcon,
  ImageUp,
  Loader2Icon,
  MegaphoneIcon,
  UploadIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ID } from "appwrite";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import db from "../../appwrite/databases";
import { useAuth } from "../../context/AuthContext";
import ButtonEl from "../../components/Button";
import { storage } from "../../appwrite/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateVote = () => {
  // User variable
  const { user } = useAuth();

  const [date, setDate] = useState();
  const [date2, setDate2] = useState();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [voteImageFile, setVoteImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Vote input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publicity, setPublicity] = useState(true);
  const [franchisePolicy, setFranchisePolicy] = useState(true);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [options, setOptions] = useState([{ title: "", option_voters: [] }]);

  const navigate = useNavigate();

  // Getting the vote tag

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVoteImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  // Add a new option
  const addOption = () => {
    setOptions([...options, { title: "", option_voters: [] }]);
  };

  // Update an option's title
  const updateOptionTitle = (index, newTitle) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, title: newTitle } : option
    );
    setOptions(updatedOptions);
  };

  // Remove an option
  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const createVote = async () => {
    setLoading(true);
    const stringifiedOptions = JSON.stringify(options);
    const jsonedTags = JSON.stringify([tag1, tag2]);

    // Step1: Save the vote image

    try {
      const imageUploadResult = await storage.createFile(
        import.meta.env.VITE_VOTE_IMAGES_BUCKET_ID,
        ID.unique(), // Generates a unique ID for the vote image
        voteImageFile
      );

      const voteImageId = imageUploadResult.$id;

      // Step2: Save the vote
      const vote = await db.votes.create({
        title,
        description,
        publicity,
        start_date: date,
        end_date: date2,
        voters: JSON.stringify([]),
        options: stringifiedOptions, // Store the options here
        tags: jsonedTags,
        creator_id: user.$id,
        vote_img: voteImageId,
        franchise_policy: franchisePolicy,
      });
      Swal.fire({
        toast: true,
        text: "Vote Creation successful!",
        icon: "success",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(`/vote/${vote.$id}`);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full grid text-zinc-200">
      <Header />
      <div className="mt-[8rem]">
        <div className="app-container">
          {loading ? (
            <div className="grid mx-auto mt-[5rem] ">
              <Loader2Icon className="h-28 w-28 mx-auto animate-spin" />
            </div>
          ) : (
            <div>
              <div className="grid gap-[3.5rem] sm:gap-[7.5rem] md:gap-[10rem] items-start grid-cols-1 md:grid-cols-2">
                <div className="grid gap-[5rem] my-5">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <FingerPrintIcon className="h-7 w-7" />
                      <h2 className="text-3xl font-bold">Vote Info</h2>
                    </div>
                    <div className="grid gap-4">
                      <label>Vote Title</label>
                      <input
                        type="text"
                        className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                        placeholder="Enter a title that best describes your vote"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-4">
                      <label>Vote Description</label>
                      <textarea
                        type="text"
                        className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                        placeholder="Tell us what your vote is all about"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="grid gap-4">
                      <label>Vote Image</label>
                      <p className="text-sm">
                        Upload an image about your vote to increase visiblilty.{" "}
                      </p>
                      <div
                        type="text"
                        className="grid justify-items-center place-content-center shadow-sm rounded-lg h-[400px] bg-cover bg-center  bg-zinc-800"
                        placeholder="Tell us what your vote is all about"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                      >
                        {!backgroundImage && (
                          <div className="grid gap-1 place-items-center">
                            <ImageIcon className="h-[8rem] w-[8rem]" />
                            <p>No image uploaded</p>
                          </div>
                        )}
                      </div>
                      <div
                        className={`relative overflow-hidden justify-center hover:bg-zinc-700 bg-zinc-800 flex px-4 py-3 rounded-lg cursor-pointer items-center gap-2 shadow-lg `}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          id="image-upload"
                          onChange={handleImageUpload}
                          className="absolute opacity-0 h-full w-full cursor-pointer"
                        ></input>
                        <ImageUp className="h-6 w-6 cursor-pointer" />
                        <p>
                          {backgroundImage
                            ? "Change the image"
                            : "Upload an image"}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <label>Vote Tags</label>
                      <div className="grid lg:flex gap-3">
                        <div className="flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
                          <Hashtag className="h-6 w-6" />
                          <input
                            type="text"
                            className="w-full "
                            placeholder="Tag 1"
                            value={tag1}
                            onChange={(e) => setTag1(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
                          <Hashtag className="h-6 w-6" />
                          <input
                            type="text"
                            className="w-full "
                            placeholder="Tag 2"
                            value={tag2}
                            onChange={(e) => setTag2(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <ListBulletIcon className="h-7 w-7" />
                      <h2 className="text-3xl font-bold">Vote Options:</h2>
                    </div>
                    {options.map((option, index) => (
                      <div key={index} className="grid gap-4">
                        <label>Option {index + 1}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3 flex-1"
                            placeholder="Enter option title"
                            value={option.title}
                            onChange={(e) =>
                              updateOptionTitle(index, e.target.value)
                            }
                          />
                          {options.length > 2 && (
                            <button
                              className="hover:text-red-400 text-red-500"
                              onClick={() => removeOption(index)}
                            >
                              <Trash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addOption}
                      className="ml-auto mt-2 bg-zinc-600 text-white px-4 py-2 rounded-lg"
                    >
                      Add Option
                    </button>
                    <div className="text-md flex items-center justify-end hover:bg-zinc-300 bg-zinc-500"></div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Cog8ToothIcon className="h-7 w-7" />
                      <h2 className="text-3xl font-bold">
                        Timing and Settings
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      <h2 className="text-md">
                        What date do you want the vote to commence ?
                      </h2>
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
                    {/* <div className="grid gap-4">
                  <h2 className="text-md">
                    What time do you want the vote to commence ?
                  </h2>
                  <div className="grid md:flex gap-3 md:gap-5  items-center">
                    <Select className="outline-none w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time1">11:00</SelectItem>
                        <SelectItem value="time2">12:00</SelectItem>
                        <SelectItem value="time3">1:00</SelectItem>
                        <SelectItem value="time4">2:00</SelectItem>
                        <SelectItem value="time5">3:00</SelectItem>
                        <SelectItem value="time6">4:00</SelectItem>
                        <SelectItem value="time7">5:00</SelectItem>
                        <SelectItem value="time8">6:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select className="outline-none">
                      <SelectTrigger>
                        <SelectValue placeholder="Time Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
                    <div className="grid gap-4">
                      <h2 className="text-md">
                        What date do you want the vote to end ?
                      </h2>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "bg-zinc-700 hover:bg-zinc-600 text-gray-200 justify-start text-left font-normal",
                              !date2 && "text-gray-300"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date2 ? (
                              format(date2, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date2}
                            onSelect={setDate2}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* <div className="grid gap-4">
                  <h2 className="text-md">
                    What time do you want the vote to end ?
                  </h2>
                  <div className="grid md:flex gap-3 md:gap-5  items-center">
                    <Select className="outline-none w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time1">11:00</SelectItem>
                        <SelectItem value="time2">12:00</SelectItem>
                        <SelectItem value="time3">1:00</SelectItem>
                        <SelectItem value="time4">2:00</SelectItem>
                        <SelectItem value="time5">3:00</SelectItem>
                        <SelectItem value="time6">4:00</SelectItem>
                        <SelectItem value="time7">5:00</SelectItem>
                        <SelectItem value="time8">6:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select className="outline-none">
                      <SelectTrigger>
                        <SelectValue placeholder="Time Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
                  </div>
                </div>
                <div className="grid gap-[5rem] my-5">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <MegaphoneIcon className="h-7 w-7" />
                      <h2 className="text-3xl font-bold">
                        Publicity & Audience
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      <h2 className="text-md">
                        Do you want the vote to be public
                      </h2>
                      <Select
                        value={publicity}
                        onValueChange={(value) => setPublicity(value)}
                        className="outline-none"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-7 w-7" />
                      <h2 className="text-3xl font-bold">Voting Policy</h2>
                    </div>
                    <div className="grid gap-4">
                      <h2 className="text-md">
                        Do you want to enable franchise ?
                      </h2>
                      <Select
                        value={franchisePolicy}
                        onValueChange={(value) => setFranchisePolicy(value)}
                        className="outline-none"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-7 w-7" />
                  <h2 className="text-3xl font-bold">Payment and Voting fee</h2>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">Do you want to enable franchise ?</h2>
                  <Select
                    value={franchisePolicy}
                    onValueChange={(value) => setFranchisePolicy(value)}
                    className="outline-none"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}
                </div>
              </div>

              <div onClick={createVote}>
                <ButtonEl
                  text="Submit"
                  className="w-full text-md hover:bg-zinc-300 bg-zinc-100 text-zinc-800 mx-auto my-5"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateVote;
