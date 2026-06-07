import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

import DashboardEtudiantScreen from '../screens/etudiant/DashboardEtudiantScreen';
import ScanScreen from '../screens/etudiant/ScanScreen';
import RecompensesScreen from '../screens/etudiant/RecompensesScreen';
import HistoriqueScreen from '../screens/etudiant/HistoriqueScreen';
import ProfilEtudiantScreen from '../screens/etudiant/ProfilEtudiantScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardEtudiantScreen} />
      <Stack.Screen name="Historique" component={HistoriqueScreen} />
      <Stack.Screen name="Recompenses" component={RecompensesScreen} />
    </Stack.Navigator>
  );
}

export default function EtudiantNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: colors.line,
          borderTopWidth: 1,
          paddingBottom: 8,
          height: 72,
        },
        tabBarActiveTintColor: colors.violet,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: -0.1,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: 'home-outline',
            Scan: 'scan-outline',
            Recompenses: 'gift-outline',
            Profil: 'person-outline',
          };
          return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarLabel: 'Scanner' }} />
      <Tab.Screen name="Recompenses" component={RecompensesScreen} options={{ tabBarLabel: 'Récompenses' }} />
      <Tab.Screen name="Profil" component={ProfilEtudiantScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
}
