import React from "react";
import { View, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import { WebView } from 'react-native-webview';

export default function Bildirimler() {
  const router = useRouter();



  return (
      <View style={styles.container}>
    <WebView 
                source={{ uri: "https://eflow.csglobal.com.tr/Upload/WebAPI/BildirimFormuYurtcim.html"}}
                style={styles.webview}
            />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});