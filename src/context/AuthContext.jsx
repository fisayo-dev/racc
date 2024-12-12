import { useContext, useState, createContext, useEffect } from "react";
import { account } from "../appwrite/config";
import { ID } from "appwrite";
import Swal from "sweetalert2";
import BarLoader from "react-spinners/BarLoader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
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

    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.username
      );

      // Logs user in after creating account
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetail = await account.get();
      setUser(accountDetail);
    } catch (err) {
      // Check email duplicate error code.
      if (err.code == 409) {
        Swal.fire({
          toast: true,
          text: "Email Address has already been taken",
          position: "top",
          icon: "error",
          showConfirmButton: false,
          timer: 4000,
        });
      } else {
        Swal.fire({
          toast: true,
          text: "Unable to reach server. Try again",
          icon: "error",
          position: "top",
          showConfirmButton: false,
          timer: 2000,
        });
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
      //   console.log(err)
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
            <h2 className="text-4xl font-bold text-blue-400">Racc</h2>
            <BarLoader className="bg-zinc-50" loading={loading} />
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