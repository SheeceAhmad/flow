import InitialLayout from '@/components/InitialLayout';
import ClerkAndConvexProvider from '@/Providers/ClerkAndConvexProvider';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{flex:1, backgroundColor:"black"}}>
            {/* <Stack screenOptions={{headerShown: false}}/> working fine just the route after tabs not confirm 
            looked at sitemap */}
            <InitialLayout/>
          </SafeAreaView>
        </SafeAreaProvider>
    </ClerkAndConvexProvider>
    );
}
