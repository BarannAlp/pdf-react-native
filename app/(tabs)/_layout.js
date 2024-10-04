import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false, // Make sure the header is hidden
          title: "Talimatlar",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="file" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bildirimler"
        options={{
          headerShown: false, // Make sure the header is hidden
          title: "Bildirimler",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list-ul" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
