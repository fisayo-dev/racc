import { Button } from "@/components/ui/button";
const Home = () => {
  return (
    <div className="bg-zinc-900 py-3 text-white">
      <div className="container mx-auto md:px-20 px-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Racc</h2>
        <Button className="border-2 hover:bg-zinc-700 border-zinc-700">Sign in to vote</Button>
      </div>
    </div>
  );
};

export default Home;
