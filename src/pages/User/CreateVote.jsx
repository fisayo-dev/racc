import { Hashtag, Paperclip } from "iconsax-react";
import { Header } from "../../components";
import {
  Cog8ToothIcon,
  ListBulletIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { MegaphoneIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CreateVote = () => {
  const [date, setDate] = useState();
  const [formStatus, setFormStatus] = useState(0);

  return (
    <div className="w-full grid text-zinc-200">
      <Header />
      <div className="mt-[8rem]">
        <div className="container grid mx-auto xl:px-20 md:px-15 px-5 ">
          <div className="grid gap[2.5rem] sm:gap-[7.5rem] md:gap-[10rem] items-start grid-cols-1 md:grid-cols-2">
            <div className="grid gap-[5rem] my-5">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-7 w-7" />
                  <h2 className="text-3xl font-bold">Vote Info</h2>
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
                  <ListBulletIcon className="h-7 w-7" />
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
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Cog8ToothIcon className="h-7 w-7" />
                  <h2 className="text-3xl font-bold">Timing and Settings</h2>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    What date do you want the vote to commence ?
                  </h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "bg-zinc-700 hover:bg-zinc-600 text-gray-200 justify-start text-left font-normal",
                          !date && "text-gray-300"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    What time do you want the vote to commence ?
                  </h2>
                  <div className="grid md:flex gap-3 md:gap-5  items-center">
                    <Select className="outline-none w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time1">11:00</SelectItem>
                        <SelectItem value="time2">12:00</SelectItem>
                        <SelectItem value="time3">1:00</SelectItem>
                        <SelectItem value="time4">2:00</SelectItem>
                        <SelectItem value="time5">3:00</SelectItem>
                        <SelectItem value="time6">4:00</SelectItem>
                        <SelectItem value="time7">5:00</SelectItem>
                        <SelectItem value="time8">6:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select className="outline-none">
                      <SelectTrigger>
                        <SelectValue placeholder="Time Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    What date do you want the vote to end ?
                  </h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "bg-zinc-700 hover:bg-zinc-600 text-gray-200 justify-start text-left font-normal",
                          !date && "text-gray-300"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    What time do you want the vote to end ?
                  </h2>
                  <div className="grid md:flex gap-3 md:gap-5  items-center">
                    <Select className="outline-none w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time1">11:00</SelectItem>
                        <SelectItem value="time2">12:00</SelectItem>
                        <SelectItem value="time3">1:00</SelectItem>
                        <SelectItem value="time4">2:00</SelectItem>
                        <SelectItem value="time5">3:00</SelectItem>
                        <SelectItem value="time6">4:00</SelectItem>
                        <SelectItem value="time7">5:00</SelectItem>
                        <SelectItem value="time8">6:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select className="outline-none">
                      <SelectTrigger>
                        <SelectValue placeholder="Time Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-[5rem] my-5">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MegaphoneIcon className="h-7 w-7" />
                  <h2 className="text-3xl font-bold">Publicity & Audience</h2>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    Do you want any gender restriction ?
                  </h2>
                  <Select className="outline-none">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Yes</SelectItem>
                      <SelectItem value="system">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">
                    Which gender so you want to restrict?
                  </h2>
                  <Select className="outline-none">
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-md">Do you want the vote to be public</h2>
                  <Select className="outline-none">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Yes</SelectItem>
                      <SelectItem value="male">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVote;
