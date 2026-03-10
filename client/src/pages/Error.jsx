import Footer from "@/components/shared/Footer";
import Header from "../components/shared/Header";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold">
          OOPS! <span>{error?.status || "404"}</span>{" "}
          {error?.data || "Something went wrong"}
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
