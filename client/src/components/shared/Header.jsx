import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <nav className="flex justify-around p-2 bg-blue-400 items-center text-white">
        <Link to="/">
          <h3 className="logo font-semibold">Note Zipper</h3>
        </Link>

        {/* {userInfo && (
          <Input
            placeholder="Search notes..."
            className="w-70 bg-white text-black"
          />
        )} */}

        <div className="flex items-center gap-2">
          {userInfo ? (
            <>
              <Link to="/notes">MyNotes</Link>

              <Select>
                <SelectTrigger className="w-full max-w-48 bg-white text-black">
                  <SelectValue placeholder={userInfo.name} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>User</SelectLabel>
                    <SelectItem
                      value="profile"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </SelectItem>
                    <SelectItem value="logout" onClick={handleLogout}>
                      Logout
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
