import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="main flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl w-[50%] p-10 max-lg:text-4xl max-md:w-full max-md:p-4">
        Welcome To Note Zipper
      </h1>
      <p>The Safe Place for your Notes</p>

      <div className="flex gap-10 p-5">
        <Button variant="ghost" className="bg-blue-500 text-white">
          Login
        </Button>
        <Button
          variant="secondary"
          className="border-b-4 text-blue-500 border-blue-500"
        >
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
