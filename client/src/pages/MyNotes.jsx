import Heading from "@/components/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../redux/notesSlice";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notes, loading, error } = useSelector((state) => state.notes);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    dispatch(deleteNote(id));
  };

  return (
    <div className="min-h-screen p-8 max-md:p-1">
      <Heading value={`Welcome Back, ${userInfo?.name}`} />

      <Button
        className="bg-blue-500 text-white mb-3"
        onClick={() => navigate("/create-note")}
      >
        Create Note
      </Button>

      <Card className="w-[60%]">
        <CardContent>
          {loading && <p>Loading notes...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && notes.length === 0 && <p>No notes found</p>}

          <Accordion type="single" collapsible>
            {notes.map((item) => (
              <AccordionItem key={item._id} value={item._id} className="w-full">
                <AccordionTrigger className="flex justify-between items-center btn">
                  <p>{item.title}</p>
                  <div className="flex gap-2">
                    <span
                      className="bg-green-500 rounded-lg p-1 w-13 text-center text-white"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent accordion toggle
                        navigate(`/notes/${item._id}/edit`);
                      }}
                    >
                      Edit
                    </span>
                    <span
                      className="bg-red-500 rounded-lg p-1 text-white"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent accordion toggle
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <Badge className="mb-2">{item.category}</Badge>
                  <p>{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyNotes;
