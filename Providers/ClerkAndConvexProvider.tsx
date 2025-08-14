import { tokenCache } from "@/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { useAuth } from "@clerk/clerk-react";

const convex = new ConvexReactClient(process.env.EXPO_PBLIC_CONVEX_URL!,{
    unsavedChangesWarning: false,
})

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if(!publishableKey){
  throw new Error("Missing Key");
}

export default function ClerkAndConvexProvider({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}