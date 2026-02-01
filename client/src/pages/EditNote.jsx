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
import {
  fetchNoteById,
  updateNote,
  clearCurrentNote,
} from "../redux/notesSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentNote, loading, error } = useSelector((state) => state.notes);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  // Fetch note by ID when page loads
  useEffect(() => {
    dispatch(fetchNoteById(id));

    return () => {
      dispatch(clearCurrentNote()); // cleanup
    };
  }, [dispatch, id]);

  // Pre-fill form when currentNote is loaded
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCategory(currentNote.category);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      await dispatch(updateNote({ id, title, content, category })).unwrap();

      navigate("/notes");
    } catch (err) {
      // Error is already in redux slice
    }
  };

  const handleReset = () => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCategory(currentNote.category);
    }
  };

  return (
    <div>
      <Heading value="Edit Note" />

      <Card className="w-[80%] max-md:m-1 max-md:w-full m-5">
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
        </CardHeader>

        <CardContent>
          {loading && <p>Loading note...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {currentNote && (
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
              </div>

              <CardFooter className="gap-2 px-0 mt-6">
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
                  Reset Fields
                </Button>
              </CardFooter>
            </form>
          )}
        </CardContent>

        <p className="p-3 text-sm text-muted-foreground">
          Editing on: {new Date().toLocaleString()}
        </p>
      </Card>
    </div>
  );
};

export default EditNote;
