import VoteCard from "./VoteCard";

const VoteLists = () => {
  return (
    <div className="mt-10 text-white">
      <div className="container mx-auto md:px-20 px-5 ">
        <div className="grid gap-5 grid-cols-5">
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
        </div>
      </div>
    </div>
  );
};

export default VoteLists;
