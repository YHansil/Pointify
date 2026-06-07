import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radii, fonts } from '../theme';

export default function Button({
  children,
  onPress,
  color = colors.violet,
  textColor = '#fff',
  ghost = false,
  loading = false,
  disabled = false,
  style,
}) {
  const bg = ghost ? 'transparent' : color;
  const border = ghost ? { borderWidth: 1.5, borderColor: colors.line } : {};
  const fg = ghost ? colors.ink : textColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.btn,
        { backgroundColor: bg },
        border,
        (disabled || loading) && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} size="small" />
      ) : (
        <Text style={[styles.label, { color: fg }]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
