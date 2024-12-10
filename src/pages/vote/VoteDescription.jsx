import { ArrowLeft, Check, Clock } from "iconsax-react";
import image4 from "../../assets/samples/nextjs.png";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { PiGraph } from "react-icons/pi";

const VoteDescription = () => {
  return (
    <div className="grid gap-2 text-zinc-200">
      <Header />
      <div className="container mx-auto md:px-20 px-5 my-[8rem]">
        <div className="grid gap-5">
          <Link to="/">
            <button className="my-1 rounded-lg text-zinc-800 flex items-center gap-1 hover:bg-zinc-200 bg-zinc-300 px-4 py-3">
              <ArrowLeft className="h-6 w-6" />
              <p>Back</p>
            </button>
          </Link>
          <div className="grid gap-10 items-start md:grid-cols-2">
            <div className="grid gap-8">
              <h2 className="md:text-3xl text-2xl">
                Who is the greatest football player of all time?
              </h2>
              <div className="shadow-md rounded-lg overflow-hidden">
                <img src={image4} className="w-full" alt="" />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <p>Ongoing - 2 days left</p>
                </div>
                <div className="flex items-center gap-2">
                  <PiGraph className="w-6 h-6" />
                  <p>11 people voting</p>
                </div>
              </div>
            </div>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <h2 className="md:text-3xl text-2xl">Options:</h2>
                <p className="text-md">Pick an option to vote</p>
              </div>
              <div className="grid gap-3">
                <div className="px-4 py-3 rounded-lg hover:bg-zinc-800  border-[0.102rem] border-zinc-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p>Lionel Messi</p>
                    <CheckBadgeIcon className="text-green-400 h-6 w-6" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-lg hover:bg-zinc-800  border-[0.102rem] border-zinc-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p>Christiano Ronaldo</p>
                    {/* <CheckBadgeIcon className="text-green-400 h-6 w-6" /> */}
                  </div>
                </div>
                <div className="px-4 py-3 rounded-lg hover:bg-zinc-800  border-[0.102rem] border-zinc-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p>Kylian Mbappe</p>
                    {/* <CheckBadgeIcon className="text-green-400 h-6 w-6" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDescription;
