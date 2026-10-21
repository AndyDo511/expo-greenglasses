import { Tabs, useRouter } from "expo-router";
import {
  BookSquare,
  DocumentText,
  Home2,
  Profile,
  Scan,
} from "iconsax-react-nativejs";
import React from "react";
import { View } from "react-native";
import IconFoodActive from "@/assets/images/tabIcons/IconFoodActive";
import IconFood from "@/assets/images/tabIcons/IconFood";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#81FE56", // primary.main
        tabBarInactiveTintColor: "#637381", // grey.500
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginLeft: 52,
          marginRight: 52,
          height: 76,
          borderRadius: 999,
          backgroundColor: '#1F2937',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
        },
        tabBarItemStyle: {
          alignSelf: 'center',
          marginTop: 20
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Home2
              size={24}
              color={color}
              variant="Linear"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => ( !focused ?
            <IconFood /> : <IconFoodActive />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/scanner");
          },
        }}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View
              className="h-16 w-16 items-center justify-center rounded-full bg-primary-main"
              style={{
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              <Scan size={28} color="#212B36" variant="Linear" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <BookSquare
              size={24}
              color={color}
              variant="Linear"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Profile
              size={24}
              color={color}
              variant="Linear"
            />
          ),
        }}
      />
    </Tabs>
  );
}
