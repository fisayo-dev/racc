import { Button, Header } from "../../components";
import { useAuth } from "../../context/AuthContext";
import image from '../../assets/samples/Nextjs.png'

const Profile = () => {
  const { user, logoutUser } = useAuth();
  console.log(user);
  return (
    <div>
      <Header />
      <div className="mt-[8rem] mb-[5rem]">
        <div className="app-container ">
          <div className="profile-grid">
            <div className="border-[0.1rem] border-zinc-500 bg-zinc-800 rounded-lg px-5 py-4">
              <div className="grid gap-4">
                <div className="h-52 w-52 mx-auto bg-cover bg-center overflow-hidden rounded-full bg-zinc-300" style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className="text-center">
                  <p>{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div className="mx-auto" onClick={logoutUser}>
                  <Button text="Logout" className="bg-red-500 border-none text-white hover:bg-red-600"/>
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
