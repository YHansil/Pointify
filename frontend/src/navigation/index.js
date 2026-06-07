import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

import SplashScreen from '../screens/auth/SplashScreen';
import ChoixProfilScreen from '../screens/auth/ChoixProfilScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterEtudiantScreen from '../screens/auth/RegisterEtudiantScreen';
import RegisterCommercantScreen from '../screens/auth/RegisterCommercantScreen';

import EtudiantNavigator from './EtudiantNavigator';
import CommercantNavigator from './CommercantNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { token, profil, loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
        {!token ? (
          // Auth stack
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="ChoixProfil" component={ChoixProfilScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RegisterEtudiant" component={RegisterEtudiantScreen} />
            <Stack.Screen name="RegisterCommercant" component={RegisterCommercantScreen} />
          </>
        ) : profil === 'etudiant' ? (
          <Stack.Screen name="EtudiantTabs" component={EtudiantNavigator} />
        ) : (
          <Stack.Screen name="CommercantTabs" component={CommercantNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
