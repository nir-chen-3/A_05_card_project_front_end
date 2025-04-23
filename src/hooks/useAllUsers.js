import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";

function useAllUsers(refreshKey = 0) {
  const { user, me_info, getAllUsers } = useAuth();

  const [users, setUsers] = useState(null);
  // const [check, setCheck] = useState(0);

  useEffect(() => {
    if (!user?.isAdmin) {
      // setCheck(1);
      return;
    }
    async function getUsers() {
      const users = await getAllUsers();
      setUsers(users);
      // setCheck(3);
    }
    if (user.isAdmin) {
      getUsers();
    }
  }, [refreshKey]);
  return users;
}

export default useAllUsers;
