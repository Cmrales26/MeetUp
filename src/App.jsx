import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import { UserAuthProvider } from "./context/AuthContex";
import Home from "./screens/Home";

function App() {
  const [selectedNav, setSelectedNav] = useState("HOME");
  return (
    <div className="app">
      <main className="content">
        {/* User ROUTES */}
        <UserAuthProvider>
          <Routes>
            <Route path="/" element={<Login setSelectedNav={setSelectedNav} />} />
            <Route path="/login" element={<Login setSelectedNav={setSelectedNav} />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </UserAuthProvider>
      </main>
    </div>
  );
}

export default App;
