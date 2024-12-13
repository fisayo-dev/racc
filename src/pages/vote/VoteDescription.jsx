import { ArrowLeft, Check, Clock, Hashtag, Lock } from "iconsax-react";
import { Header } from "../../components";
import { Link, useParams } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { fakeVotingList, randomImage } from "../../components/VoteLists";
import { Calendar, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import db from "../../appwrite/databases";
import { Query } from "appwrite";

const VoteDescription = () => {
  const { id } = useParams(); // Extract the vote ID from the route parameters
  const [particularVote, setParticularVote] = useState(null);
  const [voteTags, setVoteTags] = useState(null);
  const [voteOptions, setVoteOptions] = useState(null);
  const [voters, setVoters] = useState(null);
  const userId = "user_unique_id"; // Replace with actual logic to fetch current user's ID

  // Function to fetch the vote details
  const getParticularVote = async () => {
    const results = await db.votes.list([Query.orderDesc("$createdAt")]);
    const votes = results.documents;
    const index_vote = votes.filter((vote) => vote.$id === id);
    setParticularVote(index_vote[0]);

    // Parse the JSON fields for tags, options, and voters
    setVoteTags(JSON.parse(index_vote[0].tags));
    setVoteOptions(JSON.parse(index_vote[0].options));
    setVoters(JSON.parse(index_vote[0].voters));
  };

  // Function to determine the status of the vote
  const getVoteStatus = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate < start) return "upcoming";
    if (currentDate > end) return "ended";
    return "ongoing";
  };

  // Function to handle voting on an option
  const handleVote = async (option) => {
    if (
      getVoteStatus(particularVote.start_date, particularVote.end_date) !==
      "ongoing"
    ) {
      alert("This vote is not currently ongoing.");
      return;
    }

    // Check if user has already voted
    if (voters.some((voter) => voter.voter_id === userId)) {
      alert("You have already voted.");
      return;
    }

    // Update the voters array and save to Appwrite
    const newVoter = {
      voter_id: userId,
      date_voted: new Date().toISOString(),
    };
    const updatedVoters = [...voters, newVoter];
    setVoters(updatedVoters);

    await db.votes.update(particularVote.$id, {
      voters: JSON.stringify(updatedVoters),
    });

    alert(`You voted for: ${option.title}`);
  };

  useEffect(() => {
    getParticularVote();
  }, []);

  return (
    <div className="grid gap-2 text-zinc-200">
      <Header />
      <div className="app-container my-[8rem]">
        <div className="grid gap-5">
          <Link to="/">
            <button className="my-1 rounded-lg text-zinc-800 flex items-center gap-1 hover:bg-zinc-200 bg-zinc-300 px-4 py-3">
              <ArrowLeft className="h-6 w-6" />
              <p>Back</p>
            </button>
          </Link>
          {particularVote && (
            <div className="grid gap-10 items-start md:grid-cols-2">
              <div className="grid gap-8">
                <div className="grid gap-3">
                  {/* Display vote tags */}
                  <div className="text-[0.7rem] flex gap-2 items-center">
                    {voteTags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 border-[0.102rem] px-3 py-2 rounded-lg border-zinc-600"
                      >
                        <Hashtag className="h-5 w-5" />
                        <p>{tag}</p>
                      </div>
                    ))}
                  </div>

                  {/* Display vote title and publicity */}
                  <h2 className="md:text-3xl text-2xl">
                    {particularVote.title}
                  </h2>
                  <div className="text-sm flex gap-2 px-3 py-2 rounded-lg border-[0.102rem] border-zinc-600  mr-auto items-center">
                    {particularVote.publicity === "Yes" && (
                      <>
                        <Megaphone className="h-4 w-4" />
                        <p>Public</p>
                      </>
                    )}
                    {particularVote.publicity === "No" && (
                      <>
                        <Lock className="h-4 w-4" />
                        <p>Private</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Background image for the vote */}
                <div
                  className="rounded-lg shadow-md h-64 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(../${randomImage()})` }}
                ></div>
              </div>

              <div className="grid gap-8">
                <div className="grid gap-5">
                  {/* Display vote options */}
                  <div className="grid gap-2">
                    <h2 className="md:text-3xl text-2xl">
                      {getVoteStatus(
                        particularVote.start_date,
                        particularVote.end_date
                      ) === "ended"
                        ? "Results"
                        : "Options"}
                    </h2>
                  </div>

                  <div className="grid gap-3">
                    {voteOptions.map((option) => (
                      <div
                        key={option.title}
                        className="grid gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 border-[0.102rem] border-zinc-200 cursor-pointer"
                        onClick={() => handleVote(option)}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold">{option.title}</p>
                          <CheckBadgeIcon className="text-green-400 h-6 w-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteDescription;
