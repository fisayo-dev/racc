import { Hashtag, Paperclip } from "iconsax-react";
import { Header } from "../../components";
import { ListBulletIcon } from "@heroicons/react/24/outline";
const CreateVote = () => {
  return (
    <div className="w-full grid text-zinc-200">
      <Header />
      <div className="mt-[8rem]">
        <div className="container grid mx-auto xl:px-20 md:px-15 px-5 ">
          <div className="grid sm:gap-[7.5rem] md:gap-[10rem] grid-cols-1 md:grid-cols-2">
            <div className="grid gap-[5rem] my-5">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-6 w-6" />
                  <h2 className="text-3xl font-bold">Vote Info:</h2>
                </div>
                <div className="grid gap-4">
                  <label>Vote Title</label>
                  <input
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Enter a title that best describes your vote"
                  />
                </div>
                <div className="grid gap-4">
                  <label>Vote Description</label>
                  <textarea
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Tell us what your vote is all about"
                  ></textarea>
                </div>
                <div className="grid gap-4">
                  <label>Vote Tags</label>
                  <div className="grid lg:flex gap-3">
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
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <ListBulletIcon className="h-6 w-6" />
                  <h2 className="text-3xl font-bold">Vote Options:</h2>
                </div>
                <div className="grid gap-4">
                  <label>Option 1</label>
                  <input
                    type="text"
                    className="w-full border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Your vote option or candidate "
                  />
                </div>
                <div className="grid gap-4">
                  <label>Option 2</label>
                  <input
                    type="text"
                    className="border-[0.1rem] border-zinc-300 rounded-lg px-4 py-3"
                    placeholder="Your vote option or candidate "
                  />
                </div>
                <div className="text-md flex items-center justify-end hover:bg-zinc-300 bg-zinc-500"></div>
              </div>
            </div>
            <div className="grid gap-[5rem] my-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                nam consequatur minus voluptatum atque nostrum unde aspernatur
                beatae cum. Distinctio ab eaque praesentium, debitis dolor hic
                quia dicta odit alias, repudiandae esse eius, numquam molestiae
                nobis vitae? Aut quisquam distinctio quos facere provident,
                excepturi nulla iste laborum. Incidunt eum libero architecto
                nam, dolor maiores rerum error hic molestias ratione aut. Autem
                quas quis eum corrupti nobis enim distinctio, vitae minima,
                delectus amet deleniti sint repellat ad. Ipsam delectus esse
                labore debitis sit aut impedit repellendus quod, quae soluta
                porro sint velit eaque inventore rem ex! Expedita at explicabo
                quibusdam. Consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVote;
