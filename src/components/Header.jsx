import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div className="bg-zinc-900 shadow-md fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white">
      <div className="container mx-auto md:px-20 px-5 flex gap-20 justify-between items-center">
        <h2 className="text-2xl text-blue-300 font-bold">Racc </h2>
        <div className="hidden md:grid bg-zinc-600 w-3/5 rounded-lg px-4 py-3">
          <input
            type="text"
            className="search-input w-full text-slate-100"
            placeholder="Search for votes by name or tags"
          />
        </div>
        <Button className="border-[0.1rem] text-[1rem] text-blue-300 hover:bg-zinc-700 border-zinc-700 rounded-lg">
          Sign in to vote
        </Button>
      </div>
    </div>
  );
};

export default Header;
