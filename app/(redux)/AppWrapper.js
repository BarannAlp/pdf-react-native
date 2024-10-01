import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Stack } from "expo-router/stack";
import { loadUser } from "./authSlice";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack
    screenOptions={{
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'white'
      },
    }}
   >

     
    </Stack>
  );
}

export default AppWrapper;
