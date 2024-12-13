import { Button } from "@/components/ui/button";
const ButtonEl = ({ text }) => {
  return (
    <Button className="md:text-[1rem] text-[0.8rem] text-blue-300 hover:bg-zinc-600 border-[0.1rem] border-zinc-600 rounded-lg ">
      {text}
    </Button>
  );
};

export default ButtonEl;
