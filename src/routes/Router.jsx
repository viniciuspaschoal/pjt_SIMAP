import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Container from "../Container";
import Login from "../Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Container />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}