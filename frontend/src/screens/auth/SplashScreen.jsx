import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { colors, fonts } from '../../theme';

export default function SplashScreen({ navigation }) {
  const { token, profil, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      if (token && profil === 'etudiant') {
        navigation.replace('EtudiantTabs');
      } else if (token && profil === 'commercant') {
        navigation.replace('CommercantTabs');
      } else {
        navigation.replace('ChoixProfil');
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [loading, token, profil]);

  return (
    <LinearGradient
      colors={[colors.violetDeep, colors.violet, '#2A1F8A']}
      start={{ x: 0.7, y: 0.1 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Déco orbitale */}
      <View style={styles.orbit1} />
      <View style={styles.orbit2} />
      <View style={styles.glow} />

      {/* Logo */}
      <View style={styles.center}>
        <View style={styles.logoBox}>
          <Text style={styles.logoMark}>P</Text>
        </View>
        <Text style={styles.title}>
          Pointify<Text style={{ color: colors.lime }}>.</Text>
        </Text>
        <Text style={styles.subtitle}>LA FIDÉLITÉ, SUR TON CAMPUS</Text>
      </View>

      {/* Dots de chargement */}
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[styles.dot, i === 1 && { backgroundColor: colors.lime }]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  orbit1: {
    position: 'absolute', top: -120, left: -80,
    width: 360, height: 360, borderRadius: 180,
    borderWidth: 1.5, borderColor: 'rgba(197,248,74,0.35)',
  },
  orbit2: {
    position: 'absolute', top: -40, left: 40,
    width: 280, height: 280, borderRadius: 140,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
  },
  glow: {
    position: 'absolute', bottom: 60, right: -80,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(197,248,74,0.12)',
  },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22,
  },
  logoBox: {
    width: 108, height: 108, borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.4, shadowRadius: 30, elevation: 20,
    transform: [{ rotate: '-6deg' }],
  },
  logoMark: {
    fontFamily: fonts.display, fontWeight: '800',
    fontSize: 60, color: colors.violet, letterSpacing: -2,
  },
  title: {
    fontFamily: fonts.display, fontWeight: '700',
    fontSize: 44, color: '#fff', letterSpacing: -1.4,
  },
  subtitle: {
    fontFamily: fonts.body, fontSize: 14, fontWeight: '500',
    color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4,
  },
  dots: {
    flexDirection: 'row', justifyContent: 'center', gap: 8,
    marginBottom: 80,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
