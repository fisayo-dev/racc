import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Filter,
  Notification,
  NotificationBing,
  SearchNormal1,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import db from "../appwrite/databases";
import { useEffect, useState } from "react";
import image from "../assets/image.png";
const Header = () => {
  const { user, notificationSeen, setNotificationSeen } = useAuth();
  const [userProfilePictureId, setUserProfilePictureId] = useState(null);

  const fetchUserImageId = async () => {
    try {
      const results = await db.users.list();
      const users = await results.documents;
      const loggedInUser = users.filter(
        (thisUser) => thisUser.user_id == user.$id
      );
      const { profile_image, notification_seen } = loggedInUser[0];
      setUserProfilePictureId(profile_image);
      setNotificationSeen(notification_seen);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchUserImageId();
  }, []);

  const fetchUserImage = () => {
    return (
      `https://cloud.appwrite.io/v1/storage/buckets/${
        import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID
      }/files/${userProfilePictureId}/view?project=${
        import.meta.env.VITE_PROJECT_ID
      }` || image
    );
  };

  return (
    <div className="bg-zinc-900 shadow-md fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white z-40">
      <div className="app-container flex gap-20 justify-between items-center">
        <Link to="/" className="text-2xl text-blue-300 font-bold">
          Racc
        </Link>
        <Link
          to="/search"
          className="hidden md:flex items-center gap-4 hover:bg-zinc-600 bg-zinc-700 w-3/5 rounded-lg px-4 py-3"
        >
          <Filter className="h-6 w-6" />
          <p className="w-full py-1 text-zinc-300">
            Search for votes by name or tags
          </p>
          <SearchNormal1 className="h-6 w-6" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/search">
            <SearchNormal1 className="block md:hidden hover:text-zinc-100 h-6 w-6 text-zinc-300" />
          </Link>
          {user && (
            <div className="flex items-center justify-end gap-4">
              <Link to="/notifications">
                {notificationSeen ? (
                  <Notification className="h-6 w-6" />
                ) : (
                  <NotificationBing className="text-red-400 h-6 w-6" />
                )}
              </Link>
              <Link
                to="/create-vote"
                className="rounded-full bg-zinc-500 p-[0.25rem] hover:bg-zinc-400"
              >
                <PlusIcon className="h-6 w-6" />
              </Link>
              <Link to="/profile" className="shadow-lg">
                <div
                  className="h-8 w-8 bg-cover  bg-center bg-zinc-500 rounded-full hover:scale-110 transition"
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
  );
};

export default Header;
