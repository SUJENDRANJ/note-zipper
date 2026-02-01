import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../redux/notesSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.notes);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      await dispatch(createNote({ title, content, category })).unwrap();

      navigate("/notes"); // important
    } catch (err) {
      // error already handled in redux
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div>
      <Heading value="Create New Note" />

      <Card className="w-[80%] max-md:m-1 max-md:w-full m-5">
        <CardHeader>
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <CardFooter className="gap-2 px-0 mt-6">
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </Button>

              <Button type="button" variant="destructive" onClick={handleReset}>
                Reset Fields
              </Button>
            </CardFooter>
          </form>
        </CardContent>

        <p className="p-3 text-sm text-muted-foreground">
          Creating on: {new Date().toLocaleString()}
        </p>
      </Card>
    </div>
  );
};

export default CreateNote;
