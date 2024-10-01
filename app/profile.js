import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "expo-router";
import { logoutAction } from "./(redux)/authSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import { WebView } from 'react-native-webview';

export default function Bildirimler() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/");
  };

  return (
      <View style={styles.container}>
      <WebView
      source={{ uri: 'https://eflow.csglobal.com.tr/Upload/WebAPI/BildirimFormuYurtcim.html' }}
      style={{ flex: 1 }}
    />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
