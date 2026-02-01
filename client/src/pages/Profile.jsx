import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Heading from "@/components/Heading";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");

  // Fetch user info when component mounts
  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // redirect if not logged in
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic || "");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    // Dispatch update action
    dispatch(updateUserProfile({ name, email, password, pic }));
  };

  const handleReset = () => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic || "");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen p-8 max-md:p-2">
      <Heading value="User Profile" />

      <div className="flex items-center flex-wrap w-full">
        <Card className="w-[60%] max-md:w-full max-md:m-1 m-5">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>

          <CardContent>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password (leave blank to keep unchanged)
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pic">Profile Picture URL</Label>
                <Input
                  id="pic"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                />
              </div>

              <CardFooter className="flex gap-2 mt-4 px-0">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <img
          src={userInfo.pic}
          alt={userInfo.name}
          className="border-20 w-[30%] h-[40%] border-black"
        />
      </div>
    </div>
  );
};

export default Profile;
