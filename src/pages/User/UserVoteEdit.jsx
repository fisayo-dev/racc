import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { ImageIcon, ImageUp, Loader2Icon } from "lucide-react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Edit2, Trash } from "iconsax-react";
import { storage } from "../../appwrite/config";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ID } from "appwrite";

// import { handleImageUpload } from "./CreateVote";
import { Hashtag } from "iconsax-react";
import db from "../../appwrite/databases";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const UserVoteEdit = () => {
  const { vote_id } = useParams();
  const { user } = useAuth();

  // Edit form tags
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [fetchedImageId, setFetchedImageId] = useState("");
  const [voteImageFile, setVoteImageFile] = useState(null);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [date, setDate] = useState();
  const [date2, setDate2] = useState();
  const [options, setOptions] = useState([
    { title: "", option_voters: [] },
    { title: "", option_voters: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchOldData = async () => {
    setLoading(true);
    try {
      const results = await db.votes.list();
      const votes = results.documents;

      // Find the vote by `vote_id`
      const thisVote = votes.find((vote) => vote.$id === vote_id);
      if (!thisVote) {
        console.error("Vote not found");
        return;
      }

      // Parse and update options
      const parsedOptions = JSON.parse(thisVote.options || "[]"); // Default to an empty array if options is undefined
      setOptions(parsedOptions);

      // Update other fields
      setTitle(thisVote.title);
      setDescription(thisVote.description);
      setDate(thisVote.start_date);
      setDate2(thisVote.end_date);
      setTag1(JSON.parse(thisVote.tags || "[]")[0] || "");
      setTag2(JSON.parse(thisVote.tags || "[]")[1] || "");

      // Fetch and set the background image
      const prevImgId = thisVote.vote_img;
      setFetchedImageId(prevImgId);
      const result = storage.getFileDownload(
        import.meta.env.VITE_VOTE_IMAGES_BUCKET_ID,
        prevImgId
      );
      setBackgroundImage(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const editVote = async () => {
    try {
      // Step 1: Handle file upload (if applicable)
      let newImageUpdateId = fetchedImageId; // Default to the previous image ID
      if (voteImageFile) {
        // Delete the old file if you need to replace it
        await storage.deleteFile(
          import.meta.env.VITE_VOTE_IMAGES_BUCKET_ID,
          fetchedImageId
        );
        const newImageUpload = await storage.createFile(
          import.meta.env.VITE_VOTE_IMAGES_BUCKET_ID,
          ID.unique(), // Generate a new unique ID
          voteImageFile
        );
        newImageUpdateId = newImageUpload.$id;
      }

      // Step 2: Update vote details
      await db.votes.update(vote_id, {
        title,
        description,
        vote_img: newImageUpdateId,
        tags: JSON.stringify([tag1, tag2]), // Stringified tags
        start_date: date,
        end_date: date2,
        voters: JSON.stringify([]), // Directly store an empty array
        options: JSON.stringify(options), // Stringify options for storage
        creator_id: user.$id,
      });

      // Step 3: Show success message and navigate
      Swal.fire({
        toast: true,
        text: "Your vote was updated successfully!",
        icon: "success",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(`/vote/${vote_id}`);
    } catch (err) {
      console.error("Error updating vote:", err.message);
      Swal.fire({
        toast: true,
        text: "Failed to update your vote. Please try again!",
        icon: "error",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    fetchOldData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVoteImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };
  // Option functions
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

  return (
    <div>
      <Header />
      <div className="app-container my-[8rem]">
        {loading && (
          <Loader2Icon className="mx-auto h-24 w-24 md:h-28 md:w-28 animate-spin my-10"/>
        )}
        {!loading && (
          <div className="grid gap-10">
            <h2 className="text-center font-bold text-4xl">Edit Vote</h2>
            <div className="grid gap-3 mx-auto 2xl:w-3/5 md:w-4/6">
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
                    {backgroundImage ? "Change the image" : "Upload an image"}
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <label>Vote Tags</label>
                <div className="grid lg:flex gap-3">
                  <div className="w-full flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
                    <Hashtag className="h-6 w-6" />
                    <input
                      type="text"
                      className="w-full "
                      placeholder="Tag 1"
                      value={tag1}
                      onChange={(e) => setTag1(e.target.value)}
                    />
                  </div>
                  <div className="w-full flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
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
              <div className="grid gap-4">
                <h2 className="text-md">
                  What date do you want the vote to end?
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
                      {date2 ? format(date2, "PPP") : <span>Pick a date</span>}
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
              <div className="grid gap-4">
                <h2 className="text-md ">Vote Options:</h2>
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
            </div>

            <div
              onClick={editVote}
              className="flex px-4 py-3 rounded-lg item-center overflow-hidden mx-auto bg-zinc-300 text-zinc-900 cursor-pointer hover:bg-zinc-200 items-center gap-2 justify-center"
            >
              <Edit2 className="h-6 w-6" />
              <p>Edit vote</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVoteEdit;
