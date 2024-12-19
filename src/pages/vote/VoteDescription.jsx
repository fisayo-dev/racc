import { ArrowLeft, Check, Clock, Hashtag, Lock } from "iconsax-react";
import { Header } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { useAuth } from "../../context/AuthContext";
import { LoadingIcon } from "../../components";

// Function to determine the status of the vote
export const getVoteStatus = (startDate, endDate) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (currentDate < start) return "upcoming";
  if (currentDate > end) return "ended";
  return "ongoing";
};

const VoteDescription = () => {
  const { id } = useParams(); // Extract the vote ID from the route parameters
  const { user } = useAuth();
  const [particularVote, setParticularVote] = useState(null);
  const [voteImgId, setVoteImgId] = useState(null)
  const [voteTags, setVoteTags] = useState(null);
  const [voteOptions, setVoteOptions] = useState(null);
  const [voters, setVoters] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Function to fetch the vote details
  const getParticularVote = async () => {
    try {
      const results = await db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;
  
      const index_vote = votes.find((vote) => vote.$id === id);
  
      if (!index_vote) {
        console.error("Vote not found, redirecting to home.");
        return navigate("/home");
      }
  
      if (!user && index_vote.publicity === "No") {
        console.error("User not logged in, redirecting to login.");
        return navigate("/login");
      }
  
      setParticularVote(index_vote);
      setVoteImgId(index_vote.vote_img);
  
      setVoteTags(index_vote.tags ? JSON.parse(index_vote.tags) : []);
      setVoteOptions(index_vote.options ? JSON.parse(index_vote.options) : []);
      setVoters(index_vote.voters ? JSON.parse(index_vote.voters) : []);
    } catch (error) {
      console.error("Error fetching the vote details:", error);
      navigate("/home");
    }
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

    if (!user) {
      alert("You cannot vote. Please sign in");
      return;
    }

    // Update the voters array and save to Appwrite
    const newVoter = {
      voter_id: userId,
      date_voted: new Date().toISOString(),
    };
    const updatedVoters = [...voters, newVoter];
    setVoters(updatedVoters);

    const updatedOptions = voteOptions.map((opt) => {
      if (opt.title === option.title) {
        // Add voter_id to the voter's array of the selected option
        const optionVoters = opt.voters || [];
        return {
          ...opt,
          votes: (opt.votes || 0) + 1,
          voters: [...optionVoters, userId],
        };
      }
      return opt;
    });
    setVoteOptions(updatedOptions);

    await db.votes.update(particularVote.$id, {
      voters: JSON.stringify(updatedVoters),
      options: JSON.stringify(updatedOptions),
    });

    alert(`You voted for: ${option.title}`);
  };

  // Live update of votes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getParticularVote();
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.$id);
    }
    if(id) getParticularVote();
  }, [user,id]);

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
          {!particularVote && (
            <div className="mx-auto justify-center grid gap-5 text-center my-10">
              <LoadingIcon />
              <p className="text-lg">Fetching vote description</p>
            </div>
          )}
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
                  className="rounded-lg bg-zinc-700 shadow-md h-64 w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://cloud.appwrite.io/v1/storage/buckets/${
                      import.meta.env.VITE_VOTE_IMAGES_BUCKET_ID
                    }/files/${voteImgId}/view?project=${
                      import.meta.env.VITE_PROJECT_ID
                    })`,
                  }}
                ></div>

                {/* Display number of users voting or voted */}
                <div
                  className={`capitalize flex gap-2 items-center ${
                    getVoteStatus(
                      particularVote.start_date,
                      particularVote.end_date
                    ) === "ongoing"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {getVoteStatus(
                    particularVote.start_date,
                    particularVote.end_date
                  ) === "ongoing" ? (
                    <>
                      <Clock className="w-6 h-6" />
                      <p>{voters.length} users voting</p>
                    </>
                  ) : (
                    <>
                      <Check className="w-6 h-6" />
                      <p>{voters.length} users voted</p>
                    </>
                  )}
                </div>
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
                    {voteOptions.map((option) => {
                      const percentage =
                        voters.length > 0
                          ? ((option.votes || 0) / voters.length) * 100
                          : 0;

                      return (
                        <div
                          key={option.title}
                          className="grid gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 border-[0.102rem] border-zinc-200 cursor-pointer"
                          onClick={() => handleVote(option)}
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-bold">{option.title}</p>
                            {option.voters &&
                              option.voters.some(
                                (voter) => voter === userId
                              ) && (
                                <CheckBadgeIcon className="text-blue-400 h-6 w-6" />
                              )}
                          </div>
                          {getVoteStatus(
                            particularVote.start_date,
                            particularVote.end_date
                          ) !== "upcoming" &&
                            voters &&
                            user &&
                            voters.some((vote) => vote.voter_id === userId) && (
                              <div className="grid gap-2">
                                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                                  <div
                                    className="bg-blue-400 h-2.5 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm">
                                    {percentage.toFixed(2)}%
                                  </p>
                                  <p className="text-sm">
                                    {option.votes || 0}{" "}
                                    {option.votes > 1 ? "votes" : "vote"}
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })}
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
