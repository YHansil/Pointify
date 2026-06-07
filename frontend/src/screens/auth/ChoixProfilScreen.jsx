import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts, radii, spacing } from '../../theme';

function ChoiceCard({ role, icon, hint, bg, fg, accent, border, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={[
      styles.card, { backgroundColor: bg },
      border && { borderWidth: 1.5, borderColor: colors.line },
      !border && { shadowColor: bg, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.34, shadowRadius: 20, elevation: 8 },
    ]}>
      <View style={[styles.cardIcon, { backgroundColor: accent }]}>
        <Text style={{ fontSize: 28 }}>{icon}</Text>
      </View>
      <View style={styles.cardText}>
        <Text style={[styles.cardTitle, { color: fg }]}>Je suis {role}</Text>
        <Text style={[styles.cardHint, { color: fg === '#fff' ? 'rgba(255,255,255,0.7)' : colors.inkMuted }]}>{hint}</Text>
      </View>
      <Text style={[styles.chevron, { color: fg }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function ChoixProfilScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <Text style={styles.logoMark}>P</Text>
        <Text style={styles.wordmark}>Pointify<Text style={{ color: colors.violet }}>.</Text></Text>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Bienvenue sur{'\n'}
          <Text style={{ color: colors.violet }}>le campus</Text>.
        </Text>
        <Text style={styles.heroSub}>
          Cumule des points dans tes commerces préférés et échange-les contre des récompenses.
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      {/* Cartes de choix */}
      <View style={styles.choices}>
        <ChoiceCard
          role="Étudiant"
          icon="🎓"
          hint="Cumule, scanne, gagne"
          bg={colors.violet}
          fg="#fff"
          accent={colors.lime}
          onPress={() => navigation.navigate('Login', { profil: 'etudiant' })}
        />
        <ChoiceCard
          role="Commerçant"
          icon="🏪"
          hint="Fidélise tes clients"
          bg="#fff"
          fg={colors.ink}
          accent={colors.violet}
          border
          onPress={() => navigation.navigate('Login', { profil: 'commercant' })}
        />
      </View>

      <Text style={styles.cgu}>
        En continuant, tu acceptes nos <Text style={{ color: colors.ink, fontWeight: '600' }}>CGU</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: spacing.lg },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 },
  logoMark: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: colors.violet,
    color: '#fff', textAlign: 'center', lineHeight: 32,
    fontWeight: '800', fontSize: 18,
    overflow: 'hidden',
  },
  wordmark: {
    fontFamily: fonts.display, fontWeight: '700', fontSize: 20,
    color: colors.ink, letterSpacing: -0.6,
  },
  hero: { marginTop: 48 },
  heroTitle: {
    fontFamily: fonts.display, fontWeight: '700',
    fontSize: 38, color: colors.ink, letterSpacing: -1.4, lineHeight: 44,
  },
  heroSub: {
    marginTop: 12, fontFamily: fonts.body, fontSize: 15,
    color: colors.inkSoft, lineHeight: 22,
  },
  choices: { gap: 14, marginBottom: 24 },
  card: {
    borderRadius: radii.xl, padding: 22,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    overflow: 'hidden',
  },
  cardIcon: {
    width: 54, height: 54, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontFamily: fonts.display, fontSize: 22,
    fontWeight: '700', letterSpacing: -0.7,
  },
  cardHint: {
    fontFamily: fonts.body, fontSize: 13,
    fontWeight: '500', marginTop: 2,
  },
  chevron: { fontSize: 24, fontWeight: '300' },
  cgu: {
    textAlign: 'center', fontFamily: fonts.body,
    fontSize: 13, color: colors.inkMuted, marginBottom: 30,
  },
});
