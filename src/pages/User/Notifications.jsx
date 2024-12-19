import { useEffect, useState } from "react";
import { Header } from "../../components";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { Loader2Icon } from "lucide-react";
import { InfoCircle } from "iconsax-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const results = db.notifications.list([Query.orderDesc("$createdAt")]);
    const my_notifications = results.filter(
      (notification) => notification.to == user.$id
    );
    setNotifications(my_notifications || []);
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div>
      <Header />
      <div className="mt-[8rem] mb-[5rem]">
        <div className="app-container">
          <h2 className="my-3 text-3xl text-center font-bold">Your Notifications</h2>
          <p className="text-center text-[0.91rem]">
            All participations from users in your votes will appear here{" "}
          </p>
          <div className="my-5 mx-auto md:w-3/5 2xl:w-3/6 w-full">
            {notifications ?? (
              <div className="grid gap-3 justify-center items-center my-20">
                <Loader2Icon className="mx-auto h-28 w-28 md:h-36 md:w-36 animate-spin texd-zinc-200" />
                <p className="text-center">Getting notifications</p>
              </div>
            )}
            {notifications && notifications.length == 0 && (
              <div className="grid gap-3 justify-center items-center my-20">
                <InfoCircle className="text-zinc-300 mx-auto h-28 w-28 md:h-36 md:w-36 " />
                <p className="text-center ">
                    You don't have any notifications yet.
                </p>
              </div>
            )}
            {notifications && notifications.length !== 0 && (
              <div className="grid gap-4">
                <div className="grid gap-5">
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem] ">
                    <div className="flex items-center gap-5">
                      <div className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-200" />
                      <h2>Fisayo Obadina participated in your vote</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
