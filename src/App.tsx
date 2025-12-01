import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import BooksPage from "./screens/BooksPage/ui/BooksPage.tsx";
import MoviesPage from "./screens/MoviesPage/ui/MoviesPage.tsx";
import JobsPage from "./screens/JobsPage/ui/JobsPage.tsx";

const App = () => {
  return (
    <BrowserRouter basename="/hse-web-hw-3">
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
