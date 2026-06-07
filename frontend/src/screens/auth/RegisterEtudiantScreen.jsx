import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { registerEtudiant } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, fonts, radii, spacing } from '../../theme';

export default function RegisterEtudiantScreen({ navigation }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', mot_de_passe: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleRegister = async () => {
    const { prenom, nom, email, mot_de_passe } = form;
    if (!prenom || !nom || !email || !mot_de_passe) {
      Alert.alert('Champs manquants', 'Tous les champs sont obligatoires.');
      return;
    }
    if (mot_de_passe.length < 6) {
      Alert.alert('Mot de passe trop court', 'Minimum 6 caractères.');
      return;
    }
    setLoading(true);
    try {
      const res = await registerEtudiant(form);
      await login({ token: res.data.token, user: res.data.etudiant, profil: 'etudiant' });
    } catch (err) {
      Alert.alert('Erreur', err.response?.data?.error ?? 'Inscription impossible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={{ color: colors.ink, fontSize: 22 }}>‹</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>🎓 Étudiant</Text>
            </View>
            <Text style={styles.title}>Crée ton compte</Text>
            <Text style={styles.sub}>30 secondes, et tu cumules tes premiers points.</Text>
          </View>

          <View style={styles.form}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Input
                label="Prénom"
                value={form.prenom}
                onChangeText={set('prenom')}
                placeholder="Marie"
                autoCapitalize="words"
                style={{ flex: 1 }}
              />
              <Input
                label="Nom"
                value={form.nom}
                onChangeText={set('nom')}
                placeholder="Durand"
                autoCapitalize="words"
                style={{ flex: 1 }}
              />
            </View>
            <Input
              label="Email universitaire"
              value={form.email}
              onChangeText={set('email')}
              placeholder="marie.durand@univ.fr"
              keyboardType="email-address"
            />
            <Input
              label="Mot de passe"
              value={form.mot_de_passe}
              onChangeText={set('mot_de_passe')}
              placeholder="••••••••"
              secureTextEntry
            />

            {/* CGU info */}
            <View style={styles.cguBox}>
              <View style={styles.cguCheck}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <Text style={styles.cguText}>
                J'accepte les CGU et la politique de confidentialité de Pointify.
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, minHeight: 24 }} />

          <Button onPress={handleRegister} loading={loading}>
            Créer mon compte
          </Button>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login', { profil: 'etudiant' })}>
            <Text style={styles.loginText}>
              Déjà un compte ?{' '}
              <Text style={{ color: colors.violet, fontWeight: '700' }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  scroll: { flexGrow: 1, padding: spacing.lg, paddingTop: 8 },
  backBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  header: { marginTop: 24, gap: 8 },
  chip: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: radii.full, backgroundColor: colors.violetTint,
  },
  chipText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '600', color: colors.violet },
  title: {
    fontFamily: fonts.display, fontSize: 32, fontWeight: '700',
    color: colors.ink, letterSpacing: -1.1,
  },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
  form: { marginTop: 24, gap: 14 },
  cguBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: colors.violetTint, borderRadius: radii.md, padding: 14,
  },
  cguCheck: {
    width: 20, height: 20, borderRadius: 6,
    backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { color: '#fff', fontSize: 12, fontWeight: '700' },
  cguText: { flex: 1, fontFamily: fonts.body, fontSize: 12, color: colors.ink, lineHeight: 18 },
  loginLink: { marginTop: 18, alignItems: 'center', marginBottom: 16 },
  loginText: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
});
