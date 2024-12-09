import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div className="bg-transparent shadow-md backdrop-blur fixed bottom-100 top-0 w-full py-5 border-b-[0.1rem] border-zinc-700 text-white">
      <div className="container mx-auto md:px-20 px-5 flex justify-between items-center">
        <h2 className="text-2xl text-blue-300 font-bold">Racc </h2>
        <Button className="border-[0.1rem] text-[1rem] text-blue-300 hover:bg-zinc-700 border-zinc-700">
          Sign in to vote
        </Button>
      </div>
    </div>
  );
};

export default Header;
