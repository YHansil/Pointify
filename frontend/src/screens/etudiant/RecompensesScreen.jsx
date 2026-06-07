import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, RefreshControl, Alert,
} from 'react-native';
import { getRecompenses, reclamerRecompense } from '../../api/etudiant.api';
import { useAuth } from '../../context/AuthContext';
import PointsBadge from '../../components/PointsBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors, fonts, radii, spacing } from '../../theme';

const EMOJIS = ['🎁', '☕', '🍕', '🥐', '🥗', '🍔', '🥞', '🎀', '🧃'];

function RewardCard({ item, userPoints, onClaim }) {
  const canRedeem = userPoints >= item.points_requis;
  const emoji = EMOJIS[item.id % EMOJIS.length];

  return (
    <View style={[styles.rewardCard, !canRedeem && { opacity: 0.65 }]}>
      <View style={[styles.rewardImg, { backgroundColor: canRedeem ? colors.violetTint : '#F4F2EC' }]}>
        <Text style={{ fontSize: 36 }}>{emoji}</Text>
        {!canRedeem && (
          <View style={styles.lockBadge}><Text style={{ fontSize: 12 }}>🔒</Text></View>
        )}
      </View>
      <Text style={styles.rewardName} numberOfLines={2}>{item.nom}</Text>
      <Text style={styles.rewardShop} numberOfLines={1}>{item.nom_commerce}</Text>
      <View style={styles.rewardBottom}>
        <Text style={[styles.rewardPts, { color: canRedeem ? colors.violet : colors.inkMuted }]}>
          {item.points_requis} pts
        </Text>
        <TouchableOpacity
          style={[styles.redeemBtn, { backgroundColor: canRedeem ? colors.violet : colors.line }]}
          onPress={() => canRedeem && onClaim(item)}
          disabled={!canRedeem}
        >
          <Text style={[styles.redeemText, { color: canRedeem ? '#fff' : colors.inkMuted }]}>
            {canRedeem ? 'Échanger' : 'Bientôt'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RecompensesScreen() {
  const { user, updateUser } = useAuth();
  const [recompenses, setRecompenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getRecompenses();
      setRecompenses(res.data.recompenses);
    } catch (_) {}
  };

  useEffect(() => { fetchData().finally(() => setLoading(false)); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchData(); setRefreshing(false); };

  const handleClaim = (item) => {
    Alert.alert(
      'Échanger ma récompense',
      `${item.nom}\n${item.points_requis} points seront déduits.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: async () => {
            try {
              const res = await reclamerRecompense(item.id);
              updateUser({ ...user, points_total: res.data.points_restants });
              Alert.alert('Récompense obtenue !', `Présente-toi au comptoir pour récupérer "${item.nom}".`);
            } catch (err) {
              Alert.alert('Erreur', err.response?.data?.error ?? 'Impossible de réclamer');
            }
          },
        },
      ]
    );
  };

  const userPoints = user?.points_total ?? 0;

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.violet} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Récompenses</Text>
            <Text style={styles.sub}>Échange tes points contre des cadeaux</Text>
          </View>
          <PointsBadge points={userPoints} />
        </View>

        {/* Grille */}
        {recompenses.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎁</Text>
            <Text style={styles.emptyTitle}>Aucune récompense</Text>
            <Text style={styles.emptySub}>Les commerçants n'ont pas encore ajouté de récompenses.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {recompenses.map((r) => (
              <RewardCard
                key={r.id}
                item={r}
                userPoints={userPoints}
                onClaim={handleClaim}
              />
            ))}
          </View>
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: spacing.lg, paddingBottom: 0,
  },
  title: { fontFamily: fonts.display, fontSize: 28, fontWeight: '700', color: colors.ink, letterSpacing: -1 },
  sub: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, marginTop: 4 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: 12, marginTop: 18,
  },
  rewardCard: {
    width: '47%', backgroundColor: '#fff',
    borderRadius: radii.xl, borderWidth: 1, borderColor: colors.line,
    padding: 12,
  },
  rewardImg: {
    height: 88, borderRadius: radii.md,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(22,22,43,0.85)',
    borderRadius: radii.full, padding: 4,
  },
  rewardName: {
    fontFamily: fonts.display, fontSize: 14,
    fontWeight: '700', color: colors.ink, letterSpacing: -0.3,
    marginTop: 10, lineHeight: 18,
  },
  rewardShop: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted, marginTop: 2 },
  rewardBottom: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 10,
  },
  rewardPts: { fontFamily: fonts.display, fontSize: 14, fontWeight: '700' },
  redeemBtn: { borderRadius: radii.sm, paddingVertical: 6, paddingHorizontal: 10 },
  redeemText: { fontFamily: fonts.body, fontWeight: '700', fontSize: 11 },
  empty: {
    margin: spacing.lg, padding: 40,
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line,
    alignItems: 'center', gap: 8,
  },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 18, fontWeight: '700', color: colors.ink },
  emptySub: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, textAlign: 'center' },
});
