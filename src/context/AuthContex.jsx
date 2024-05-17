import { createContext, useContext, useEffect, useState } from "react";
import { CreateRequest, LoginRequest } from "../api/user/user";
import {
  CreateBusinessRequest,
  LoginBusinessRequest,
} from "../api/Business/business";
import { CheckLogin, LogOut } from "../api/auth/auth";
import Cookies from "universal-cookie";

export const UserAuthContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

const cookies = new Cookies();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ValidateToken() {
      let token = cookies.get("token");
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return setUser("");
      }
      try {
        let data = {
          token: token,
        };
        const res = await CheckLogin(data);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return setUser("");
        }
        setUser(res.data);
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setLoading(false);
        return setUser("");
      }
    }
    ValidateToken();
  }, []);

  useEffect(() => {
    if (error != false) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const signUp = async (user) => {
    try {
      const res = await LoginRequest(user);
      setUser(res.data);
      setIsAuth(true);
      cookies.set("token", res.data.token);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const signUpBusiness = async (user) => {
    try {
      const res = await LoginBusinessRequest(user);
      setUser(res.data);
      setIsAuth(true);
      cookies.set("token", res.data.token);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const Create = async (data) => {
    try {
      const res = await CreateRequest(data);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const CreateBusiness = async (data) => {
    try {
      const res = await CreateBusinessRequest(data);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const LogOutController = async () => {
    try {
      const res = await LogOut();
      if (res.status === 200) {
        cookies.remove("token");
        setUser("");
        setIsAuth(false);
        setLoading(false);
      }
      return res.status;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  };
  return (
    <UserAuthContext.Provider
      value={{
        error,
        user,
        isAuth,
        loading,
        signUp,
        signUpBusiness,
        LogOutController,
        Create,
        CreateBusiness,
      }}
    >
      {" "}
      {children}
    </UserAuthContext.Provider>
  );
};
