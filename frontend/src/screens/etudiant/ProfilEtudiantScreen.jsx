import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { deleteAccount } from '../../api/etudiant.api';
import { colors, fonts, radii, spacing } from '../../theme';

function SettingRow({ icon, label, hint, danger, last, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.settingRow, !last && { borderBottomWidth: 1, borderBottomColor: colors.line }]}
    >
      <View style={[styles.settingIcon, danger && { backgroundColor: '#FFEBEB' }]}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <Text style={[styles.settingLabel, danger && { color: colors.error }]}>{label}</Text>
      {hint && <Text style={styles.settingHint}>{hint}</Text>}
      <Text style={[styles.chevron, danger && { color: colors.error }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProfilEtudiantScreen() {
  const { user, logout } = useAuth();

  const initials = `${user?.prenom?.[0] ?? ''}${user?.nom?.[0] ?? ''}`.toUpperCase();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer mon compte',
      'Cette action est irréversible. Tous tes points seront perdus.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              await logout();
            } catch (_) {
              Alert.alert('Erreur', 'Impossible de supprimer le compte.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mon profil</Text>
        </View>

        {/* Identity card */}
        <View style={styles.idCard}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.fullName}>{user?.prenom} {user?.nom}</Text>
            <Text style={styles.email} numberOfLines={1}>{user?.email}</Text>
            <View style={styles.chips}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>🎓 Étudiant</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.lime }]}>
              {user?.points_total?.toLocaleString('fr-FR') ?? '0'}
            </Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statSep} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
          <View style={styles.statSep} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Récomp.</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Paramètres</Text>
          <View style={styles.settingsCard}>
            <SettingRow icon="🔔" label="Notifications" hint="Activées" />
            <SettingRow icon="🔒" label="Confidentialité" />
            <SettingRow icon="💬" label="Aide et support" />
            <SettingRow
              icon="↪️"
              label="Se déconnecter"
              danger
              onPress={() =>
                Alert.alert('Déconnexion', 'Tu vas être déconnecté.', [
                  { text: 'Annuler', style: 'cancel' },
                  { text: 'Se déconnecter', onPress: logout },
                ])
              }
            />
            <SettingRow
              icon="🗑️"
              label="Supprimer mon compte"
              danger
              last
              onPress={handleDeleteAccount}
            />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, paddingBottom: 0,
  },
  title: { fontFamily: fonts.display, fontSize: 22, fontWeight: '700', color: colors.ink, letterSpacing: -0.7 },
  idCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    margin: spacing.lg, marginTop: 18,
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line, padding: 18,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center',
  },
  initials: {
    fontFamily: fonts.display, fontWeight: '700',
    fontSize: 24, color: '#fff', letterSpacing: -0.8,
  },
  fullName: { fontFamily: fonts.display, fontSize: 20, fontWeight: '700', color: colors.ink, letterSpacing: -0.5 },
  email: { fontFamily: fonts.body, fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  chips: { flexDirection: 'row', gap: 6, marginTop: 8 },
  chip: {
    paddingHorizontal: 10, paddingVertical: 4,
    backgroundColor: colors.violetTint, borderRadius: radii.full,
  },
  chipText: { fontFamily: fonts.body, fontSize: 11, fontWeight: '600', color: colors.violet },
  statsCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: spacing.lg,
    backgroundColor: colors.ink, borderRadius: radii.xl,
    paddingVertical: 16, paddingHorizontal: 18,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: fonts.display, fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: -0.6 },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  statSep: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.12)' },
  section: { marginTop: 22, paddingHorizontal: spacing.lg },
  sectionLabel: {
    fontFamily: fonts.body, fontSize: 12, fontWeight: '700',
    color: colors.inkMuted, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10,
  },
  settingsCard: {
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line, overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
  },
  settingIcon: {
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontFamily: fonts.body, fontSize: 15, fontWeight: '600', color: colors.ink },
  settingHint: { fontFamily: fonts.body, fontSize: 12, color: colors.inkMuted },
  chevron: { fontSize: 22, color: colors.inkMuted, fontWeight: '300' },
});
