import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Users from "../pages/UsersList";

function ComponentRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default ComponentRouter;
