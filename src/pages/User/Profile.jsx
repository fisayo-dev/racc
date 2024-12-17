import { Button, Header } from "../../components";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/samples/nextjs.png";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [createdVotes, setCreatedVotes] = useState(null); // null for loading
  const [participatedVotes, setParticipatedVotes] = useState(null); // null for loading
  const [thisUserProfileTags, setThisUserProfileTags] = useState([]);

  const getUser = async () => {
    try {
      const results = await db.users.list();
      const users = results.documents;
      const thisUser = users.filter((users) => users.user_id === user.$id);
      setLoggedInUser(thisUser[0]);
      setThisUserProfileTags(
        thisUser[0]?.profile_tags ? JSON.parse(thisUser[0].profile_tags) : []
      ); // Default to an empty array if no tags exist
    } catch (err) {
      console.log(err.message);
      setThisUserProfileTags([]); // Gracefully handle errors
    }
  };

  const getCreatedVotes = async () => {
    try {
      const results = await db.votes.list([
        Query.equal("creator_id", user.$id),
      ]);
      setCreatedVotes(results.documents || []); // Default to empty array if no documents
    } catch (err) {
      console.log(err.message);
      setCreatedVotes([]); // Handle errors gracefully
    }
  };

  const getParticipatedVotes = async () => {
    try {
      const results = await db.votes.list();
      const votes = results.documents;
      const participatedVotes = votes.filter((vote) => {
        const voters = JSON.parse(vote.voters);
        return voters.some((voter) => voter.voter_id === user.$id);
      });
      setParticipatedVotes(participatedVotes || []); // Default to empty array if no matches
    } catch (err) {
      console.log(err.message);
      setParticipatedVotes([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    getUser();
    getCreatedVotes();
    getParticipatedVotes();
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-[8rem] mb-[5rem]">
        <div className="app-container ">
          <div className="grid md:flex profile-grid items-start">
            <div className="md:w-4/12 bg-zinc-800 shadow-md rounded-lg p-6">
              {loggedInUser ? (
                <div className="grid gap-4">
                  <div
                    className="h-40 w-40 mx-auto bg-cover bg-center overflow-hidden rounded-full bg-zinc-300"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                  <div className="text-center grid gap-1">
                    <p className="text-sm">@{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                    <p className="font-bold text-xl">
                      {loggedInUser.first_name} {loggedInUser.last_name}{" "}
                    </p>
                  </div>
                  <p className="text-center text-sm">
                    <b>Country:</b> {loggedInUser.country}
                  </p>
                  <div className="mx-auto gap-5 flex items-center">
                    <div onClick={logoutUser}>
                      <Button
                        text="Logout"
                        className="bg-red-500 border-none text-white hover:bg-red-600"
                      />
                    </div>
                    <div>
                      <Button
                        text="Edit"
                        className="bg-blue-400 text-zinc-900 border-none hover:bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-20 my-20">
                  <Loader2Icon className="w-24 h-24 animate-spin" />
                </div>
              )}
            </div>
            <div className="md:w-5/6 grid gap-5 bg-zinc-800 shadow-md rounded-lg p-6">
              <div className="grid gap-2">
                <h2 className="text-2xl font-bold">Your Activity</h2>
                <div className="grid gap-5 my-5 grid-cols-1 md:grid-cols-3">
                  {/* Participated Votes */}
                  <div className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold text-center">
                      Vote Participation
                    </h2>
                    <div className="grid gap-5 text-center justify-center">
                      {participatedVotes === null ? (
                        <Loader2Icon className="animate-spin h-20 w-20" />
                      ) : (
                        <p className="text-8xl font-bold">
                          {participatedVotes.length}
                        </p>
                      )}
                      <p className="text-sm">
                        {participatedVotes && participatedVotes.length !== 1
                          ? "votes"
                          : "vote"}
                      </p>
                    </div>
                  </div>

                  {/* Created Votes */}
                  <Link
                    to="/profile/my-votes"
                    className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6"
                  >
                    <h2 className="text-xl font-bold">My Votes</h2>
                    <div className="grid gap-5 text-center justify-center">
                      {createdVotes === null ? (
                        <Loader2Icon className="animate-spin h-20 w-20" />
                      ) : (
                        <p className="text-8xl font-bold">
                          {createdVotes.length}
                        </p>
                      )}
                      <p className="text-sm">
                        {createdVotes && createdVotes.length !== 1
                          ? "votes"
                          : "vote"}
                      </p>
                    </div>
                  </Link>

                  {/* Favoured Votes */}
                  <div className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold">Favoured Votes</h2>
                    <div className="grid gap-5 text-center justify-center">
                      <p className="text-8xl font-bold">0</p>
                      <p className="text-sm">votes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <h2 className="text-2xl font-bold">Your Tags</h2>
                <div className="flex my-5 text-sm md:text-md items-center flex-wrap gap-3 md:gap-5 justify-center mx-auto">
                  {thisUserProfileTags === null && (
                    <div className="flex items-center gap-2 flex-col mx-auto">
                      <Loader2Icon className="w-24 h-24 animate-spin" />
                    </div>
                  )}
                  {thisUserProfileTags?.length === 0 &&
                    thisUserProfileTags !== null && (
                      <div className="text-center text-gray-400 font-medium text-lg">
                        No tags exist for this user.
                      </div>
                    )}
                  {thisUserProfileTags?.length > 0 &&
                    thisUserProfileTags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue-400 px-4 py-3 rounded-lg transition shadow-lg font-bold text-zinc-900 cursor-pointer"
                      >
                        #{tag}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
