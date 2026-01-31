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

const CreateNote = () => {
  return (
    <div className="">
      <Heading value="Create New Note" />

      <Card className="w-[80%] max-md:m-1 max-md:w-full m-5">
        <CardHeader>
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="content" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="category" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            type="submit"
            variant="outline"
            className="bg-blue-500 text-white"
          >
            Create
          </Button>
          <Button variant="destructive" className="">
            Reset Fields
          </Button>
        </CardFooter>
        <p className="p-3">Creating on : {new Date().toString()}</p>
      </Card>
    </div>
  );
};

export default CreateNote;
