import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import { UserAuthProvider } from "./context/AuthContex";
import { UserEventsProvider } from "./context/UserEventContext";
import Home from "./screens/Home";
import Event from "./screens/Event";
import Profile from "./screens/Profile";
import MyEventsScreen from "./screens/MyEvents";
import Events from "./screens/Events";
import Err404 from "./components/Err404";
import Create from "./screens/Create";

function App() {
  return (
    <div className="app">
      <main className="content">
        {/* User ROUTES */}
        <UserAuthProvider>
          <UserEventsProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />

              <Route path="/home" element={<Home />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/MyEvents" element={<MyEventsScreen />} />

              <Route path="*" element={<Err404 />} />
              <Route path="/404" element={<Err404 />} />
            </Routes>
          </UserEventsProvider>
        </UserAuthProvider>
      </main>
    </div>
  );
}

export default App;
