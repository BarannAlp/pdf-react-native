import React from "react";
import { View, StyleSheet} from "react-native";
import { WebView } from 'react-native-webview';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";


export default function PdfFileView() {
  const params = useLocalSearchParams();
  console.log(params)
  const pdfUrl = `http://pdf-node-seven.vercel.app/api/pdfDetails/files/${params.pdf}`;
  const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
  
  return (
      <View style={styles.container}>
        <WebView 
                source={{ uri: googleViewerUrl}}
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