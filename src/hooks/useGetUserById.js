import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useAuth } from "../context/auth.context";

function useGetUserById(id) {
  const [userById, setUserById] = useState(null);

  const { user, getUserById } = useAuth();

  useEffect(() => {
    if (!user || !id) {
      return;
    }
    async function getUser() {
      try {
        const user_info = await getUserById(id);
        setUserById(user_info);
      } catch (error) {
        console.log(error);
      }
    }
    if (user.isAdmin) {
      getUser();
    }
  }, [user, id]);
  return userById;
}

export default useGetUserById;
