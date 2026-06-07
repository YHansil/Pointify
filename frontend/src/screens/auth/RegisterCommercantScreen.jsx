import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { registerCommercant } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, fonts, radii, spacing } from '../../theme';

export default function RegisterCommercantScreen({ navigation }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ nom_commerce: '', email: '', mot_de_passe: '', description: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleRegister = async () => {
    const { nom_commerce, email, mot_de_passe } = form;
    if (!nom_commerce || !email || !mot_de_passe) {
      Alert.alert('Champs manquants', 'Nom du commerce, email et mot de passe sont obligatoires.');
      return;
    }
    setLoading(true);
    try {
      const res = await registerCommercant(form);
      await login({ token: res.data.token, user: res.data.commercant, profil: 'commercant' });
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
            <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>🏪 Commerçant</Text>
            </View>
            <Text style={styles.title}>Ouvre ta{'\n'}boutique.</Text>
            <Text style={styles.sub}>Touche 12 000 étudiants à deux pas de chez toi.</Text>
          </View>

          <View style={styles.form}>
            <Input label="Nom du commerce" value={form.nom_commerce} onChangeText={set('nom_commerce')} placeholder="Crêperie du Quartier Latin" autoCapitalize="words" dark />
            <Input label="Email pro" value={form.email} onChangeText={set('email')} placeholder="hello@commerce.fr" keyboardType="email-address" dark />
            <Input label="Mot de passe" value={form.mot_de_passe} onChangeText={set('mot_de_passe')} placeholder="••••••••" secureTextEntry dark />
            <Input label="Description courte" value={form.description} onChangeText={set('description')} placeholder="Décris ton commerce en quelques mots…" autoCapitalize="sentences" dark />
          </View>

          <View style={{ flex: 1, minHeight: 24 }} />

          <Button onPress={handleRegister} loading={loading} color={colors.lime} textColor={colors.ink}>
            Créer mon commerce
          </Button>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login', { profil: 'commercant' })}>
            <Text style={styles.loginText}>
              Déjà un compte ?{' '}
              <Text style={{ color: colors.lime, fontWeight: '700' }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  scroll: { flexGrow: 1, padding: spacing.lg, paddingTop: 8 },
  backBtn: {
    width: 44, height: 44, borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  header: { marginTop: 24, gap: 10 },
  chip: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: radii.full, backgroundColor: colors.lime,
  },
  chipText: { fontFamily: fonts.body, fontSize: 12, fontWeight: '700', color: colors.ink },
  title: {
    fontFamily: fonts.display, fontSize: 32, fontWeight: '700',
    color: '#fff', letterSpacing: -1.1, lineHeight: 38,
  },
  sub: { fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.65)' },
  form: { marginTop: 24, gap: 14 },
  loginLink: { marginTop: 18, alignItems: 'center', marginBottom: 16 },
  loginText: { fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.55)' },
});
