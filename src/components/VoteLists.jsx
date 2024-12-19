import VoteCard from "./VoteCard";
import image1 from "../assets/samples/ballondor.png";
import image2 from "../assets/samples/chess.png";
import image3 from "../assets/samples/oscars.png";
import image4 from "../assets/samples/nextjs.png";
import image5 from "../assets/samples/nextjs2.png";
import image6 from "../assets/samples/no.png";
import image7 from "../assets/samples/performance.png";
import image8 from "../assets/samples/tricks.png";
import image9 from "../assets/samples/dailydotdev.png";
import { Link } from "react-router-dom";
import ButtonEl from "./Button";
import landing_voters from "../assets/freepik__adjust__39359-removebg-preview.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import db from "../appwrite/databases";
import { Query } from "appwrite";
import LoadingIcon from "./LoadingIcon";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

const randomImage = () => images[Math.floor(Math.random() * images.length)];

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

  const fetchAllVotes = async () => {
    try {
      const results = db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;
      setListOfVotes(votes);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const fetchVotes = async () => {
    setLoading(true);
    try {
      // Step 1: Get votes
      const results = await db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;

      // Check if user profile tags exist and parse them safely
      const userTags = loggedInUser?.profile_tags
        ? JSON.parse(loggedInUser.profile_tags || "[]")
        : [];

      // Step 2: Filter votes based on the active tab
      let filteredVotes = [];
      if (activeTab === "for you") {
        filteredVotes = votes.filter((vote) => {
          const voteTags = vote.tags ? JSON.parse(vote.tags) : [];
          return voteTags.some((tag) => userTags.includes(tag));
        });
      } else if (activeTab === "others") {
        filteredVotes = votes.filter((vote) => {
          const voteTags = vote.tags ? JSON.parse(vote.tags) : [];
          return !voteTags.some((tag) => userTags.includes(tag));
        });
      }

      // Step 3: Update state
      setListOfVotes(filteredVotes);
      console.log(filteredVotes);
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchVotes();
    } else {
      fetchAllVotes()
    }
  }, [loggedInUser, activeTab]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (user) {
        await fetchLoggedInUser();
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="mt-[7rem] mb-[4rem] text-white">
      <div className="app-container grid gap-8">
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
                  image={randomImage()}
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
              // <p>Hi</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export { randomImage };
export default VoteLists;
