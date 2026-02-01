import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      // If logged in, redirect to /notes
      navigate("/notes", { replace: true });
    }
  }, [userInfo, navigate]);

  return (
    <div className="main flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl w-[50%] p-10 max-lg:text-4xl max-md:w-full max-md:p-4">
        Welcome To Note Zipper
      </h1>
      <p>The Safe Place for your Notes</p>

      <div className="flex gap-10 p-5">
        <Link to="/login">
          <Button
            variant="ghost"
            className="bg-blue-500 hover:text-blue-500 text-white cursor-pointer"
          >
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button
            variant="secondary"
            className="cursor-pointer border-b-4 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500"
          >
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
