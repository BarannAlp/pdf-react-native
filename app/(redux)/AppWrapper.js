import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logoutAction } from "../(redux)/authSlice";
import { Stack } from "expo-router/stack";
import { loadUser } from "./authSlice";
import { Button } from "react-native";
import { useRouter } from "expo-router";

function AppWrapper() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/");
  };
  return (
      <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#6200ea', // Set your header background color
        },
        headerRight: ({  }) => {
          // Conditionally render the button based on the route
          if (user !== null) { // Check if the current screen is not "index"
            return (
              <Button
                onPress={handleLogout} // Replace with your navigation action
                title="Çıkış"
                color="black" // Set button color
              />
            );
          }
          return null; // Return null to not render anything for the "index" screen
        },
      }}
    >
     <Stack.Screen name="index" options={{ title: 'Giriş',headerBackVisible:false }} />
     <Stack.Screen name="(tabs)" options={{ title: 'Yurt Çimento',headerBackVisible:false }}  />
     
      </Stack>
  );
}

export default AppWrapper;
