import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  NavLinkProps,
} from "react-router-dom";
import Home from "./Home";
import Todo from "./Todo/Todo";
const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul className="nav justify-content-center nav-pills">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive, isPending }: NavLinkProps) =>
                  `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/todo"
                className={({ isActive, isPending }: NavLinkProps) =>
                  `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`
                }
              >
                Todo items
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
