import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";

const SignUpPage = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "note-zipper");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkosxdbxs/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    if (!result.secure_url) {
      throw new Error("Image upload failed");
    }

    return result.secure_url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      registerUser({
        name,
        email,
        password,
        pic: imageUrl || undefined,
      }),
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/create-note");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Heading value="Register" />

      <Card className="w-[80%] max-md:m-1 max-md:w-full m-5">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="profile-pic">Profile Pic</Label>
                <Input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setUploading(true);
                    try {
                      const url = await uploadToCloudinary(file);
                      setImageUrl(url);
                    } catch {
                      alert("Image upload failed");
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Button
              type="submit"
              className="bg-blue-500 text-white my-10 w-full"
              disabled={uploading || loading}
            >
              {loading || uploading ? "LOADING..." : "Sign Up"}
            </Button>
          </form>

          <Link to="/login" className="m-2 block">
            Already logged in? Click here
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
