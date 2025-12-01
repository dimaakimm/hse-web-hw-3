import { NavLink } from "react-router-dom";

export const Tabs = () => (
  <nav className="tabs">
    <NavLink
      to="/jobs"
      className={({ isActive }) => "tab" + (isActive ? " active" : "")}
    >
      Работа
    </NavLink>
    <NavLink
      to="/books"
      className={({ isActive }) => "tab" + (isActive ? " active" : "")}
    >
      Книги
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) => "tab" + (isActive ? " active" : "")}
    >
      Фильмы
    </NavLink>
  </nav>
);
