import { useContext, useState, createContext, useEffect } from "react";
import { account } from "../appwrite/config";
import { ID } from "appwrite";
import Swal from "sweetalert2";
import BarLoader from "react-spinners/BarLoader";
import db from "../appwrite/databases";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (!user) checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      let accountDetail = await account.get();
      console.log(accountDetail);
      setUser(accountDetail);
    } catch (err) {
      if (err.code == 401) {
        Swal.fire({
          toast: true,
          icon: "error",
          text: "Invlaid username or Email",
          timer: 4000,
          position: "top",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          toast: true,
          icon: "error",
          text: "Unable to Access Server",
          timer: 4000,
          position: "top",
          showConfirmButton: false,
        });
      }
    }
    setLoading(false);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    const {
      first_name,
      last_name,
      email,
      password,
      country,
      gender,
      birth_date,
      username,
      voting_id,
    } = userInfo;

    try {
      // Create the user account in Appwrite
      await account.create(ID.unique(), email, password, username);

      // Logs user in after creating account
      await account.createEmailPasswordSession(email, password);

      // Fetch user account details after login
      const accountDetail = await account.get();

      // Save additional user information to the database
      
      const payload = {
        first_name,
        last_name,
        email,
        country,
        birth_date,
        gender,
        username,
        password,
        voting_id,
        user_id: accountDetail.$id, // Appwrite user ID
      };

      console.log(payload);

      await db.users.create(payload);

      // Update local user state
      setUser(accountDetail);
      Swal.fire({
        toast: true,
        text: "Registration successful!",
        icon: "success",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (err) {
      // Handle errors like email already taken or server issues
      if (err.code === 409) {
        Swal.fire({
          toast: true,
          text: "Email address has already been taken.",
          icon: "error",
          position: "top",
          showConfirmButton: false,
          timer: 4000,
        });
      } else {
        Swal.fire({
          toast: true,
          text: "Unable to reach server. Please try again.",
          icon: "error",
          position: "top",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(err.message)
      }
    }

    setLoading(false);
  };

  const deleteUser = async (userId) => {
    try {
      await Swal.fire({
        icon: "warning",
        title: "Delete Account ?",
        text: "Are you sure you want to delete your account.",
        confirmButtonText: "Yes, delete it",
        confirmButtonColor: "#2563eb",
        cancelButtonText: "No",
        cancelButtonColor: "#d33",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // users.delete(userId);
          logoutUser();
        }
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetail = await account.get();
      setUser(accountDetail);
    } catch (err) {
        console.log(err)
    }
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="w-[100vw] h-[100vh] grid items-center justify-center bg-zinc-900 overflow-hidden anmate-load">
          <div className="text-center app-text-color justify-items-center grid gap-4 mx-auto">
            <h2 className="text-7xl font-bold text-blue-400">Racc</h2>
            <BarLoader
              className="bg-blue-400 rounded-full"
              cssOverride={{
                borderColor: "transparent",
                backgroundColor: "transparent",
              }}
              loading={loading}
              color="#4e8fca" // Set color for the loaded part (blue)
              width={250} // Custom width for the loader
              height={7} // Custom height for the loader
            />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
