import { Calendar, TickCircle } from "iconsax-react";
import { Clock } from "iconsax-react";
const VoteCard = ({
  image,
  options,
  tags,
  description,
  status,
  voters,
  start_date,
}) => {
  const getVoteStatus = () => {
    if (status == "ongoing") {
      return (
        <div className="flex hover:text-yellow-300 text-yellow-400 items-center gap-[0.5rem]">
          <Clock className="h-5 w-5" />
          <p>Ongoing</p>
        </div>
      );
    } else if (status == "upcoming") {
      return (
        <div className="flex hover:text-blue-300 text-blue-400 items-center gap-[0.5rem]">
          <Calendar className="h-5 w-5" />
          <p>Upcoming</p>
        </div>
      );
    } else {
      return (
        <div className="flex hover:text-green-300 text-green-400 items-center gap-[0.5rem]">
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
    if (status == "upcoming") {
      // Checks if voting is upcoming
      return <p>{convertUTCToEnglishDate(start_date)} </p>;
    } else if (status == "ongoing") {
      // checks if voting is ongoing
      return <p>{voters.length} voting</p>;
    } else {
      // checks if voting has ended
      return <p>{voters.length} {voters.length > 1 ? 'voters': 'voter'} voted </p>;
    }
  };
  return (
    <div className="bg-zinc-800 text-zinc-100 border-[0.1rem] border-zinc-800 hover:border-zinc-500 cursor-pointer shadow-md rounded-lg grid gap-2">
      <div className="grid items-center py-3 px-4 gap-4">
        <h2 className="md:text-[1.1rem] text-[1.4rem] text-zinc-200 font-bold">
          {description}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <div className="px-3 text-[0.75rem] border border-zinc-700 hover:text-gray-300 text-gray-400 py-2 rounded-lg">
              #{tag}
            </div>
          ))}
        </div>
        <div className="flex rounded-lg shadow-md overflow-clip items-stretch">
          <img src={image} className="w-full" alt="" />
        </div>
        {/* <div className="grid gap-[0.4rem]">
          {options.map((opt) => (
            <div className="px-4 py-3 hover:shadow-md border-[0.1rem] hover:bg-zinc-700 border-zinc-700 rounded-lg text-[1.0.5rem]">
              {opt}
            </div>
          ))}
        </div> */}
        <div className="flex text-[0.8rem] items-center justify-between gap-5">
          <div className="flex items-center gap-[0.5rem]">
            {getVoteStatus()}
          </div>
          <div className="hover:text-gray-200 text-gray-400">
            {getVoterStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
