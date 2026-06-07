import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

import DashboardCommercantScreen from '../screens/commercant/DashboardCommercantScreen';
import GenererQRScreen from '../screens/commercant/GenererQRScreen';
import StatsScreen from '../screens/commercant/StatsScreen';
import ProfilCommercantScreen from '../screens/commercant/ProfilCommercantScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardCommercantScreen} />
      <Stack.Screen name="GenererQR" component={GenererQRScreen} />
    </Stack.Navigator>
  );
}

export default function CommercantNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopWidth: 0,
          paddingBottom: 8,
          height: 72,
        },
        tabBarActiveTintColor: colors.lime,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.45)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: -0.1,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: 'home-outline',
            GenererQR: 'qr-code-outline',
            Stats: 'bar-chart-outline',
            Boutique: 'storefront-outline',
          };
          return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="GenererQR" component={GenererQRScreen} options={{ tabBarLabel: 'QR Code' }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ tabBarLabel: 'Stats' }} />
      <Tab.Screen name="Boutique" component={ProfilCommercantScreen} options={{ tabBarLabel: 'Boutique' }} />
    </Tab.Navigator>
  );
}
