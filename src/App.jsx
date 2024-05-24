import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import { UserAuthProvider } from "./context/AuthContex";
import { UserEventsProvider } from "./context/UserEventContext";
import { BusinessEventProvider } from "./context/BusinessEventContex";
import Home from "./screens/Home";
import Event from "./screens/Event";
import Profile from "./screens/Profile";
import MyEventsScreen from "./screens/MyEvents";
import Events from "./screens/Events";
import Err404 from "./components/Err404";
import Create from "./screens/Create";
import UpdateUser from "./screens/UpdateUser";
import Configuration from "./screens/Configuration";
import ChangePass from "./screens/ChangePass";
import HomeBusiness from "./screens/Business/HomeBusiness";
import UpdateBusiness from "./screens/Business/UpdateBusiness";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <main className="content">
        {/* User ROUTES */}
        <UserAuthProvider>
          <UserEventsProvider>
            <BusinessEventProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<Create />} />

                {/* User */}

                <Route path="/home" element={<Home />} />
                <Route path="/event/:eventId" element={<Event />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<UpdateUser />} />
                <Route
                  path="/profile/edit/business"
                  element={<UpdateBusiness />}
                />
                <Route path="/Events" element={<Events />} />
                <Route path="/MyEvents" element={<MyEventsScreen />} />
                <Route path="/Config" element={<Configuration />} />
                <Route path="/ChangePass" element={<ChangePass />} />

                {/* Business */}
                <Route path="/home/business" element={<HomeBusiness />} />

                <Route path="*" element={<Err404 />} />
                <Route path="/404" element={<Err404 />} />
              </Routes>
            </BusinessEventProvider>
          </UserEventsProvider>
        </UserAuthProvider>
        <Footer />
      </main>
    </div>
  );
}

export default App;
