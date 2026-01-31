import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layouts/AppLayout";
import MyNotes from "./pages/MyNotes";
import CreateNote from "./pages/CreateNote";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/notes", element: <MyNotes /> },
        { path: "/create-note", element: <CreateNote /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
