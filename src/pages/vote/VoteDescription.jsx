import { ArrowLeft } from "iconsax-react";
import { Header } from "../../components";

const VoteDescription = () => {
  return (
    <div className="grid gap-2 text-zinc-200">
      <Header />
      <div className="container mx-auto md:px-20 px-5 my-[8rem]">
        <button className="my-3 rounded-lg text-zinc-800 flex items-center gap-1 hover:bg-zinc-200 bg-zinc-300 px-4 py-3">
          <ArrowLeft className="h-6 w-6" />
          <p>Back</p>
        </button>
      </div>
    </div>
  );
};

export default VoteDescription;
