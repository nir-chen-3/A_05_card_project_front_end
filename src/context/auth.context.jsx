import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/usersService";

export const authContext = createContext();
authContext.displayName = "Auth"; // how will the components plugin will show it

export function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser());
  const refreshUser = () => setUser(userService.getUser());

  const [me_info, setMe_info] = useState(null);

  const refreshMeInfo = async () => {
    if (user) {
      const data = await userService.getMe();
      setMe_info(data);
      return data;
    } else {
      setMe_info(null);
    }
  };

  useEffect(() => {
    refreshMeInfo();
  }, [user]);

  const login = async (credentials) => {
    const response = await userService.login(credentials);

    await refreshMeInfo();
    refreshUser();
    return response;
  };
  const logout = async () => {
    userService.logout();
    await setMe_info(null);
    refreshUser();
  };

  const getAllUsers = async () => {
    if (user.isAdmin) {
      const allUsers = await userService.getAllUsers();
      return allUsers;
    }
  };
  return (
    <authContext.Provider
      value={{
        user,
        me_info,
        refreshMeInfo,
        login,
        logout,
        getAllUsers,
        createUser: userService.createUser,
        getMe: userService.getMe,
        deleteUser: userService.deleteUser,
        updateUser: userService.updateUser,
        patchUserBusinessStatus: userService.patchUserBusinessStatus,
        getUserById: userService.getUserById,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
