import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii } from '../theme';

export default function Card({ children, style, dark = false, padding = 18 }) {
  return (
    <View
      style={[
        styles.card,
        dark ? styles.dark : styles.light,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
  },
  light: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  dark: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
});
