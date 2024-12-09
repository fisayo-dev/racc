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

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  function convertUTCToEnglishDate(utcDate) {
    const date = new Date(utcDate); // Convert the UTC date string to a Date object

    // Use toLocaleDateString to format the date in an English-readable format
    const options = {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "December"
      day: "numeric", // "9"
      hour: "numeric", // "12"
      minute: "numeric", // "00"
      second: "numeric", // "00"
      hour12: true, // 12-hour format for the time (AM/PM)
    };

    return date.toLocaleString("en-US", options); // Converts to the desired format
  }

  const getVoterStatus = () => {
    if (voters.length !== 0) {
      if (startDate <= currentDate && currentDate < endDate) {
        // Checks if voting is ongoing
        return (
          <>
            <p>{voters.length} voting</p>
          </>
        );
      } else if (startDate < currentDate && endDate < currentDate) {
        //   Check if voting has ended.
        return (
          <>
            <p>{voters.length} voted.</p>
          </>
        );
      }
    } else {
      //  Check if voting will commence
      return (
        <>
          <p>{convertUTCToEnglishDate.bind(this, start_date)}</p>
        </>
      );
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
          <div className="flex items-center gap-[0.57rem]">{getVoteStatus()}</div>
          <div>{getVoterStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;