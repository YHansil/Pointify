import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { scanQr } from '../../api/etudiant.api';
import { useAuth } from '../../context/AuthContext';
import { colors, fonts, radii } from '../../theme';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const cooldown = useRef(false);

  const handleBarCodeScanned = async ({ data }) => {
    if (!scanning || cooldown.current || loading) return;
    cooldown.current = true;
    setScanning(false);
    setLoading(true);

    try {
      const res = await scanQr(data);
      const { points_gagnes, points_total } = res.data;
      updateUser({ points_total });
      setResult({ success: true, points_gagnes, points_total });
    } catch (err) {
      const msg = err.response?.data?.error ?? 'Erreur lors du scan';
      setResult({ success: false, message: msg });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setScanning(true);
    cooldown.current = false;
  };

  if (!permission) return <View style={{ flex: 1, backgroundColor: '#000' }} />;

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permScreen}>
        <Text style={styles.permTitle}>Caméra requise</Text>
        <Text style={styles.permSub}>
          Pointify a besoin de ta caméra pour scanner les QR codes des commerçants.
        </Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Caméra */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanning && !loading ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

      {/* Overlay assombri */}
      <View style={styles.overlay} pointerEvents="none" />

      {/* Top bar */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', fontSize: 20 }}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Scanner un QR</Text>
        <View style={{ width: 44 }} />
      </SafeAreaView>

      {/* Viseur */}
      <View style={styles.finder} pointerEvents="none">
        {/* Coins limés */}
        {[
          { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 24 },
          { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 24 },
          { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 24 },
          { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 24 },
        ].map((s, i) => (
          <View key={i} style={[styles.corner, s, { borderColor: colors.lime }]} />
        ))}

        {/* Ligne de scan */}
        {scanning && !result && (
          <View style={styles.scanLine} />
        )}
      </View>

      {/* Hint */}
      {!result && !loading && (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Place le code dans le cadre</Text>
        </View>
      )}

      {loading && (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Validation en cours…</Text>
        </View>
      )}

      {/* Résultat */}
      {result && (
        <View style={styles.resultCard}>
          <View style={[styles.resultIcon, { backgroundColor: result.success ? colors.lime : '#FFE0E0' }]}>
            <Text style={{ fontSize: 28 }}>{result.success ? '✓' : '✕'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.resultLabel}>
              {result.success ? 'Scan réussi' : 'Scan échoué'}
            </Text>
            <Text style={styles.resultMain}>
              {result.success
                ? `+ ${result.points_gagnes} points crédités`
                : result.message}
            </Text>
            {result.success && (
              <Text style={styles.resultSub}>
                Total : {result.points_total?.toLocaleString('fr-FR')} pts
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={reset} style={styles.retryBtn}>
            <Text style={styles.retryText}>{result.success ? 'OK' : 'Réessayer'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  permScreen: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center', padding: 32 },
  permTitle: { fontFamily: fonts.display, fontSize: 26, fontWeight: '700', color: colors.ink, letterSpacing: -0.8 },
  permSub: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, textAlign: 'center', marginTop: 12, lineHeight: 22 },
  permBtn: { marginTop: 28, backgroundColor: colors.violet, paddingVertical: 16, paddingHorizontal: 32, borderRadius: radii.lg },
  permBtnText: { fontFamily: fonts.body, fontSize: 17, fontWeight: '600', color: '#fff' },
  overlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 22, paddingTop: 16, zIndex: 10,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  topTitle: { fontFamily: fonts.display, fontSize: 17, fontWeight: '600', color: '#fff' },
  finder: {
    position: 'absolute',
    top: '50%', left: '50%',
    width: 260, height: 260,
    marginTop: -130, marginLeft: -130,
    borderRadius: 32,
  },
  corner: {
    position: 'absolute', width: 44, height: 44,
  },
  scanLine: {
    position: 'absolute',
    top: '52%', left: 16, right: 16, height: 2,
    backgroundColor: colors.lime,
    shadowColor: colors.lime, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 8,
  },
  hint: {
    position: 'absolute', bottom: 160, left: 0, right: 0,
    alignItems: 'center',
  },
  hintText: { fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  resultCard: {
    position: 'absolute', left: 18, right: 18, bottom: 100,
    backgroundColor: '#fff', borderRadius: 26, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.4, shadowRadius: 30, elevation: 20,
  },
  resultIcon: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  resultLabel: {
    fontFamily: fonts.body, fontSize: 12, fontWeight: '600',
    color: colors.inkMuted, textTransform: 'uppercase', letterSpacing: 0.4,
  },
  resultMain: { fontFamily: fonts.display, fontSize: 17, fontWeight: '700', color: colors.ink, marginTop: 1 },
  resultSub: { fontFamily: fonts.body, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  retryBtn: {
    backgroundColor: colors.violet, borderRadius: 12,
    paddingVertical: 10, paddingHorizontal: 16,
  },
  retryText: { fontFamily: fonts.body, fontSize: 13, fontWeight: '700', color: '#fff' },
});
