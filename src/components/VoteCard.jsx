import { Calendar, TickCircle } from "iconsax-react";
import { Clock } from "iconsax-react";
const VoteCard = ({
  image,
  options,
  description,
  status,
  voters,
  start_date,
}) => {
  const getVoteStatus = () => {
    if (status == "ongoing") {
      return (
        <div className="flex text-yellow-300 items-center gap-[0.5rem]">
          <Clock className="h-5 w-5" />
          <p>Ongoing</p>
        </div>
      );
    } else if (status == "upcoming") {
      return (
        <div className="flex text-blue-300 items-center gap-[0.5rem]">
          <Calendar className="h-5 w-5" />
          <p>Upcoming</p>
        </div>
      );
    } else {
      return (
        <div className="flex text-green-300 items-center gap-[0.5rem]">
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
      return <p>{voters.length} voter voted </p>;
    }
  };
  return (
    <div className="bg-zinc-800 text-slate-100 border-[0.1rem] border-zinc-800 hover:border-zinc-500 cursor-pointer overflow-clip shadow-md rounded-md grid gap-2">
      <div className="grid items-center py-3 px-4 gap-4">
        <h2 className="text-[1.1rem]">{description}</h2>
        <div className="flex rounded-md shadow-md overflow-clip items-stretch">
          <img src={image} className="w-full" alt="" />
        </div>
        <div className="grid gap-[0.4rem]">
          {options.map((opt) => (
            <div className="px-4 py-3 hover:shadow-md border-[0.1rem] hover:bg-zinc-700 border-zinc-700 rounded-md text-[1.0.5rem]">
              {opt}
            </div>
          ))}
        </div>
        <div className="flex text-[0.8rem] items-center justify-between gap-5">
          <div className="flex items-center gap-[0.5rem]">
            {getVoteStatus()}
          </div>
          <div className="hover:text-gray-200 text-gray-400">{getVoterStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
