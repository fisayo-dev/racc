import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home, Signup, Login } from "./pages";
import VoteDescription from "./pages/vote/VoteDescription";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote/:id" element={<VoteDescription />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
