import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">
        OOPS! <span>{error?.status || "404"}</span>{" "}
        {error?.data || "Something went wrong"}
      </h2>
    </div>
  );
};

export default Error;
