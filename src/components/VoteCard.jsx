import { Timer, Calendar, TickCircle } from "iconsax-react";
const VoteCard = ({
  image,
  options,
  description,
  status,
  voters,
  start_date,
  end_date,
}) => {
  const getVoteStatus = () => {
    if (status == "ongoing") {
      return (
        <>
          <Timer className="h-5 w-5" />
          <p>Ongoing</p>
        </>
      );
    } else if (status == "upcoming") {
      return (
        <>
          <Calendar className="h-5 w-5" />
          <p>Upcoming</p>
        </>
      );
    } else {
      return (
        <>
          <TickCircle className="h-5 w-5" />
          <p>Ended</p>
        </>
      );
    }
  };

  const startDate = new Date(start_date).toDateString();
  const startDateUTC = startDate.toLocaleString();
  const endDate = new Date(end_date).toDateString();
  const currentDate = new Date().toDateString();
  console.log(startDate, endDate);

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
    <div className="bg-zinc-800 cursor-pointer overflow-clip  rounded-md grid gap-2">
      <img src={image} alt="" />
      <div className="grid py-3 px-4 gap-3">
        <h2 className="text-[1.1rem]">{description}</h2>
        <div className="grid gap-[0.4rem]">
          {options.map((opt) => (
            <div className="px-4 py-3 hover:shadow-md border-[0.1rem] hover:bg-zinc-700 border-zinc-700 rounded-md text-[1.0.5rem]">
              {opt}
            </div>
          ))}
        </div>
        <div className="flex text-[0.8rem] items-center justify-between gap-5">
          <div className="flex items-center gap-[0.57rem]">
            {getVoteStatus()}
          </div>
          <div>{getVoterStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
