import { Stack } from "expo-router";
import "../../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import AuthSync from "@/components/AuthSync";
import { StatusBar } from "expo-status-bar";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <AuthSync />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0D0D0F" },
          }}
        >
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="new-chat"
            options={{
              animation: "slide_from_bottom",
              presentation: "modal",
              gestureEnabled: true,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
