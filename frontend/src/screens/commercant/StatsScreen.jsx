import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, RefreshControl,
} from 'react-native';
import { getStats, getTransactions } from '../../api/commercant.api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors, fonts, radii, spacing } from '../../theme';

const BAR_DATA = [40, 60, 35, 70, 55, 85, 100];
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [sRes, tRes] = await Promise.all([getStats(), getTransactions()]);
      setStats(sRes.data.stats);
      setTransactions(tRes.data.transactions);
    } catch (_) {}
  };

  useEffect(() => { fetchData().finally(() => setLoading(false)); }, []);
  const onRefresh = async () => { setRefreshing(true); await fetchData(); setRefreshing(false); };

  if (loading) return <LoadingSpinner fullScreen color={colors.lime} />;

  const totalMontant = transactions.reduce((s, t) => s + parseFloat(t.montant), 0);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.lime} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Statistiques</Text>
          <Text style={styles.sub}>Vue d'ensemble de ton activité</Text>
        </View>

        {/* KPI cards */}
        <View style={styles.kpiGrid}>
          {[
            { label: "Scans aujourd'hui", value: stats?.scans_aujourd_hui ?? 0, hl: true },
            { label: 'Scans cette semaine', value: stats?.scans_cette_semaine ?? 0, hl: true },
            { label: 'Points distribués (total)', value: stats?.total_points_distribues?.toLocaleString('fr-FR') ?? 0 },
            { label: 'Chiffre d\'affaires (total)', value: `${totalMontant.toFixed(2)} €` },
          ].map((k, i) => (
            <View key={i} style={[styles.kpiCard, k.hl && styles.kpiCardHL]}>
              <Text style={styles.kpiLabel}>{k.label}</Text>
              <Text style={[styles.kpiValue, k.hl && { color: colors.lime }]}>{k.value}</Text>
            </View>
          ))}
        </View>

        {/* Mini bar chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Scans — 7 derniers jours</Text>
          <View style={styles.bars}>
            {BAR_DATA.map((h, i) => (
              <View key={i} style={styles.barCol}>
                <View style={[
                  styles.bar,
                  { height: `${h}%`, backgroundColor: i === 6 ? colors.lime : 'rgba(255,255,255,0.18)' },
                ]} />
                <Text style={[styles.barLabel, i === 6 && { color: colors.lime }]}>{DAYS[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Liste transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toutes les transactions</Text>
          {transactions.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Aucune transaction pour l'instant.</Text>
            </View>
          ) : (
            transactions.map((t, i) => {
              const initials = (t.etudiant_prenom?.[0] ?? '') + (t.etudiant_nom?.[0] ?? '');
              const colors2 = ['#FF8B5C', '#5B47E5', '#0F8A4B', '#3D2BB8'];
              return (
                <View key={t.id} style={[styles.txRow, i < transactions.length - 1 && styles.txBorder]}>
                  <View style={[styles.txAvatar, { backgroundColor: colors2[i % 4] }]}>
                    <Text style={styles.txInitials}>{initials.toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.txName}>{t.etudiant_prenom} {t.etudiant_nom?.[0]}.</Text>
                    <Text style={styles.txWhen}>
                      {new Date(t.created_at).toLocaleDateString('fr-FR')} · {parseFloat(t.montant).toFixed(2)} €
                    </Text>
                  </View>
                  <View style={styles.txPtsBadge}>
                    <Text style={styles.txPts}>+{t.points_gagnes}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  header: { padding: spacing.lg, paddingBottom: 0 },
  title: { fontFamily: fonts.display, fontSize: 26, fontWeight: '700', color: '#fff', letterSpacing: -0.9 },
  sub: { fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: spacing.lg, gap: 10 },
  kpiCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: radii.lg, padding: 14,
  },
  kpiCardHL: { backgroundColor: 'rgba(197,248,74,0.08)', borderColor: 'rgba(197,248,74,0.2)' },
  kpiLabel: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.55)' },
  kpiValue: { fontFamily: fonts.display, fontSize: 26, fontWeight: '700', color: '#fff', letterSpacing: -0.8, marginTop: 4 },
  chartCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: radii.xl, padding: 16,
  },
  chartTitle: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 14 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', height: 72, gap: 6 },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 6 },
  bar: { width: '100%', borderRadius: 6, minHeight: 4 },
  barLabel: { fontFamily: fonts.mono, fontSize: 10, color: 'rgba(255,255,255,0.4)' },
  section: { margin: spacing.lg, marginTop: 20 },
  sectionTitle: {
    fontFamily: fonts.display, fontSize: 16, fontWeight: '700',
    color: '#fff', letterSpacing: -0.5, marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radii.md,
    padding: 12, marginBottom: 8,
  },
  txBorder: {},
  txAvatar: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  txInitials: { fontFamily: fonts.display, fontWeight: '700', fontSize: 13, color: '#fff' },
  txName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: '#fff' },
  txWhen: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  txPtsBadge: {
    backgroundColor: 'rgba(197,248,74,0.15)',
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: radii.full,
  },
  txPts: { fontFamily: fonts.display, fontWeight: '700', fontSize: 12, color: colors.lime },
  empty: { padding: 20, alignItems: 'center' },
  emptyText: { fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.5)' },
});
