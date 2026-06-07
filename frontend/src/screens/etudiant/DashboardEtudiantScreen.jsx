import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getMe, getTransactions } from '../../api/etudiant.api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors, fonts, radii, spacing } from '../../theme';

function TransactionRow({ item, last }) {
  const positive = item.points_gagnes > 0;
  const emoji = '🏪';
  return (
    <View style={[styles.txRow, !last && { borderBottomWidth: 1, borderBottomColor: colors.line }]}>
      <View style={[styles.txAvatar, { backgroundColor: colors.violetDeep }]}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.txName}>{item.nom_commerce}</Text>
        <Text style={styles.txWhen}>{new Date(item.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.txAmount, { color: positive ? colors.violet : colors.ink }]}>
          {positive ? '+' : '−'}{Math.abs(item.points_gagnes)} pts
        </Text>
        <Text style={styles.txSub}>{parseFloat(item.montant).toFixed(2)} €</Text>
      </View>
    </View>
  );
}

export default function DashboardEtudiantScreen({ navigation }) {
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [meRes, txRes] = await Promise.all([getMe(), getTransactions()]);
      updateUser(meRes.data.etudiant);
      setTransactions(txRes.data.transactions.slice(0, 5));
    } catch (_) {}
  }, []);

  useEffect(() => {
    fetchData().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const points = user?.points_total ?? 0;
  const nextGoal = 1500;
  const progress = Math.min(points / nextGoal, 1);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.violet} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Top row */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>Salut</Text>
            <Text style={styles.name}>{user?.prenom ?? ''} 👋</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Points card */}
        <View style={styles.cardWrap}>
          <LinearGradient
            colors={[colors.violet, colors.violetDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pointsCard}
          >
            <View style={styles.orbit} />
            <Text style={styles.pointsLabel}>Tes points</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <Text style={styles.pointsValue}>{points.toLocaleString('fr-FR')}</Text>
              <View style={styles.pBadge}><Text style={styles.pBadgeText}>P</Text></View>
            </View>

            {/* Progress */}
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Prochaine récompense</Text>
              <Text style={styles.progressValue}>
                <Text style={{ color: colors.lime, fontWeight: '700' }}>{nextGoal - points}</Text> / {nextGoal}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </LinearGradient>

          {/* Quick actions */}
          <View style={styles.quickRow}>
            {[
              { label: 'Scanner', emoji: '📷', screen: 'Scan' },
              { label: 'Récompenses', emoji: '🎁', screen: 'Recompenses' },
              { label: 'Historique', emoji: '📋', screen: 'Historique' },
            ].map((a) => (
              <TouchableOpacity
                key={a.label}
                style={styles.quickAction}
                onPress={() => navigation.navigate(a.screen)}
              >
                <Text style={{ fontSize: 20 }}>{a.emoji}</Text>
                <Text style={styles.quickLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Transactions récentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Historique')}>
              <Text style={styles.sectionLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Aucune transaction pour l'instant</Text>
              <Text style={styles.emptySub}>Scanne un QR code pour gagner tes premiers points !</Text>
            </View>
          ) : (
            <View style={styles.txCard}>
              {transactions.map((t, i) => (
                <TransactionRow key={t.id} item={t} last={i === transactions.length - 1} />
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  topRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg, paddingBottom: 0,
  },
  greeting: { fontFamily: fonts.body, fontSize: 13, color: colors.inkMuted },
  name: { fontFamily: fonts.display, fontSize: 22, fontWeight: '700', color: colors.ink, letterSpacing: -0.7 },
  bellBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
  cardWrap: { paddingHorizontal: spacing.lg, marginTop: 18 },
  pointsCard: {
    borderRadius: radii.xxl, padding: 22, overflow: 'hidden',
  },
  orbit: {
    position: 'absolute', top: -40, right: -30,
    width: 180, height: 180, borderRadius: 90,
    borderWidth: 1.5, borderColor: 'rgba(197,248,74,0.25)',
  },
  pointsLabel: {
    fontFamily: fonts.body, fontSize: 13, fontWeight: '600',
    color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4, textTransform: 'uppercase',
  },
  pointsValue: {
    fontFamily: fonts.display, fontSize: 64, fontWeight: '700',
    letterSpacing: -3, lineHeight: 68, color: '#fff',
  },
  pBadge: {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center',
  },
  pBadgeText: { color: colors.ink, fontFamily: fonts.display, fontWeight: '700', fontSize: 16 },
  progressRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 18, marginBottom: 8,
  },
  progressLabel: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  progressValue: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  progressBar: {
    height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 4, backgroundColor: colors.lime },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  quickAction: {
    flex: 1, height: 64, borderRadius: radii.lg,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  quickLabel: { fontFamily: fonts.body, fontSize: 11, fontWeight: '600', color: colors.ink },
  section: { paddingHorizontal: spacing.lg, marginTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 18, fontWeight: '700', color: colors.ink, letterSpacing: -0.5 },
  sectionLink: { fontFamily: fonts.body, fontSize: 13, fontWeight: '600', color: colors.violet },
  txCard: {
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line,
  },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  txAvatar: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: colors.ink },
  txWhen: { fontFamily: fonts.body, fontSize: 12, color: colors.inkMuted, marginTop: 1 },
  txAmount: { fontFamily: fonts.display, fontSize: 14, fontWeight: '700' },
  txSub: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted },
  emptyBox: {
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line,
    padding: 28, alignItems: 'center', gap: 6,
  },
  emptyText: { fontFamily: fonts.display, fontSize: 16, fontWeight: '700', color: colors.ink },
  emptySub: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, textAlign: 'center' },
});
