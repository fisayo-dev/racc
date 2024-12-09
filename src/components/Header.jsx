import { Button } from "@/components/ui/button";
import { Filter, SearchNormal1 } from "iconsax-react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-zinc-900 shadow-md fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white">
      <div className="container mx-auto md:px-20 px-5 flex gap-20 justify-between items-center">
        <h2 className="text-2xl text-blue-300 font-bold">Racc</h2>
        <div className="hidden md:flex items-center gap-4 bg-zinc-700 w-3/5 rounded-lg px-4 py-3">
          <Filter className="h-6 w-6" />
          <input
            type="text"
            className="search-input w-full text-slate-100"
            placeholder="Search for votes by name or tags"
          />
          <SearchNormal1 className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-3">
          <SearchNormal1 className="block md:hidden h-6 w-6 text-zinc-300" />
          <Link to="/signup">
            <Button className="text-[1rem] text-blue-300 hover:bg-zinc-600 border-[0.1rem] border-zinc-600 rounded-lg ">
              Sign in to vote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
