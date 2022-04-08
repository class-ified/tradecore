// ------------ import external dependencies ----------
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ----------- import internal dependencies -----------
import { GenreProvider } from "context/genreState";
import "./sass/main.scss";

// ----------- import component pages with lazy loading -----------
const AddBook = lazy(() => import("./pages/AddBook"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <GenreProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/addbook" />} />
              <Route path="addbook" element={<AddBook />} />
              <Route path="success" element={<Success />} />
            </Routes>
          </Router>
        </GenreProvider>
      </Suspense>
    </>
  );
}

export default App;
