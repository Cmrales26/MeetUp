import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import { UserAuthProvider } from "./context/AuthContex";
import { UserEventsProvider } from "./context/UserEventContext";
import Home from "./screens/Home";
import Event from "./screens/Event";

function App() {
  const [selectedNav, setSelectedNav] = useState("HOME");
  return (
    <div className="app">
      <main className="content">
        {/* User ROUTES */}
        <UserAuthProvider>
          <UserEventsProvider>
            <Routes>
              <Route
                path="/"
                element={<Login setSelectedNav={setSelectedNav} />}
              />
              <Route
                path="/login"
                element={<Login setSelectedNav={setSelectedNav} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/event/:eventId" element={<Event />} />
            </Routes>
          </UserEventsProvider>
        </UserAuthProvider>
      </main>
    </div>
  );
}

export default App;
