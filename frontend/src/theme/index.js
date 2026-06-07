import { Platform } from 'react-native';

// Palette — extraite directement de tokens.jsx
export const colors = {
  violet: '#5B47E5',
  violetDeep: '#3D2BB8',
  violetTint: '#EDE9FE',
  lime: '#C5F84A',
  limeDeep: '#9FD420',
  cream: '#FAF7F2',
  paper: '#FFFFFF',
  ink: '#16162B',
  inkSoft: '#4A4A65',
  inkMuted: '#8A8AA0',
  line: '#ECEAE3',
  error: '#D63232',
};

// Fonts — DM Sans comme police principale
export const fonts = {
  display: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  body: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 22,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 28,
  full: 999,
};

// Styles de shadow réutilisables
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
};
