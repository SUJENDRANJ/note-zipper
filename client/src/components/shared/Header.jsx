import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Header = () => {
  return (
    <header>
      <nav className="flex justify-around p-2 bg-blue-400 items-center text-white">
        <Link to="/">
          <h3 className="logo font-semibold ">Note Zipper</h3>
        </Link>

        <Input placeholder="Enter text" className="w-70 bg-white" />

        <div className="flex items-center gap-2">
          <Link to="/notes">MyNotes</Link>

          <Select>
            <SelectTrigger className="w-full max-w-48 bg-white">
              <SelectValue placeholder="Sujendran" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>User</SelectLabel>
                <SelectItem value="apple">Profile</SelectItem>
                <SelectItem value="banana">Logout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </nav>

      {/* mobile */}
    </header>
  );
};

export default Header;
