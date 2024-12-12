import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Filter,
  Notification,
  ProfileCircle,
  SearchNormal1,
} from "iconsax-react";
import { Link } from "react-router-dom";
const Header = () => {
  const user = true;
  return (
    <div className="bg-zinc-900 shadow-md fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white">
      <div className="app-container flex gap-20 justify-between items-center">
        <Link to="/" className="text-2xl text-blue-300 font-bold">Racc</Link>
        <div className="hidden md:flex items-center gap-4 bg-zinc-700 w-3/5 rounded-lg px-4 py-3">
          <Filter className="h-6 w-6" />
          <input
            type="text"
            className="search-input w-full text-slate-100"
            placeholder="Search for votes by name or tags"
          />
          <SearchNormal1 className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-4">
          <SearchNormal1 className="block md:hidden h-6 w-6 text-zinc-300" />
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
                <ProfileCircle className="h-8 w-8" />
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
