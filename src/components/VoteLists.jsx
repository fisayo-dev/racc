import VoteCard from "./VoteCard";
import { Link } from "react-router-dom";
import ButtonEl from "./Button";
import landing_voters from "../assets/landing_image.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import db from "../appwrite/databases";
import { Query } from "appwrite";
import LoadingIcon from "./LoadingIcon";

const VoteLists = () => {
  const { user } = useAuth();
  const [listOfVotes, setListOfVotes] = useState([]);
  const [activeTab, setActiveTab] = useState("for you");
  const [loading, setLoading] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const fetchLoggedInUser = async () => {
    try {
      const results = await db.users.list();
      const users = results.documents;

      if (user?.$id) {
        const currentUser = users.find((u) => u.user_id === user.$id);
        setLoggedInUser(currentUser || null);
      } else {
      }
    } catch (err) {
      console.error("Error fetching logged-in user:", err.message);
    }
  };

  const fetchVotes = async () => {
    setLoading(true);
    try {
      // Step 1: Get votes
      const results = await db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;

      // Step 2: Filter votes based on the active tab (only for logged-in users)
      let filteredVotes = [];
      if (loggedInUser && activeTab === "for you") {
        const userTags = loggedInUser?.profile_tags
          ? JSON.parse(loggedInUser.profile_tags || "[]")
          : [];
        filteredVotes = votes.filter((vote) => {
          const voteTags = vote.tags ? JSON.parse(vote.tags) : [];
          return voteTags.some((tag) => userTags.includes(tag));
        });
      } else if (loggedInUser && activeTab === "others") {
        const userTags = loggedInUser?.profile_tags
          ? JSON.parse(loggedInUser.profile_tags || "[]")
          : [];
        filteredVotes = votes.filter((vote) => {
          const voteTags = vote.tags ? JSON.parse(vote.tags) : [];
          return !voteTags.some((tag) => userTags.includes(tag));
        });
      } else {
        // No filters for unauthenticated users
        filteredVotes = votes;
      }

      // Step 3: Update state
      setListOfVotes(filteredVotes);
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchVotes();
    }
  }, [loggedInUser, activeTab]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (user) {
        await fetchLoggedInUser();
      } else {
        fetchVotes(); // Fetch all votes for unauthenticated users
      }
    };
    fetchAllData();
  }, [user, activeTab]);

  return (
    <div className="mt-[7rem] mb-[4rem] text-white">
      <div className="app-container grid ">
        {!user && (
          <div className="flex items-center justify-center md:justify-between gap-5">
            <div className="grid gap-4">
              <h2 className="text-center text-4xl md:text-left md:text-6xl font-bold">
                Join the community of voters
              </h2>
              <Link className="mx-auto md:m-0" to="/signup">
                <ButtonEl text="Join now" />
              </Link>
            </div>
            <div className="hidden w-full md:flex justify-end">
              <img className="" draggable={false} src={landing_voters} />
            </div>
          </div>
        )}

        {user && (
          <div className="flex justify-center items-center gap-6 my-5 text-[1rem]">
            <div
              onClick={() => setActiveTab("for you")}
              className={`border-b-[0.2rem] ${
                activeTab === "for you"
                  ? "border-zinc-200 text-zinc-200"
                  : "text-zinc-400 border-transparent"
              } cursor-pointer py-1`}
            >
              For You
            </div>
            <div
              onClick={() => setActiveTab("others")}
              className={`border-b-[0.2rem]  ${
                activeTab === "others"
                  ? "border-zinc-200 text-zinc-200"
                  : "text-zinc-400 border-transparent"
              } cursor-pointer py-1`}
            >
              Others
            </div>
          </div>
        )}
        {loading && listOfVotes.length === 0 && (
          <div className="mx-auto justify-center grid gap-5 text-center my-10">
            <LoadingIcon />
            <p className="text-lg">Fetching votes</p>
          </div>
        )}

        <div className="grid items-center gap-4 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {!loading &&
            listOfVotes.length !== 0 &&
            listOfVotes.map((vote, index) => (
              <Link key={index} to={`/vote/${vote.$id}`}>
                <VoteCard
                  vote_img={vote.vote_img}
                  id={vote.$id}
                  title={vote.title}
                  description={vote.description}
                  options={vote.options}
                  status="ongoing"
                  tags={JSON.parse(vote.tags)}
                  start_date={vote.start_date}
                  end_date={vote.end_date}
                  voters={vote.voters}
                  creatorId={vote.creator_id}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VoteLists;
