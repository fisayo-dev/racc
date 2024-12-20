import { useState } from "react";
import { Header } from "../../components";
import { Loader2Icon } from "lucide-react";

const UserProfileEdit = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <Header />
      <div className="app-container my-[8rem]">
        {loading ? (
          <Loader2Icon className="mx-auto h-24 w-24 md:h-28 md:w-28 animate-spin my-20" />
        ) : (
          <h2 className="text-center text-4xl">Edit your Profile</h2>
        )}
      </div>
    </div>
  );
};

export default UserProfileEdit;
