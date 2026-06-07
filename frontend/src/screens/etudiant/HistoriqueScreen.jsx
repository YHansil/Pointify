import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, RefreshControl,
} from 'react-native';
import { getTransactions } from '../../api/etudiant.api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors, fonts, radii, spacing } from '../../theme';

function groupByDate(transactions) {
  const groups = {};
  transactions.forEach((t) => {
    const d = new Date(t.created_at);
    const key = d.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'long' }).toUpperCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return Object.entries(groups);
}

function HistoRow({ item, last }) {
  const positive = item.points_gagnes > 0;
  return (
    <View style={[styles.row, !last && { borderBottomWidth: 1, borderBottomColor: colors.line }]}>
      <View style={[styles.avatar, { backgroundColor: positive ? colors.violetDeep : colors.ink }]}>
        <Text style={{ fontSize: 18 }}>{positive ? '🏪' : '🎁'}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.name} numberOfLines={1}>{item.nom_commerce}</Text>
        <Text style={styles.when}>
          {new Date(item.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          {' · '}{parseFloat(item.montant).toFixed(2)} €
        </Text>
      </View>
      <Text style={[styles.amount, { color: positive ? colors.violet : colors.ink }]}>
        {positive ? '+' : '−'}{Math.abs(item.points_gagnes)} pts
      </Text>
    </View>
  );
}

export default function HistoriqueScreen() {
  const [groups, setGroups] = useState([]);
  const [totalGagne, setTotalGagne] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getTransactions();
      const txs = res.data.transactions;
      setGroups(groupByDate(txs));
      setTotalGagne(txs.filter((t) => t.points_gagnes > 0).reduce((s, t) => s + t.points_gagnes, 0));
    } catch (_) {}
  };

  useEffect(() => { fetchData().finally(() => setLoading(false)); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchData(); setRefreshing(false); };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.violet} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Historique</Text>
          <Text style={styles.sub}>Tous tes points et échanges</Text>
        </View>

        {/* Résumé */}
        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Total gagné</Text>
            <Text style={styles.summaryValue}>+ {totalGagne.toLocaleString('fr-FR')} pts</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>↗ Ce mois</Text>
          </View>
        </View>

        {/* Groupes par date */}
        {groups.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Aucune transaction</Text>
            <Text style={styles.emptySub}>Scanne un QR code pour voir ton historique apparaître ici.</Text>
          </View>
        ) : (
          <View style={styles.groups}>
            {groups.map(([date, items]) => (
              <View key={date}>
                <Text style={styles.groupDate}>{date}</Text>
                <View style={styles.groupCard}>
                  {items.map((t, i) => (
                    <HistoRow key={t.id} item={t} last={i === items.length - 1} />
                  ))}
                </View>
              </View>
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
  header: { padding: spacing.lg, paddingBottom: 0 },
  title: { fontFamily: fonts.display, fontSize: 26, fontWeight: '700', color: colors.ink, letterSpacing: -0.9 },
  sub: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  summary: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    margin: spacing.lg, marginTop: 14,
    backgroundColor: '#fff', borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.line, padding: 14,
  },
  summaryLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted },
  summaryValue: { fontFamily: fonts.display, fontSize: 22, fontWeight: '700', color: colors.ink, letterSpacing: -0.5, marginTop: 2 },
  summaryBadge: { backgroundColor: colors.violetTint, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 },
  summaryBadgeText: { fontFamily: fonts.display, fontWeight: '700', fontSize: 13, color: colors.violet },
  groups: { paddingHorizontal: spacing.lg, gap: 18 },
  groupDate: {
    fontFamily: fonts.body, fontSize: 11, fontWeight: '700',
    color: colors.inkMuted, letterSpacing: 0.6, marginBottom: 8,
  },
  groupCard: {
    backgroundColor: '#fff', borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.line,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: '12px 14px' },
  avatar: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: colors.ink },
  when: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted, marginTop: 1 },
  amount: { fontFamily: fonts.display, fontSize: 14, fontWeight: '700' },
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
