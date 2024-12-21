import { useEffect, useState } from "react";
import { Header } from "../../components";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { ExternalLinkIcon, Loader2Icon } from "lucide-react";
import { InfoCircle, Trash } from "iconsax-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Notifications = () => {
  const { user, setNotificationSeen } = useAuth();
  const [notifications, setNotifications] = useState(null);

  const deleteNotification = async (notification_id) => {
    try {
      // Delete notification from database
      await db.notifications.delete(notification_id);
      // Update the state by filtering out the deleted notification
      setNotifications((notifications) =>
        notifications.filter(
          (notification) => notification.$id !== notification_id
        )
      );

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: `Notification successfully deleted`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const getTheUserFullName = async (userId) => {
    try {
      const results = await db.users.list([Query.equal("user_id", userId)]);
      const theUser = results.documents[0];
      return `${theUser.first_name} `;
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
    const readAllNotificationsTrue = async () => {
      const result = await db.users.list([Query.equal("user_id", user.$id)]);
      const theUserColDoc = result.documents[0];
      await db.users.update(theUserColDoc.$id, {
        notification_seen: true,
      });
      setNotificationSeen(true);
    };
    readAllNotificationsTrue();
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
                    className="bg-zinc-800 rounded-xl flex items-center px-5 hover:bg-zinc-700 cursor-pointer hover:shadow-md h-[4rem]"
                  >
                    <div className="w-full flex items-center justify-between   gap-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-8 w-8 md:h-11 md:w-11 rounded-full bg-zinc-400 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${`https://cloud.appwrite.io/v1/storage/buckets/${
                              import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID
                            }/files/${
                              notification.fromUserImage
                            }/view?project=${
                              import.meta.env.VITE_PROJECT_ID
                            }`})`,
                          }}
                        />
                        <div className="">
                          {notification.from == user.$id ? (
                            <h2 className="">You participated in your vote</h2>
                          ) : (
                            <h2>
                              {notification.fromFullName} participated in your
                              vote
                            </h2>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/vote/${notification.vote_id}`}
                          className="grid place-items-center justify-center"
                        >
                          <ExternalLinkIcon className="h-6 w-6 text-blue-600 hover:text-blue-500" />
                        </Link>
                        <div
                          className="grid place-items-center justify-center"
                          onClick={() => deleteNotification(notification.$id)}
                        >
                          <Trash className="h-6 w-6 text-red-600 hover:text-red-500" />
                        </div>
                      </div>
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
