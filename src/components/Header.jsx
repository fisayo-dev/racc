import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div className="bg-zinc-900 py-3 border-b-[0.1rem] border-zinc-700 text-white">
      <div className="container mx-auto md:px-20 px-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-300">Racc</h2>
        <Button className="border-[0.1rem] text-[1rem] text-blue-300 hover:bg-zinc-700 border-zinc-700">
          Sign in to vote
        </Button>
      </div>
    </div>
  );
};

export default Header;
