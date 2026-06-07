import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, RefreshControl,
} from 'react-native';
import { getStats, getTransactions } from '../../api/commercant.api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors, fonts, radii, spacing } from '../../theme';

function StatTile({ label, value, highlighted }) {
  return (
    <View style={[styles.statTile, highlighted && styles.statTileHL]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, highlighted && { color: colors.lime }]}>{value}</Text>
    </View>
  );
}

function TxRow({ item }) {
  const initials = (item.etudiant_prenom?.[0] ?? '') + (item.etudiant_nom?.[0] ?? '');
  const avatarColors = ['#FF8B5C', '#5B47E5', '#0F8A4B', '#3D2BB8'];
  const avatarBg = avatarColors[item.id % avatarColors.length];
  return (
    <View style={styles.txRow}>
      <View style={[styles.txAvatar, { backgroundColor: avatarBg }]}>
        <Text style={styles.txInitials}>{initials.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.txName}>{item.etudiant_prenom} {item.etudiant_nom?.[0]}.</Text>
        <Text style={styles.txWhen}>
          {new Date(item.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          {' · '}{parseFloat(item.montant).toFixed(2)} €
        </Text>
      </View>
      <View style={styles.txPtsBadge}>
        <Text style={styles.txPts}>+{item.points_gagnes}</Text>
      </View>
    </View>
  );
}

export default function DashboardCommercantScreen({ navigation }) {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [sRes, tRes] = await Promise.all([getStats(), getTransactions()]);
      setStats(sRes.data.stats);
      setTransactions(tRes.data.transactions.slice(0, 4));
    } catch (_) {}
  }, []);

  useEffect(() => { fetchData().finally(() => setLoading(false)); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchData(); setRefreshing(false); };

  const nomCommerce = user?.nom_commerce ?? 'Mon commerce';
  const initials = nomCommerce.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  if (loading) return <LoadingSpinner fullScreen color={colors.lime} />;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.lime} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.merchantInfo}>
            <View style={styles.merchantAvatar}>
              <Text style={styles.merchantInitials}>{initials}</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Bonjour,</Text>
              <Text style={styles.merchantName} numberOfLines={1}>{nomCommerce}</Text>
            </View>
          </View>
        </View>

        {/* Big QR CTA */}
        <TouchableOpacity
          style={styles.qrCta}
          onPress={() => navigation.navigate('GenererQR')}
          activeOpacity={0.88}
        >
          <View style={styles.qrIcon}>
            <Text style={{ fontSize: 28 }}>⬛</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.qrTitle}>Générer un QR Code</Text>
            <Text style={styles.qrSub}>Crédite des points à un client en 5 sec</Text>
          </View>
          <Text style={styles.qrChevron}>›</Text>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>APERÇU</Text>
          <View style={styles.statsGrid}>
            <StatTile label="Scans aujourd'hui" value={stats?.scans_aujourd_hui ?? '—'} highlighted />
            <StatTile label="Cette semaine" value={stats?.scans_cette_semaine ?? '—'} highlighted />
            <StatTile label="Points distribués" value={stats?.total_points_distribues?.toLocaleString('fr-FR') ?? '—'} />
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Dernières transactions</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Aucune transaction pour l'instant.</Text>
              <Text style={styles.emptySub}>Génère ton premier QR code !</Text>
            </View>
          ) : (
            <View style={styles.txList}>
              {transactions.map((t) => <TxRow key={t.id} item={t} />)}
            </View>
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  topRow: { padding: spacing.lg, paddingBottom: 0 },
  merchantInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  merchantAvatar: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center',
  },
  merchantInitials: { fontFamily: fonts.display, fontWeight: '700', fontSize: 16, color: '#fff' },
  greeting: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.55)' },
  merchantName: { fontFamily: fonts.display, fontSize: 18, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  qrCta: {
    margin: spacing.lg, height: 96,
    backgroundColor: colors.lime, borderRadius: radii.xl,
    flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 20,
    shadowColor: colors.lime, shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4, shadowRadius: 20, elevation: 10,
  },
  qrIcon: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center',
  },
  qrTitle: { fontFamily: fonts.display, fontSize: 20, fontWeight: '700', letterSpacing: -0.6, color: colors.ink },
  qrSub: { fontFamily: fonts.body, fontSize: 12, fontWeight: '500', color: 'rgba(22,22,43,0.65)', marginTop: 2 },
  qrChevron: { fontSize: 24, color: colors.ink, fontWeight: '300' },
  section: { paddingHorizontal: spacing.lg, marginTop: 6 },
  sectionLabel: {
    fontFamily: fonts.body, fontSize: 12, fontWeight: '700',
    color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3,
    textTransform: 'uppercase', marginBottom: 10,
  },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 16, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  sectionLink: { fontFamily: fonts.body, fontSize: 12, fontWeight: '600', color: colors.lime },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statTile: {
    flex: 1, minWidth: '45%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: radii.lg, padding: 14,
  },
  statTileHL: {
    backgroundColor: 'rgba(197,248,74,0.08)',
    borderColor: 'rgba(197,248,74,0.2)',
  },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.55)' },
  statValue: { fontFamily: fonts.display, fontSize: 26, fontWeight: '700', color: '#fff', letterSpacing: -0.8, lineHeight: 32, marginTop: 4 },
  txList: { gap: 8 },
  txRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: radii.md, padding: 12,
  },
  txAvatar: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  txInitials: { fontFamily: fonts.display, fontWeight: '700', fontSize: 13, color: '#fff' },
  txName: { fontFamily: fonts.body, fontSize: 14, fontWeight: '600', color: '#fff' },
  txWhen: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  txPtsBadge: {
    backgroundColor: 'rgba(197,248,74,0.15)',
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: radii.full,
  },
  txPts: { fontFamily: fonts.display, fontWeight: '700', fontSize: 12, color: colors.lime },
  empty: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radii.xl,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: 28, alignItems: 'center', gap: 4,
  },
  emptyText: { fontFamily: fonts.display, fontSize: 15, fontWeight: '700', color: '#fff' },
  emptySub: { fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.5)' },
});
