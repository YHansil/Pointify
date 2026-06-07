import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { loginEtudiant, loginCommercant } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, fonts, radii, spacing } from '../../theme';

export default function LoginScreen({ navigation, route }) {
  const profil = route.params?.profil ?? 'etudiant';
  const isEtudiant = profil === 'etudiant';
  const accent = isEtudiant ? colors.violet : colors.ink;
  const dark = !isEtudiant;

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const bg = dark ? colors.ink : colors.cream;
  const textColor = dark ? '#fff' : colors.ink;
  const subColor = dark ? 'rgba(255,255,255,0.65)' : colors.inkSoft;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Champs manquants', 'Remplis ton email et ton mot de passe.');
      return;
    }
    setLoading(true);
    try {
      const fn = isEtudiant ? loginEtudiant : loginCommercant;
      const res = await fn({ email, mot_de_passe: password });
      const data = res.data;
      const user = isEtudiant ? data.etudiant : data.commercant;
      await login({ token: data.token, user, profil });
      // La navigation est gérée par le root navigator via AuthContext
    } catch (err) {
      const msg = err.response?.data?.error ?? 'Erreur de connexion';
      Alert.alert('Connexion impossible', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, dark && styles.backBtnDark]}
          >
            <Text style={{ color: dark ? '#fff' : colors.ink, fontSize: 22 }}>‹</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.chip, { backgroundColor: isEtudiant ? colors.violetTint : colors.lime }]}>
              <Text style={[styles.chipText, { color: isEtudiant ? colors.violet : colors.ink }]}>
                {isEtudiant ? '🎓 Étudiant' : '🏪 Commerçant'}
              </Text>
            </View>
            <Text style={[styles.title, { color: textColor }]}>Bon retour !</Text>
            <Text style={[styles.sub, { color: subColor }]}>
              Connecte-toi pour reprendre où tu en étais.
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="ton@email.fr"
              keyboardType="email-address"
              dark={dark}
            />
            <Input
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              dark={dark}
            />
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Text style={[styles.forgotLink, { color: accent === colors.ink ? colors.violet : accent }]}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, minHeight: 40 }} />

          {/* CTA */}
          <Button
            onPress={handleLogin}
            loading={loading}
            color={isEtudiant ? colors.violet : colors.lime}
            textColor={isEtudiant ? '#fff' : colors.ink}
          >
            Se connecter
          </Button>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() =>
              navigation.navigate(
                isEtudiant ? 'RegisterEtudiant' : 'RegisterCommercant'
              )
            }
          >
            <Text style={[styles.registerText, { color: subColor }]}>
              Pas encore de compte ?{' '}
              <Text style={{ color: isEtudiant ? colors.violet : colors.lime, fontWeight: '700' }}>
                S'inscrire
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flexGrow: 1, padding: spacing.lg, paddingTop: 8 },
  backBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  backBtnDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  header: { marginTop: 32, gap: 10 },
  chip: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: radii.full,
  },
  chipText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '600' },
  title: {
    fontFamily: fonts.display, fontSize: 34,
    fontWeight: '700', letterSpacing: -1.2, lineHeight: 38,
  },
  sub: { fontFamily: fonts.body, fontSize: 15 },
  form: { marginTop: 36, gap: 16 },
  forgotLink: { fontFamily: fonts.body, fontSize: 13, fontWeight: '600' },
  registerLink: { marginTop: 18, alignItems: 'center', marginBottom: 16 },
  registerText: { fontFamily: fonts.body, fontSize: 14 },
});
