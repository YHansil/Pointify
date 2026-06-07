import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert, ScrollView,
} from 'react-native';
import { genererQr } from '../../api/commercant.api';
import { useAuth } from '../../context/AuthContext';
import QRCodeDisplay from '../../components/QRCodeDisplay';
import Button from '../../components/Button';
import { colors, fonts, radii, spacing } from '../../theme';

export default function GenererQRScreen({ navigation }) {
  const { user } = useAuth();
  const [montant, setMontant] = useState('');
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  const points = montant ? Math.floor(parseFloat(montant.replace(',', '.')) * 10) : 0;

  useEffect(() => {
    if (!qrData) return;
    setCountdown(qrData.expire_dans ?? 60);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qrData?.token]);

  const handleGenerate = async () => {
    const val = parseFloat(montant.replace(',', '.'));
    if (!montant || isNaN(val) || val <= 0) {
      Alert.alert('Montant invalide', 'Saisis un montant supérieur à 0.');
      return;
    }
    clearInterval(timerRef.current);
    setLoading(true);
    try {
      const res = await genererQr(val);
      setQrData(res.data);
    } catch (err) {
      Alert.alert('Erreur', err.response?.data?.error ?? 'Impossible de générer le QR');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setQrData(null);
    setMontant('');
  };

  const expired = countdown === 0 && qrData !== null;
  const progressPct = qrData ? (countdown / (qrData.expire_dans ?? 60)) : 0;
  const circum = 2 * Math.PI * 15;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>Nouveau QR Code</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Montant */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>MONTANT DE L'ACHAT</Text>
          <View style={styles.amountRow}>
            <TextInput
              style={styles.amountInput}
              value={montant}
              onChangeText={setMontant}
              placeholder="0,00"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="decimal-pad"
              editable={!qrData}
            />
            <Text style={styles.currencySymbol}>€</Text>
          </View>
          {montant !== '' && !isNaN(parseFloat(montant)) && parseFloat(montant) > 0 && (
            <Text style={styles.pointsPreview}>
              soit <Text style={{ color: colors.lime, fontWeight: '700' }}>+ {points} points</Text> pour le client (10 pts / €)
            </Text>
          )}
        </View>

        {/* QR Card */}
        {qrData ? (
          <View style={styles.qrCard}>
            {/* Header carte */}
            <View style={styles.qrCardHeader}>
              <View>
                <Text style={styles.qrCardBrand}>Pointify.</Text>
                <Text style={styles.qrCardShop} numberOfLines={1}>{user?.nom_commerce}</Text>
              </View>
              <View style={[styles.expireBadge, expired && styles.expireBadgeRed]}>
                <View style={[styles.expireDot, { backgroundColor: expired ? '#FF7B7B' : colors.lime }]} />
                <Text style={styles.expireText}>
                  {expired ? 'EXP.' : `EXP. ${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`}
                </Text>
              </View>
            </View>

            {/* QR */}
            <QRCodeDisplay token={qrData.token} expired={expired} size={200} />

            {/* Compte à rebours */}
            <View style={styles.countdownRow}>
              <View style={styles.countdownCircle}>
                <Text style={styles.countdownText}>{countdown}s</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.countdownLabel}>
                  {expired ? 'Code expiré — Régénère un nouveau QR' : 'Le client doit scanner avant expiration'}
                </Text>
                {!expired && (
                  <Text style={styles.countdownSub}>Usage unique · 1 scan autorisé</Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrPlaceholderIcon}>⬛</Text>
            <Text style={styles.qrPlaceholderText}>Le QR code apparaîtra ici</Text>
          </View>
        )}

        <View style={{ flex: 1, minHeight: 24 }} />

        {/* Actions */}
        <View style={styles.actions}>
          {qrData ? (
            <>
              <Button
                onPress={handleRegenerate}
                color={colors.lime}
                textColor={colors.ink}
              >
                Régénérer un QR
              </Button>
            </>
          ) : (
            <Button onPress={handleGenerate} loading={loading} color={colors.lime} textColor={colors.ink}>
              Générer le QR Code
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  scroll: { flexGrow: 1, padding: spacing.lg, paddingTop: 8 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  backBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  topTitle: { fontFamily: fonts.display, fontSize: 17, fontWeight: '700', color: '#fff' },
  amountSection: { marginTop: 24 },
  amountLabel: {
    fontFamily: fonts.body, fontSize: 12, fontWeight: '600',
    color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.4,
  },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 8 },
  amountInput: {
    fontFamily: fonts.display, fontSize: 64, fontWeight: '700',
    color: '#fff', letterSpacing: -3, lineHeight: 72, flex: 1,
    padding: 0,
  },
  currencySymbol: { fontFamily: fonts.display, fontSize: 32, fontWeight: '700', color: colors.lime },
  pointsPreview: { fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 6 },
  qrCard: {
    marginTop: 24, backgroundColor: '#fff',
    borderRadius: radii.xxl, padding: 20,
  },
  qrCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  qrCardBrand: { fontFamily: fonts.display, fontWeight: '700', fontSize: 14, color: colors.ink },
  qrCardShop: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted, marginTop: 2 },
  expireBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.ink, paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: radii.full,
  },
  expireBadgeRed: { backgroundColor: '#FFE0E0' },
  expireDot: { width: 6, height: 6, borderRadius: 3 },
  expireText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: '600', color: '#fff' },
  countdownRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: 16, padding: 12, borderRadius: radii.md,
    backgroundColor: colors.cream,
  },
  countdownCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.violetTint,
    alignItems: 'center', justifyContent: 'center',
  },
  countdownText: { fontFamily: fonts.mono, fontSize: 13, fontWeight: '700', color: colors.violet },
  countdownLabel: { fontFamily: fonts.body, fontSize: 13, fontWeight: '600', color: colors.ink },
  countdownSub: { fontFamily: fonts.body, fontSize: 11, color: colors.inkMuted, marginTop: 1 },
  qrPlaceholder: {
    marginTop: 24, height: 280, borderRadius: radii.xxl,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)',
    borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  qrPlaceholderIcon: { fontSize: 48, opacity: 0.4 },
  qrPlaceholderText: { fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.4)' },
  actions: { marginBottom: 16 },
});
