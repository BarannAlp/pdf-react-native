import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from "expo-router";

export default function PdfFileView() {
  const params = useLocalSearchParams();
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${params.pdfUrl}`;

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: googleDocsUrl }}  // Use Google Docs Viewer
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
