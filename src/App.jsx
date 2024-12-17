import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import { Home, Signup, Login } from "./pages";
import VoteDescription from "./pages/vote/VoteDescription";
import { Notifications, CreateVote, Profile, UserVotes } from "./pages/User/";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote/:id" element={<VoteDescription />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/create-vote" element={<CreateVote />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="w" element={<UserVotes />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
