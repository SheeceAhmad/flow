import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/auth.styles'
import { useSSO } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function SignUpScreen() {
  const {startSSOFlow} = useSSO();
  const router = useRouter();
  
  const handleGoogleSignin = async () => {
    try {
      const {createdSessionId, setActive} = await startSSOFlow({strategy:"oauth_google"});

      if(setActive && createdSessionId){
        await setActive({ session: createdSessionId});
        console.log("After setActive — isSignedIn:");
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Oauth error:", error);
    }
  }

  return (
      // {BRAND INFO}
  <View style={styles.container}>

      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name='leaf' size={45} color={COLORS.primary}/>
        </View>
        <Text style={styles.appName}>spotlight</Text>
        <Text style={styles.tagline}>Stay Updated, Stay Conected</Text>
      </View>

      {/* {ILLUSTRATION} */}
      <View style={styles.illustrationContainer}>
        <Image
        source={require("../../assets/images/auth-img1.png")}
        style={styles.illustration}
        resizeMode='cover'
        />
      </View>

    {/* {LOGIN GOOGLE} */}

    <View style={styles.loginSection}>
      <TouchableOpacity
      style={styles.googleButton}
      onPress={handleGoogleSignin}
      activeOpacity={0.9}
      >
        <View style={{flexDirection:'row'}}>
          <Ionicons name='logo-google' size={24} color={COLORS.surface} style={styles.googleIconContainer}/>
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </View>

      </TouchableOpacity>

      <Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
    </View>
  </View>
  )
}
