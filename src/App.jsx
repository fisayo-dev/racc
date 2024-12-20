import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import { Home, Signup, Login, Search } from "./pages";
import VoteDescription from "./pages/vote/VoteDescription";
import { Notifications, CreateVote, Profile, UserVotes, UserVoteEdit } from "./pages/User/";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote/:id" element={<VoteDescription />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/create-vote" element={<CreateVote />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/my-votes" element={<UserVotes />} />
          <Route path="/profile/my-votes/edit/:vote_id" element={<UserVoteEdit />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
