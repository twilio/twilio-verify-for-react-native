// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

/**
 * Twilio Brand Colors
 * Official color palette from Twilio's design system
 * https://www.twilio.com/brand
 */
export const Colors = {
  primary: {
    main: '#F22F46', // Twilio Red
    dark: '#C41230',
    light: '#FF5A6E',
    lighter: '#FFE8EC',
  },
  secondary: {
    main: '#0D122B', // Twilio Dark Blue
    dark: '#000000',
    light: '#2E3350',
  },
  accent: {
    blue: '#0263E0', // Twilio Blue
    purple: '#7C2D8E', // Twilio Purple
    teal: '#00B4C4', // Twilio Teal
  },
  success: {
    main: '#0FA958',
    dark: '#0C8647',
    light: '#3FC078',
    lighter: '#E6F7EF',
  },
  error: {
    main: '#F22F46', // Using Twilio Red for errors
    dark: '#C41230',
    light: '#FF5A6E',
    lighter: '#FFE8EC',
  },
  warning: {
    main: '#F7A600', // Twilio Gold
    dark: '#CC8800',
    light: '#FFB83B',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F4F4F6', // Twilio Gray 50
    tertiary: '#E1E3EA', // Twilio Gray 100
    dark: '#0D122B', // Twilio Dark Blue
  },
  text: {
    primary: '#121C2D', // Twilio Gray 900
    secondary: '#606B85', // Twilio Gray 600
    tertiary: '#8891A7', // Twilio Gray 500
    disabled: '#C1C7D0', // Twilio Gray 300
    inverse: '#FFFFFF',
  },
  border: {
    main: '#D8DDE4', // Twilio Gray 200
    light: '#E1E3EA', // Twilio Gray 100
    dark: '#8891A7', // Twilio Gray 500
  },
  shadow: {
    main: 'rgba(13, 18, 43, 0.12)', // Based on Twilio Dark Blue
    light: 'rgba(13, 18, 43, 0.04)',
    dark: 'rgba(13, 18, 43, 0.24)',
  },
};

export const Shadows = {
  small: {
    shadowColor: Colors.shadow.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadow.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
