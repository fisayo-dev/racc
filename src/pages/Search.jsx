import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Notification, SearchNormal1 } from "iconsax-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import db from "../appwrite/databases";
import { useEffect, useState } from "react";
import image from "../assets/image.png";
import { Loader2Icon, XIcon } from "lucide-react";
import Swal from "sweetalert2";
import VoteCard from "../components/VoteCard";

const Search = () => {
  const { user } = useAuth();
  const [userProfilePictureId, setUserProfilePictureId] = useState(null);

  // Filter Search states
  const [searchValue, setSearchValue] = useState("");
  const [addTagValue, setAddTagValue] = useState("");

  // Vote States
  const [listOfVotes, setListOfVotes] = useState([]);
  const [loadingVotes, setLoadingVotes] = useState(true);

  // Tags states
  const [tagsList, setTagsList] = useState([]);
  const [hideTags, setHideTags] = useState(false);

  // Search functions
  const fetchVotes = async (e) => {
    //   Prevent default form submit
    e.preventDefault();
    //   Set loader to true
    setLoadingVotes(true);
    //   Fetch votes
    try {
      const results = await db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;
      // Define filtered vots
      let filteredVotes = [];
      // If no tags, show all votes that match the search value
      if (tagsList.length == 0) {
        filteredVotes = votes.filter((vote) =>
          vote.title.toLowerCase().contains(searchValue.toLocaleLowerCase())
        );
        setListOfVotes(filteredVotes);
      } else {
        // If tags, show all votes that match search vakue and have tags
        filteredVotes = votes
          .filter((vote) => {
            const voteTags = vote.tags ? JSON.parse(vote.tags) : [];
            return voteTags.some((tag) => tagsList.includes(tag));
          })
          .filter((vote) =>
            vote.title.toLowerCase().contains(searchValue.toLocaleLowerCase())
          );
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
    setLoadingVotes(false);
  };

  // Tag functions
  const addTag = (e) => {
    e.preventDefault();
    if (tagsList.length == 7) {
      Swal.fire({
        text: "You cannot add more than 7 tags for a vote",
        icon: "warning",
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      setAddTagValue("");
      return;
    }
    if (addTagValue.trim() !== "") {
      setTagsList((prev) => [...prev, addTagValue]);
      setAddTagValue("");
    }
  };

  const deleteTag = (position) => {
    setTagsList((prev) => prev.filter((__, index) => index !== position));
  };

  // Fetching image if user is logged in
  const fetchUserImageId = async () => {
    const results = await db.users.list();
    const users = await results.documents;
    const loggedInUser = users.filter(
      (thisUser) => thisUser.user_id == user.$id
    );
    const { profile_image } = loggedInUser[0];
    setUserProfilePictureId(profile_image);
  };

  const fetchUserImage = () => {
    return (
      `https://cloud.appwrite.io/v1/storage/buckets/${
        import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID
      }/files/${userProfilePictureId}/view?project=${
        import.meta.env.VITE_PROJECT_ID
      }` || image
    );
  };

  useEffect(() => {
    fetchUserImageId();
  }, []);
  return (
    <div>
      <div className="bg-zinc-900 shadow-md fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white">
        <div className="app-container flex gap-20 justify-between items-center">
          <Link to="/" className="text-2xl text-blue-300 font-bold">
            Racc
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center justify-end gap-4">
                <Link to="/notifications">
                  <Notification className="h-6 w-6" />
                </Link>
                <Link
                  to="/create-vote"
                  className="rounded-full bg-zinc-500 p-[0.25rem] hover:bg-zinc-400"
                >
                  <PlusIcon className="h-6 w-6" />
                </Link>
                <Link to="/profile">
                  <div
                    className="h-8 w-8 bg-cover bg-center bg-zinc-500 rounded-full hover:scale-110 transition"
                    style={{ backgroundImage: `url(${fetchUserImage()})` }}
                  ></div>
                </Link>
              </div>
            )}
            {!user && (
              <>
                <Link to="/signup">
                  <Button className="md:text-[1rem] text-[0.8rem] text-blue-300 hover:bg-zinc-600 border-[0.1rem] border-zinc-600 rounded-lg ">
                    Signup
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="md:text-[1rem] text-[0.8rem] text-blue-300 hover:bg-zinc-600 border-[0.1rem] border-zinc-600 rounded-lg ">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="app-container my-[8rem]">
        <div className="grid gap-7">
          <div className="div grid gap-4">
            <form
              action=""
              className="flex items-center bg-zinc-800 rounded-lg md:px-5 md:py-4 px-4 py-3 shadow-lg"
            >
              <input
                type="text"
                className="w-full"
                placeholder="Search for vote by title"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchNormal1 className="h-5 w-5" />
            </form>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <h2 className="text-[0.98rem] font-bold">Filters:</h2>
                <div
                  className="cursor-pointer hover:text-blue-300"
                  onClick={() => setHideTags((prev) => !prev)}
                >
                  {hideTags ? "Show Tags" : "Hide Tags"}
                </div>
              </div>
              {!hideTags && (
                <div className="grid items-center px-3 py-2 border-[0.12rem] rounded-lg border-zinc-700 shadow-md w-full ">
                  {/* The arent element for the tags to filter search */}
                  <div className="add-tag-field py-2 overflow-scroll flex flex-nowrap items-center gap-3 ">
                    {tagsList.map((tag, index) => (
                      <div className="relative bg-zinc-800 px-3 py-2 mx-2 rounded-lg flex">
                        <div
                          onClick={deleteTag.bind(this, index)}
                          className="absolute -right-[5%] -top-[12%] h-5 w-5 flex place-items-center justify-center rounded-full  bg-zinc-300"
                        >
                          <XIcon className="h-[1rem] w-[1rem] text-zinc-900" />
                        </div>
                        <p>#{tag}</p>
                      </div>
                    ))}
                  </div>
                  {/* Add Tag form */}
                  <form className="w-full" onSubmit={addTag}>
                    <input
                      type="text"
                      className="w-full py-2"
                      placeholder="Type and press enter to and tag"
                      value={addTagValue}
                      onChange={(e) => setAddTagValue(e.target.value)}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
          {loadingVotes && (
            <div className="grid mx-auto mt-[1rem] ">
              <Loader2Icon className="h-28 w-28 animate-spin" />
            </div>
          )}
          <div className="grid items-center gap-4 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {!loadingVotes &&
              listOfVotes.length !== 0 &&
              listOfVotes.map((vote, index) => (
                <Link key={index} to={`/vote/${vote.$id}`}>
                  <VoteCard
                    vote_img={vote.vote_img}
                    id={vote.$id}
                    title={vote.title}
                    description={vote.description}
                    options={vote.options}
                    status="ongoing"
                    tags={JSON.parse(vote.tags)}
                    start_date={vote.start_date}
                    end_date={vote.end_date}
                    voters={vote.voters}
                    creatorId={vote.creator_id}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
