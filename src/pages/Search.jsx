import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Filter, Notification, SearchNormal1 } from "iconsax-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import db from "../appwrite/databases";
import { useEffect, useState } from "react";
import image from "../assets/image.png";
const Search = () => {
  const { user } = useAuth();
  const [userProfilePictureId, setUserProfilePictureId] = useState(null);

  // Filter Search states
  const [searchValue, setSearchValue] = useState("");
  const [addTagValue, setAddTagValue] = useState("");

  // Tags list
  const [tagsList, setTagsList] = useState([]);

  const addTag = (e) => {
    e.preventDefault();
    if (addTagValue.trim() !== "") {
      setTagsList((prev) => [...prev, addTagValue]);
      setAddTagValue("");
    }
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
              className="flex items-center bg-zinc-800 rounded-lg md:px-6 md:py-5 px-4 py-3 shadow-lg"
            >
              <input
                type="text"
                className="w-full"
                placeholder="Search for vote by title"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchNormal1 className="h-6 w-6" />
            </form>
            <div className="grid gap-2">
              <h2 className="text-[0.98rem] font-bold">Filters:</h2>
              <div className="flex gap-3 items-center px-3 py-2 border-[0.12rem] rounded-lg border-zinc-700 shadow-md">
                {/* The arent element for the tags to filter search */}
                <div className="flex items-center gap-3">
                  {tagsList.map((tag) => (
                    <div className="bg-zinc-800 px-3 py-2 rounded-lg">
                      #{tag}
                    </div>
                  ))}
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
