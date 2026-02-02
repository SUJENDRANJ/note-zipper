import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layouts/AppLayout";
import MyNotes from "./pages/MyNotes";
import CreateNote from "./pages/CreateNote";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EditNote from "./pages/EditNote";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <LandingPage /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: "/notes", element: <MyNotes /> },
            { path: "/create-note", element: <CreateNote /> },
            { path: "/notes/:id/edit", element: <EditNote /> },
            { path: "/profile", element: <Profile /> },
          ],
        },

        {
          element: <PublicRoute />,
          children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignUpPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
