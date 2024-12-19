import { Calendar, TickCircle } from "iconsax-react";
import { Clock } from "iconsax-react";
import { getVoteStatus } from "../pages/vote/VoteDescription";
import { useEffect, useState } from "react";
import db from "../appwrite/databases";
import { Query } from "appwrite";

const VoteCard = ({
  image,
  options,
  title,
  tags,
  description,
  status,
  id,
  voters,
  start_date,
  end_date,
  creatorId,
}) => {
  // Vote creator state
  const [voteCreator, setVoteCreator] = useState(null);
  const [voteCreatorProfileImage, setVoteCreatorProfileImage] = useState(null);

  const gettingVoteStatus = () => {
    if (getVoteStatus(start_date, end_date) == "ongoing") {
      return (
        <div className="flex hover:text-green-300 text-green-400 items-center gap-[0.5rem]">
          <Clock className="h-5 w-5" />
          <p>Ongoing</p>
        </div>
      );
    } else if (getVoteStatus(start_date, end_date) == "upcoming") {
      return (
        <div className="flex hover:text-yellow-300 text-yellow-400 items-center gap-[0.5rem]">
          <Calendar className="h-5 w-5" />
          <p>Upcoming</p>
        </div>
      );
    } else {
      return (
        <div className="flex hover:text-red-300 text-red-400 items-center gap-[0.5rem]">
          <TickCircle className="h-5 w-5" />
          <p>Ended</p>
        </div>
      );
    }
  };

  function convertUTCToEnglishDate(utcDate) {
    const date = new Date(utcDate); // Convert the UTC date string to a Date object

    // Use toLocaleDateString to format the date in an English-readable format
    const options = {
      year: "numeric", // "2024"
      month: "short", // "December"
      day: "numeric", // "9"
    };

    return date.toLocaleDateString("en-US", options);
  }

  const getVoterStatus = () => {
    if (getVoteStatus(start_date, end_date) == "upcoming") {
      // Checks if voting is upcoming
      return <p>{convertUTCToEnglishDate(start_date)} </p>;
    } else if (getVoteStatus(start_date, end_date) == "ongoing") {
      // checks if voting is ongoing
      return <p>{JSON.parse(voters).length} voting</p>;
    } else {
      // checks if voting has ended
      return (
        <p>
          {JSON.parse(voters).length}{" "}
          {JSON.parse(voters).length > 1 ? "voters" : "voter"} voted{" "}
        </p>
      );
    }
  };

  const getCreatorProfile = async () => {
    try {
      const results = await db.users.list([Query.equal("user_id", creatorId)]);
      const data = results.documents[0];
      setVoteCreator(data);
      setVoteCreatorProfileImage(data.profile_image);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCreatorProfile();
  }, []);
  return (
    <div className="bg-zinc-800 h-[500px] md:h-[440px] overflow-hidden text-zinc-100 border-[0.1rem] border-zinc-800 hover:border-zinc-500 cursor-pointer shadow-md rounded-lg grid gap-2">
      <div className="grid items-center py-3 px-4 gap-4 md:gap-3">
        {voteCreator && (
          <div className=" text-zinc-200 flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-full bg-zinc-700 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://cloud.appwrite.io/v1/storage/buckets/${
                  import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID
                }/files/${voteCreatorProfileImage}/view?project=${
                  import.meta.env.VITE_PROJECT_ID
                })`,
              }}
            />
            <div >
              <h2 className="font-bold">
                {voteCreator.first_name} {voteCreator.last_name}
              </h2>
              <p className="md:sm my-1 text-md">
                @{voteCreator.username}
              </p>
            </div>
          </div>
        )}
        <h2 className="md:text-[1.1rem] text-[1.4rem] text-zinc-200 font-bold">
          {title.length > 40 ? `${title.substr(0, 40)}...` : title}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="px-3 text-[0.75rem] border border-zinc-700 hover:text-gray-300 text-gray-400 py-2 rounded-lg"
            >
              #{tag}
            </div>
          ))}
        </div>
        <div
          className={`rounded-lg bg-zinc-700 shadow-md h-56 md:h-52 w-full bg-cover bg-center`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        {/* <div className="grid gap-[0.4rem]">
          {options.map((opt) => (
            <div className="px-4 py-3 hover:shadow-md border-[0.1rem] hover:bg-zinc-700 border-zinc-700 rounded-lg text-[1.0.5rem]">
              {opt}
            </div>
          ))}
        </div> */}
        <div className="flex text-[0.8rem] items-center justify-between gap-5">
          <div className="flex items-center gap-[0.5rem]">
            {gettingVoteStatus()}
          </div>
          <div className="hover:text-gray-200 text-gray-400">
            {getVoterStatus()}
          </div>
        </div>
        {/* {status == "ongoing" && (
          <button className="flex items-center justify-center text-center w-full p-3 bg-green-300 hover:bg-green-400 text-zinc-900 rounded-lg gap-2">
            <FingerPrintIcon className="h-6 w-6" />
            <p>Cast Vote</p>
          </button>
        )}
        {status == "ended" && (
          <button className="flex items-center justify-center text-center w-full p-3 bg-blue-300 hover:bg-blue-400 text-zinc-900 rounded-lg gap-2">
            <Status className="h-6 w-6" />
            <p>View Result</p>
          </button>
        )}
        {status == "upcoming" && (
          <button className="flex items-center justify-center text-center w-full p-3 bg-orange-300 hover:bg-orange-400 text-zinc-900 rounded-lg gap-2">
            <Graph className="h-6 w-6" />
            <p>Analyze Options</p>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default VoteCard;
