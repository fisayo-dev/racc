import { Button, Header } from "../../components";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/samples/Nextjs.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  console.log(user);
  return (
    <div>
      <Header />
      <div className="mt-[8rem] mb-[5rem]">
        <div className="app-container ">
          <div className="grid items-start md:flex profile-grid">
            <div className="bg-zinc-800 shadow-md rounded-lg p-6">
              <div className="grid gap-4">
                <div
                  className="h-40 w-40 mx-auto bg-cover bg-center overflow-hidden rounded-full bg-zinc-300"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="text-center">
                  <p>{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div className="mx-auto" onClick={logoutUser}>
                  <Button
                    text="Logout"
                    className="bg-red-500 border-none text-white hover:bg-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="w-full bg-zinc-800 shadow-md rounded-lg p-6">
              <div className="grid gap-2">
                <h2 className="text-2xl font-bold">Your Activity</h2>
                <div className="grid gap-5 my-5 grid-cols-1 md:grid-cols-3">
                  <div className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold">Total Votes</h2>
                    <div className="grid text-center justify-center">
                      <p className="text-8xl font-bold">24</p>
                      <p className="text-sm">votes</p>
                    </div>
                  </div>
                  <div className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold">My Votes</h2>
                    <div className="grid text-center justify-center">
                      <p className="text-8xl font-bold">11</p>
                      <p className="text-sm">votes</p>
                    </div>
                      <Link to="/profile/my-votes" className="text-sm">View them</Link>
                  </div>
                  <div className="grid place-items-center items-center cursor-pointer hover:bg-zinc-600 bg-zinc-700 h-64 shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold">Total Votes</h2>
                    <div className="grid text-center justify-center">
                      <p className="text-8xl font-bold">24</p>
                      <p className="text-sm">votes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
