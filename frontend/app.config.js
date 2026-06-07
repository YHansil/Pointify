export default {
  expo: {
    name: 'Pointify',
    slug: 'pointify',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      backgroundColor: '#5B47E5',
    },
    ios: {
      bundleIdentifier: 'com.pointify.app',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#5B47E5',
      },
      package: 'com.pointify.app',
    },
    plugins: [
      [
        'expo-camera',
        { cameraPermission: 'Pointify a besoin de ta caméra pour scanner les QR codes.' },
      ],
    ],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    },
  },
};
