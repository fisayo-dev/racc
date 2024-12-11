import { Hashtag, Paperclip } from "iconsax-react";
import { Header } from "../../components";
const CreateVote = () => {
  return (
    <div className="text-zinc-200">
      <Header />
      <div className="container mx-auto xl:px-20 md:px-15 px-5 ">
        <div className="mt-[8rem]">
          <div className="grid gap-5 md:gap-8 grid-cols-1 md:grid-cols-2">
            <div className="grid gap-5">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-6 w-6" />
                  <h2 className="text-3xl font-bold">Vote Info:</h2>
                </div>
                <div className="grid gap-3">
                  <label>Vote Title</label>
                  <input
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Enter a title that best describes your vote"
                  />
                </div>
                <div className="grid gap-3">
                  <label>Vote Description</label>
                  <textarea
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Tell us what your vote is all about"
                  ></textarea>
                </div>
                <div className="grid gap-3">
                  <label>Vote Tags</label>
                  <div className="flex gap-5 items-center">
                    <div className="flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
                      <Hashtag className="h-6 w-6" />
                      <input type="text" className="" placeholder="Tag 1" />
                    </div>
                    <div className="flex items-center gap-2 border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3">
                      <Hashtag className="h-6 w-6" />
                      <input type="text" className="" placeholder="Tag 2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVote;
