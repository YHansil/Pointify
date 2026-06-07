import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, fonts, radii } from '../theme';

export default function QRCodeDisplay({ token, expired = false, size = 220 }) {
  return (
    <View style={[styles.container, expired && styles.expired]}>
      {expired ? (
        <View style={styles.expiredOverlay}>
          <Text style={styles.expiredIcon}>⏱</Text>
          <Text style={styles.expiredText}>QR expiré</Text>
        </View>
      ) : (
        <QRCode
          value={token}
          size={size}
          color={colors.ink}
          backgroundColor="transparent"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.line,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  expired: {
    opacity: 0.4,
  },
  expiredOverlay: {
    alignItems: 'center',
    gap: 8,
  },
  expiredIcon: {
    fontSize: 48,
  },
  expiredText: {
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
});
