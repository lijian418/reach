import React, { useState } from 'react';
import {api} from "../api";
import useAsyncEffect from "use-async-effect";

export function useUser() {
  const [user, setUser] = useState();

  useAsyncEffect(async () => {
    await fetchUser()
  }, [])

  const fetchUser = async () => {
    const usernameLocal = localStorage.getItem('username')
    if (usernameLocal) {
      const { data } = await api.user.getByUsername(usernameLocal)
      setUser(data)
    }
  }

  return {user, fetchUser};
}
