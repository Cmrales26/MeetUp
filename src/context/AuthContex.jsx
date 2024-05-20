import { createContext, useContext, useEffect, useState } from "react";
import {
  ChangePasswordRequest,
  CreateRequest,
  LoginRequest,
  UpdateRequest,
} from "../api/user/user";
import {
  ChangeBPasswordRequest,
  CreateBusinessRequest,
  LoginBusinessRequest,
  UpdateBusinessRequest,
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

  let token = cookies.get("token");

  useEffect(() => {
    async function ValidateToken() {
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        cookies.remove("token", { path: "/" });
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
          cookies.remove("token", { path: "/" });
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
  }, [token]);

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
      cookies.remove("token");
      cookies.set("token", res.data.token, { path: "/" });
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
      cookies.remove("token");
      cookies.set("token", res.data.token, { path: "/" });
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

  const UpdateUser = async (data, UserId) => {
    try {
      const res = await UpdateRequest(data, UserId);
      cookies.remove("token");
      cookies.set("token", res.data.token, { path: "/" });
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const updateBusiness = async (data, BusinessId) => {
    try {
      const res = await UpdateBusinessRequest(BusinessId, data);
      cookies.remove("token");
      cookies.set("token", res.data.token, { path: "/" });
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const ChangeUserPass = async (data) => {
    try {
      const res = await ChangePasswordRequest(data);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const ChangeBusinessPass = async (data) => {
    try {
      const res = await ChangeBPasswordRequest(data);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      return error.response.data.message;
    }
  };

  const LogOutController = async () => {
    try {
      const res = await LogOut();
      if (res.status === 200) {
        cookies.remove("token", { path: "/" });
        setUser("");
        setIsAuth(false);
        setLoading(false);
        cookies.remove("token");
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
        UpdateUser,
        ChangeUserPass,
        updateBusiness,
        ChangeBusinessPass,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
