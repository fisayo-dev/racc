import { Header } from "../../components";
import { useAuth } from "../../context/AuthContext";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { InfoCircle, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VoteCard from "../../components/VoteCard";
import { randomImage } from "../../components/VoteLists";
import { Pencil } from "lucide-react";

const UserVotes = () => {
  const { user } = useAuth();
  const userId = user.$id;
  const [userVotes, setUserVotes] = useState([]);

  const fetchUserVotes = async () => {
    const results = await db.votes.list([Query.orderDesc("$createdAt")]);
    const votes = results.documents;
    const user_votes = votes.filter((vote) => vote.creator_id === userId);
    setUserVotes(user_votes);
  };

  const handleDelete = async () => {
    console.log("deleted");
  };

  useEffect(() => {
    fetchUserVotes();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="app-container my-[8rem] grid gap-10">
        {userVotes.length === 0 && (
          <div className="grid gap-3 mt-[5rem] text-blue-300">
            <InfoCircle className="mx-auto h-24 w-24 " />
            <p className="text-sm text-center">No votes created yet.</p>
          </div>
        )}

        {userVotes.length !== 0 && (
          <h2 className="text-4xl font-bold">My Votes</h2>
        )}
        <div className="grid items-center gap-4 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {userVotes.length !== 0 &&
            userVotes.map((vote, index) => (
              <div className="grid gap-4 items-end">
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
                <div className="flex items-center gap-3">
                  <div
                    className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg flex items-center justify-center gap-4"
                  >
                    <Pencil className="text-zinc-200 h-6 w-6" />
                  </div>
                  <div
                    onClick={handleDelete}
                    className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg flex items-center justify-center gap-4"
                  >
                    <Trash className="text-zinc-200 h-6 w-6" />
                  </div>
                </div>
              </div>
              // <p>Hi</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserVotes;
