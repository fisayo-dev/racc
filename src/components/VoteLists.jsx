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

export const fakeVotingList = [
  {
    id: 1,
    image: "",
    options: ["Lionel Messi", "Christiano Ronaldo", "Kylian Mbappe"],
    description: "Who is the greatest football player of all time?",
    voters: [1, 2, 3, 4, 5],
    status: "ongoing",
    tags: ["sports", "football"],
    start_date: "2024-12-12",
    end_date: "2024-12-25",
  },
  {
    id: 2,
    image: "",
    options: ["Android", "iOS"],
    description: "Which mobile OS offers better features and usability?",
    voters: [],
    status: "upcoming",
    tags: ["tech", "mobile"],
    start_date: "2024-12-15",
    end_date: "2024-12-28",
  },
  {
    id: 3,
    image: "",
    options: ["Artificial Intelligence", "Human Intelligence"],
    description: "Will AI ever surpass human intelligence completely?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["tech", "AI"],
    start_date: "2024-12-20",
    end_date: "2025-01-02",
  },
  {
    id: 4,
    image: "",
    options: ["Electric Cars", "Gasoline Cars"],
    description: "Are electric cars the ultimate future of transportation?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["tech", "environment"],
    start_date: "2024-12-18",
    end_date: "2025-01-01",
  },
  {
    id: 5,
    image: "",
    options: ["Elon Musk", "Jeff Bezos", "Bill Gates"],
    description:
      "Who is the most influential tech entrepreneur of the century?",
    voters: [8, 12, 15],
    status: "ongoing",
    tags: ["tech", "entrepreneurship"],
    start_date: "2024-12-10",
    end_date: "2024-12-20",
  },
  {
    id: 6,
    image: "",
    options: ["Remote Work", "Office Work"],
    description: "Is remote work as productive as traditional office work?",
    voters: [23, 27],
    status: "ended",
    tags: ["work", "productivity"],
    start_date: "2024-12-05",
    end_date: "2024-12-08",
  },
  {
    id: 7,
    image: "",
    options: ["Freedom of Speech", "Regulated Speech"],
    description: "Should freedom of speech come with more regulations?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["society", "rights"],
    start_date: "2024-12-17",
    end_date: "2024-12-31",
  },
  {
    id: 8,
    image: "",
    options: ["Books", "Movies"],
    description: "Which medium tells stories more effectively?",
    voters: [13, 19],
    status: "ongoing",
    tags: ["entertainment", "literature"],
    start_date: "2024-12-11",
    end_date: "2024-12-24",
  },
  {
    id: 9,
    image: "",
    options: ["Bitcoin", "Ethereum"],
    description: "Which cryptocurrency has better potential in the long run?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["finance", "crypto"],
    start_date: "2024-12-19",
    end_date: "2025-01-05",
  },
  {
    id: 10,
    image: "",
    options: ["Fast Food", "Home-Cooked Meals"],
    description: "Which is more practical in today's busy world?",
    voters: [6, 11, 14],
    status: "ended",
    tags: ["lifestyle", "food"],
    start_date: "2024-11-06",
    end_date: "2024-11-24",
  },
  {
    id: 11,
    image: "",
    options: ["E-books", "Printed Books"],
    description: "Which format do people prefer for reading?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["literature", "reading"],
    start_date: "2024-12-14",
    end_date: "2024-12-27",
  },
  {
    id: 12,
    image: "",
    options: ["Universal Healthcare", "Private Healthcare"],
    description: "Which healthcare system is better for society?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["health", "society"],
    start_date: "2024-12-23",
    end_date: "2025-01-06",
  },
  {
    id: 13,
    image: "",
    options: ["Social Media", "Real-Life Connections"],
    description: "Is social media killing real-life connections?",
    voters: [1, 2, 3],
    status: "ongoing",
    tags: ["society", "technology"],
    start_date: "2024-12-10",
    end_date: "2024-12-22",
  },
  {
    id: 14,
    image: "",
    options: ["Capitalism", "Socialism"],
    description: "Which economic system serves humanity better?",
    status: "upcoming",
    voters: [],
    status: "upcoming",
    tags: ["economy", "politics"],
    start_date: "2024-12-24",
    end_date: "2025-01-07",
  },
  {
    id: 15,
    image: "",
    options: ["Vaccines", "Alternative Medicine"],
    description: "Which approach is better for tackling global health issues?",
    voters: [7, 9, 11],
    status: "ongoing",
    tags: ["health", "medicine"],
    start_date: "2024-12-12",
    end_date: "2024-12-23",
  },
  {
    id: 16,
    image: "",
    options: ["MacOS", "Windows"],
    description: "Which operating system offers the best overall experience?",
    status: "upcoming",
    voters: [],
    tags: ["tech", "computing"],
    start_date: "2024-12-13",
    end_date: "2024-12-26",
  },
  {
    id: 17,
    image: "",
    options: ["Climate Change is Man-Made", "Climate Change is Natural"],
    description: "What is the primary cause of climate change?",
    voters: [5, 12],
    status: "ongoing",
    tags: ["environment", "science"],
    start_date: "2024-12-11",
    end_date: "2024-12-20",
  },
  {
    id: 18,
    image: "",
    options: ["Marvel", "DC"],
    description: "Which comic universe produces better stories and characters?",
    voters: [8, 18, 28],
    status: "ongoing",
    tags: ["entertainment", "comics"],
    start_date: "2024-12-09",
    end_date: "2024-12-20",
  },
  {
    id: 19,
    image: "",
    options: ["Space Exploration", "Earth Conservation"],
    description:
      "Should humanity prioritize space exploration over Earth conservation?",
    voters: [17, 22, 30],
    status: "ended",
    tags: ["science", "environment"],
    start_date: "2024-11-20",
    end_date: "2024-12-06",
  },
  {
    id: 20,
    image: "",
    options: ["School Uniforms", "Casual Wear"],
    description: "Should students be required to wear uniforms in schools?",
    voters: [4, 15],
    status: "ongoing",
    tags: ["education", "society"],
    start_date: "2024-12-12",
    end_date: "2024-12-21",
  },
];

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

  const fetchVotes = async () => {
    try {
      const results = await db.votes.list([Query.orderDesc("$createdAt")]);
      const votes = results.documents;
      setListOfVotes(votes);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchVotes();
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

        {!user && (
          <div className="flex items-center gap-6 my-5 text-[1rem]">
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
        {listOfVotes.length == 0 && (
          <div className="mx-auto justify-center grid gap-5 text-center my-10">
            <LoadingIcon />
            <p className="text-lg">Fetching votes</p>
          </div>
        )}

        <div className="grid items-center gap-4 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {listOfVotes.length !== 0 &&
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
