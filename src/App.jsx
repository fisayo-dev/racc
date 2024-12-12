import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home, Signup, Login } from "./pages";
import VoteDescription from "./pages/vote/VoteDescription";
import { Notifications, CreateVote, Profile } from "./pages/User/";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote/:id" element={<VoteDescription />} />
        <Route path="/create-vote" element={<CreateVote />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create-vote" element={<CreateVote />} />
        <Route path="/profile" element={<Profile />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
