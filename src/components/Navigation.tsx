import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  NavLinkProps,
} from "react-router-dom";
import Home from "./Home";
import Todo from "./Todo/Todo";
import { Container as VirtualListContainer } from "./Virtualization/Container";
const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <nav className="m-2">
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
            <li className="nav-item">
              <NavLink
                to="/virtuallist"
                className={({ isActive, isPending }: NavLinkProps) =>
                  `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`
                }
              >
                Virtual List
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/virtuallist" element={<VirtualListContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
