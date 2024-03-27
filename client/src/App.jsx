import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ReadPage from "./pages/ReadPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ReadPage key={Date.now()} />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
