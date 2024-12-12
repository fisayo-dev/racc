import { ArrowLeft, Check, Clock } from "iconsax-react";
import image4 from "../../assets/samples/nextjs.png";
import { Header } from "../../components";
import { Link, useParams } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { PiGraph } from "react-icons/pi";
import { fakeVotingList } from "../../components/VoteLists";
import { Calendar } from "lucide-react";

const VoteDescription = () => {
  const { id } = useParams();

  const particularVote = fakeVotingList.filter((vote) => vote.id == id);
  const { description, voters, status, tags, start_date, end_date, options } =
    particularVote[0];
  return (
    <div className="grid gap-2 text-zinc-200">
      <Header />
      <div className="container mx-auto xl:px-20 md:px-15 px-5 my-[8rem]">
        <div className="grid gap-5">
          <Link to="/">
            <button className="my-1 rounded-lg text-zinc-800 flex items-center gap-1 hover:bg-zinc-200 bg-zinc-300 px-4 py-3">
              <ArrowLeft className="h-6 w-6" />
              <p>Back</p>
            </button>
          </Link>
          <div className="grid gap-10 items-start md:grid-cols-2">
            <div className="grid gap-8">
              <h2 className="md:text-3xl text-2xl">{description}</h2>
              <div className="shadow-md rounded-lg overflow-hidden">
                <img src={image4} className="w-full" alt="" />
              </div>
              <div className="grid gap-3">
                <div
                  className={`capitalize flex ${
                    status == "upcoming" && "text-yellow-400"
                  } ${status == "ended" && "text-red-400"} ${
                    status == "ongoing" && "text-green-400"
                  } items-center gap-2`}
                >
                  {status == "upcoming" && <Calendar className="w-6 h-6" />}
                  {status == "ended" && <Check className="w-6 h-6" />}
                  {status == "ongoing" && <Clock className="w-6 h-6" />}
                  <p>{status}</p>
                </div>
                <div
                  className={`flex ${status == "ended" && "text-red-300"} ${
                    status == "ongoing" && "text-green-300"
                  } items-center gap-2`}
                >
                  {voters.length > 0 ? (
                    <p>
                      {voters.length} people{" "}
                      {status == "ended" ? "voted" : "have voted"}
                    </p>
                  ) : (
                    <p>No votes available yet</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid gap-8">
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <h2 className="md:text-3xl text-2xl">
                    {status == "ended" ? "Results" : "Options"}
                  </h2>
                  <p className="text-md">
                    {status == "ongoing" &&
                      "You have particpated in this voting exercise"}
                    {/* Later, this code above should check if user id is among the voters arrauy of the vote object */}
                    {status == "ended" &&
                      "You didn't participate in this vote."}
                    {/* Later, this code above should check if user id is among the voters arrauy of the vote object */}
                  </p>
                </div>
                <div className="grid gap-3">
                  {options.map((option) => (
                    <div className="grid gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800  border-[0.102rem] border-zinc-200 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{option}</p>
                        <CheckBadgeIcon className="text-green-400 h-6 w-6" />
                        {/* Only show check badge if user choose it */}
                      </div>
                      {status != "upcoming" && (
                        <div className="grid gap-2">
                          <div className="text-sm flex items-center justify-between">
                            <h2>Least Popular Choice</h2>
                            <p className="text-zinc-500">24 votes</p>
                          </div>
                          <div className="bg-zinc-700 h-2 rounded-full overflow-hidden">
                            <div className="h-2 w-3/4 bg-blue-300"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    // When user clicks on option, if the vote is upcoming notify them that it is upcoming, else : allow them vote if vote is ongoing
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <h2 className="md:text-3xl text-2xl">Related Votes</h2>
                <p>
                  Sections showing related votes for users to participate or
                  upcoming.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDescription;
