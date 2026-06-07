import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, Alert, TextInput, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getRecompenses, createRecompense, deleteRecompense, deleteAccount } from '../../api/commercant.api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { colors, fonts, radii, spacing } from '../../theme';

function DarkSettingRow({ icon, label, hint, danger, last, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.settingRow, !last && styles.settingBorder]}
    >
      <View style={[styles.settingIcon, danger && styles.settingIconDanger]}>
        <Text style={{ fontSize: 14 }}>{icon}</Text>
      </View>
      <Text style={[styles.settingLabel, danger && { color: '#FF7B7B' }]}>{label}</Text>
      {hint && <Text style={styles.settingHint}>{hint}</Text>}
      <Text style={styles.settingChevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProfilCommercantScreen() {
  const { user, logout } = useAuth();
  const [recompenses, setRecompenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReward, setNewReward] = useState({ nom: '', description: '', points_requis: '' });
  const [creating, setCreating] = useState(false);

  const nomCommerce = user?.nom_commerce ?? '';
  const initials = nomCommerce.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const fetchRecompenses = async () => {
    try {
      const res = await getRecompenses();
      setRecompenses(res.data.recompenses);
    } catch (_) {}
  };

  useEffect(() => { fetchRecompenses(); }, []);

  const handleCreateReward = async () => {
    const { nom, points_requis } = newReward;
    if (!nom || !points_requis || isNaN(parseInt(points_requis))) {
      Alert.alert('Erreur', 'Nom et points requis sont obligatoires.');
      return;
    }
    setCreating(true);
    try {
      await createRecompense({ ...newReward, points_requis: parseInt(newReward.points_requis) });
      setModalVisible(false);
      setNewReward({ nom: '', description: '', points_requis: '' });
      fetchRecompenses();
    } catch (err) {
      Alert.alert('Erreur', err.response?.data?.error ?? 'Impossible de créer');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteReward = (id, name) => {
    Alert.alert('Supprimer', `Supprimer "${name}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        try { await deleteRecompense(id); fetchRecompenses(); }
        catch (_) { Alert.alert('Erreur', 'Impossible de supprimer'); }
      }},
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Supprimer le compte', 'Cette action est irréversible.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        try { await deleteAccount(); logout(); }
        catch (_) { Alert.alert('Erreur', 'Impossible de supprimer'); }
      }},
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Ma boutique</Text>
          <TouchableOpacity><Text style={styles.editLink}>Modifier</Text></TouchableOpacity>
        </View>

        {/* Hero card */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={[colors.violet, colors.violetDeep]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroOrbit} />
            <View style={styles.heroRow}>
              <View style={styles.heroLogo}>
                <Text style={{ fontSize: 32 }}>🏪</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.heroName} numberOfLines={2}>{nomCommerce}</Text>
                <Text style={styles.heroDesc} numberOfLines={1}>{user?.description ?? 'Commerce partenaire Pointify'}</Text>
              </View>
            </View>
            <View style={styles.heroBadge}>
              <View style={styles.heroDot} />
              <Text style={styles.heroBadgeText}>● Partenaire actif</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Récompenses */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>MES RÉCOMPENSES · {recompenses.length}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.addLink}>+ Ajouter</Text>
            </TouchableOpacity>
          </View>
          {recompenses.length === 0 ? (
            <TouchableOpacity style={styles.addCard} onPress={() => setModalVisible(true)}>
              <Text style={styles.addCardIcon}>+</Text>
              <Text style={styles.addCardText}>Créer ta première récompense</Text>
            </TouchableOpacity>
          ) : (
            recompenses.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.rewardRow}
                onLongPress={() => handleDeleteReward(r.id, r.nom)}
              >
                <View style={styles.rewardIcon}>
                  <Text style={{ fontSize: 20 }}>🎁</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardName} numberOfLines={1}>{r.nom}</Text>
                  <Text style={styles.rewardPts}>{r.points_requis} pts · {r.actif ? 'Active' : 'Inactive'}</Text>
                </View>
                <Text style={styles.rewardChevron}>›</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RÉGLAGES</Text>
          <View style={styles.settingsCard}>
            <DarkSettingRow icon="💬" label="Aide et support" />
            <DarkSettingRow icon="📊" label="Exporter les données" />
            <DarkSettingRow
              icon="↪️" label="Se déconnecter" danger
              onPress={() => Alert.alert('Déconnexion', 'Tu vas être déconnecté.', [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Se déconnecter', onPress: logout },
              ])}
            />
            <DarkSettingRow icon="🗑️" label="Supprimer le compte" danger last onPress={handleDeleteAccount} />
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Modal création récompense */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalScreen}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Annuler</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouvelle récompense</Text>
            <View style={{ width: 60 }} />
          </View>
          <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
            {[
              { label: 'Nom *', key: 'nom', placeholder: 'Ex: Café offert' },
              { label: 'Description', key: 'description', placeholder: 'Décris la récompense' },
              { label: 'Points requis *', key: 'points_requis', placeholder: '250', keyboard: 'numeric' },
            ].map((f) => (
              <View key={f.key} style={styles.modalField}>
                <Text style={styles.modalLabel}>{f.label}</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newReward[f.key]}
                  onChangeText={(v) => setNewReward((r) => ({ ...r, [f.key]: v }))}
                  placeholder={f.placeholder}
                  placeholderTextColor={colors.inkMuted}
                  keyboardType={f.keyboard ?? 'default'}
                />
              </View>
            ))}
            <Button onPress={handleCreateReward} loading={creating} style={{ marginTop: 24 }}>
              Créer la récompense
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, paddingBottom: 0,
  },
  title: { fontFamily: fonts.display, fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: -0.7 },
  editLink: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.lime },
  heroWrap: { padding: spacing.lg, paddingBottom: 0 },
  heroCard: { borderRadius: radii.xl, padding: 18, overflow: 'hidden' },
  heroOrbit: {
    position: 'absolute', top: -30, right: -30,
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 1.5, borderColor: 'rgba(197,248,74,0.3)',
  },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroLogo: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  heroName: { fontFamily: fonts.display, fontSize: 19, fontWeight: '700', color: '#fff', letterSpacing: -0.5, lineHeight: 22 },
  heroDesc: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  heroDot: {},
  heroBadgeText: { fontFamily: fonts.body, fontSize: 12, color: colors.lime, fontWeight: '700' },
  section: { padding: spacing.lg, paddingBottom: 0 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionLabel: {
    fontFamily: fonts.body, fontSize: 12, fontWeight: '700',
    color: 'rgba(255,255,255,0.5)', letterSpacing: 0.4, textTransform: 'uppercase',
  },
  addLink: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: colors.lime },
  addCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radii.xl,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', borderStyle: 'dashed',
    padding: 28, alignItems: 'center', gap: 8,
  },
  addCardIcon: { fontSize: 32, color: 'rgba(255,255,255,0.4)' },
  addCardText: { fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.4)' },
  rewardRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radii.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: '12px 14px', marginBottom: 8,
  },
  rewardIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center',
  },
  rewardName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: '#fff' },
  rewardPts: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  rewardChevron: { fontSize: 20, color: 'rgba(255,255,255,0.4)', fontWeight: '300' },
  settingsCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radii.xl,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', overflow: 'hidden',
  },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  settingIcon: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center',
  },
  settingIconDanger: { backgroundColor: 'rgba(255,123,123,0.15)' },
  settingLabel: { flex: 1, fontFamily: fonts.body, fontSize: 15, fontWeight: '500', color: '#fff' },
  settingHint: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  settingChevron: { fontSize: 20, color: 'rgba(255,255,255,0.4)', fontWeight: '300' },
  modalScreen: { flex: 1, backgroundColor: colors.cream },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  modalCancel: { fontFamily: fonts.body, fontSize: 17, color: colors.violet },
  modalTitle: { fontFamily: fonts.display, fontSize: 17, fontWeight: '700', color: colors.ink },
  modalBody: { padding: spacing.lg },
  modalField: { marginBottom: 16 },
  modalLabel: { fontFamily: fonts.body, fontSize: 13, fontWeight: '500', color: colors.inkSoft, marginBottom: 8 },
  modalInput: {
    height: 56, borderRadius: radii.md,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    paddingHorizontal: 18, fontFamily: fonts.body, fontSize: 16, color: colors.ink,
  },
});
