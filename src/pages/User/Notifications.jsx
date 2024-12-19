import { useEffect, useState } from "react";
import { Header } from "../../components";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { Loader2Icon } from "lucide-react";
import { InfoCircle } from "iconsax-react";
import { useAuth } from "../../context/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(null);

  const getTheUserFullName = async (userId) => {
    try {
      const results = await db.users.list([Query.equal("user_id", userId)]);
      const theUser = results.documents[0];
      return `${theUser.first_name} ${theUser.last_name}`;
    } catch (err) {
      console.log(err.message);
    }
  };
  const getTheUserImage = async (userId) => {
    try {
      const results = await db.users.list([Query.equal("user_id", userId)]);
      const theUser = results.documents[0];
      return theUser.profile_image;
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const results = await db.notifications.list([
        Query.orderDesc("$createdAt"),
      ]);
      const gotten_notifications = results.documents;

      const my_notifications = await Promise.all(
        gotten_notifications
          .filter((notification) => notification.to === user.$id)
          .map(async (notification) => {
            const fullName = await getTheUserFullName(notification.from);
            const userImage = await getTheUserImage(notification.from);
            return {
              ...notification,
              fromFullName: fullName,
              fromUserImage: userImage,
            };
          })
      );

      setNotifications(my_notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div>
      <Header />
      <div className="mt-[8rem] mb-[5rem]">
        <div className="app-container">
          <h2 className="my-3 text-3xl text-center font-bold">
            Your Notifications
          </h2>
          <p className="text-center text-[0.91rem]">
            All participations from users in your votes will appear here{" "}
          </p>
          <div className="my-5 mx-auto md:w-3/5 2xl:w-3/6 w-full">
            {notifications === null && (
              <div className="grid gap-3 justify-center items-center my-20">
                <Loader2Icon className="mx-auto h-28 w-28 md:h-36 md:w-36 animate-spin texd-zinc-200" />
                <p className="text-center">Getting notifications</p>
              </div>
            )}

            {notifications && notifications.length === 0 && (
              <div className="grid gap-3 justify-center items-center my-20">
                <InfoCircle className="text-zinc-300 mx-auto h-28 w-28 md:h-36 md:w-36 " />
                <p className="text-center ">
                  You don't have any notifications yet.
                </p>
              </div>
            )}

            {notifications && notifications.length !== 0 && (
              <div className="grid gap-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.$id}
                    className="bg-zinc-700 rounded-xl flex items-center px-5 hover:bg-zinc-600 cursor-pointer hover:shadow-md h-[4rem]"
                  >
                    <div className="flex items-center   gap-5">
                      <div
                        className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-400 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${`https://cloud.appwrite.io/v1/storage/buckets/${
                            import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID
                          }/files/${notification.fromUserImage}/view?project=${
                            import.meta.env.VITE_PROJECT_ID
                          }`})`,
                        }}
                      />
                      {notification.from == user.$id ? (
                        
                        <h2>
                        You participated in your vote
                        </h2>) : (
                          <h2>
                        {notification.fromFullName} participated in your vote
                        </h2>
                        )
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
