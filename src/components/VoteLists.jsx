import VoteCard from "./VoteCard";
import image1 from "../assets/samples/ballondor.png";
import image2 from "../assets/samples/chess.png";
import image3 from "../assets/samples/oscars.png";
import image4 from "../assets/samples/nextjs.png";

const VoteLists = () => {
  const fakeVotingList = [
    {
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
      image: "",
      options: ["Android", "iOS"],
      description: "Which mobile OS offers better features and usability?",
      voters: [11, 22, 33, 44],
      status: "upcoming",
      tags: ["tech", "mobile"],
      start_date: "2024-12-15",
      end_date: "2024-12-28",
    },
    {
      image: "",
      options: ["Artificial Intelligence", "Human Intelligence"],
      description: "Will AI ever surpass human intelligence completely?",
      voters: [5, 6, 7],
      status: "upcoming",
      tags: ["tech", "AI"],
      start_date: "2024-12-20",
      end_date: "2025-01-02",
    },
    {
      image: "",
      options: ["Electric Cars", "Gasoline Cars"],
      description: "Are electric cars the ultimate future of transportation?",
      voters: [4, 10, 18],
      status: "upcoming",
      tags: ["tech", "environment"],
      start_date: "2024-12-18",
      end_date: "2025-01-01",
    },
    {
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
      image: "",
      options: ["Remote Work", "Office Work"],
      description: "Is remote work as productive as traditional office work?",
      voters: [23, 27],
      status: "upcoming",
      tags: ["work", "productivity"],
      start_date: "2024-12-16",
      end_date: "2024-12-30",
    },
    {
      image: "",
      options: ["Freedom of Speech", "Regulated Speech"],
      description: "Should freedom of speech come with more regulations?",
      voters: [9, 15, 25],
      status: "upcoming",
      tags: ["society", "rights"],
      start_date: "2024-12-17",
      end_date: "2024-12-31",
    },
    {
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
      image: "",
      options: ["Bitcoin", "Ethereum"],
      description: "Which cryptocurrency has better potential in the long run?",
      voters: [2, 5, 7, 9],
      status: "upcoming",
      tags: ["finance", "crypto"],
      start_date: "2024-12-19",
      end_date: "2025-01-05",
    },
    {
      image: "",
      options: ["Fast Food", "Home-Cooked Meals"],
      description: "Which is more practical in today's busy world?",
      voters: [6, 11, 14],
      status: "upcoming",
      tags: ["lifestyle", "food"],
      start_date: "2024-12-21",
      end_date: "2025-01-04",
    },
    {
      image: "",
      options: ["E-books", "Printed Books"],
      description: "Which format do people prefer for reading?",
      voters: [3, 6, 8],
      status: "upcoming",
      tags: ["literature", "reading"],
      start_date: "2024-12-14",
      end_date: "2024-12-27",
    },
    {
      image: "",
      options: ["Universal Healthcare", "Private Healthcare"],
      description: "Which healthcare system is better for society?",
      voters: [10, 14, 18],
      status: "upcoming",
      tags: ["health", "society"],
      start_date: "2024-12-23",
      end_date: "2025-01-06",
    },
    {
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
      image: "",
      options: ["Capitalism", "Socialism"],
      description: "Which economic system serves humanity better?",
      voters: [12, 20, 25],
      status: "upcoming",
      tags: ["economy", "politics"],
      start_date: "2024-12-24",
      end_date: "2025-01-07",
    },
    {
      image: "",
      options: ["Vaccines", "Alternative Medicine"],
      description:
        "Which approach is better for tackling global health issues?",
      voters: [7, 9, 11],
      status: "ongoing",
      tags: ["health", "medicine"],
      start_date: "2024-12-12",
      end_date: "2024-12-23",
    },
    {
      image: "",
      options: ["MacOS", "Windows"],
      description: "Which operating system offers the best overall experience?",
      voters: [14, 21],
      status: "upcoming",
      tags: ["tech", "computing"],
      start_date: "2024-12-13",
      end_date: "2024-12-26",
    },
    {
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
      image: "",
      options: ["Marvel", "DC"],
      description:
        "Which comic universe produces better stories and characters?",
      voters: [8, 18, 28],
      status: "ongoing",
      tags: ["entertainment", "comics"],
      start_date: "2024-12-09",
      end_date: "2024-12-20",
    },
    {
      image: "",
      options: ["Space Exploration", "Earth Conservation"],
      description:
        "Should humanity prioritize space exploration over Earth conservation?",
      voters: [17, 22, 30],
      status: "upcoming",
      tags: ["science", "environment"],
      start_date: "2024-12-20",
      end_date: "2025-01-03",
    },
    {
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

  const images = [image1, image2, image3, image4];

  const randomImage = () => images[Math.floor(Math.random() * images.length)];

  return (
    <div className="mt-10 text-white">
      <div className="container mx-auto md:px-20 px-5 ">
        <div className="grid gap-5 2xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {fakeVotingList.map((vote, index) => (
            <VoteCard
              key={index}
              image={randomImage()}
              description={vote.description}
              options={vote.options}
              status={vote.status}
              start_date={vote.start_date}
              voters={vote.voters}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoteLists;
