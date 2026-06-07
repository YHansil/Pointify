import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '../theme';

export default function PointsBadge({ points, dark = false }) {
  return (
    <View style={[styles.badge, dark && styles.badgeDark]}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>P</Text>
      </View>
      <Text style={[styles.value, dark && { color: '#fff' }]}>
        {points?.toLocaleString('fr-FR') ?? '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.ink,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.full,
  },
  badgeDark: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  icon: {
    width: 16,
    height: 16,
    borderRadius: 5,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.ink,
    fontFamily: fonts.display,
    fontWeight: '800',
    fontSize: 10,
  },
  value: {
    color: '#fff',
    fontFamily: fonts.display,
    fontWeight: '700',
    fontSize: 14,
  },
});
