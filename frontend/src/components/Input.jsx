import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '../theme';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  dark = false,
  style,
}) {
  const [hidden, setHidden] = useState(secureTextEntry);

  const labelColor = dark ? 'rgba(255,255,255,0.55)' : colors.inkSoft;
  const bg = dark ? 'rgba(255,255,255,0.06)' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.1)' : colors.line;
  const textColor = dark ? '#fff' : colors.ink;
  const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : colors.inkMuted;

  return (
    <View style={style}>
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      )}
      <View style={[styles.field, { backgroundColor: bg, borderColor: border }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)}>
            <Text style={{ color: colors.inkMuted, fontSize: 13 }}>
              {hidden ? 'Voir' : 'Masquer'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  field: {
    height: 56,
    borderRadius: radii.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '500',
  },
});
