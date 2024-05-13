import React, { useEffect } from "react";
import { useUserAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    const { user, isAuth, loading } = useUserAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        navigate("/");
    }
    if (user.rol !== undefined && user.rol == "business") {
        navigate("/home/business");
    }
    return (
        <div>
            <Navbar user={user} isAuth={isAuth} />
            <div>Home</div>
        </div>
    );
};

export default Home;
