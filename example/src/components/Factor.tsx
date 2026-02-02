import {
  View,
  Text,
  type ViewStyle,
  type TextStyle,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';

import type { Factor } from '@twilio/twilio-verify-for-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants';

type FactorComponentProps = {
  factor: Factor;
  styles?: {
    view?: ViewStyle;
    text?: TextStyle;
  };
  showDetails?: boolean;
};

const FactorComponent = ({
  factor,
  styles,
  showDetails = false,
}: FactorComponentProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return Colors.success.main;
      case 'unverified':
        return Colors.warning.main;
      default:
        return Colors.text.secondary;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  return (
    <View style={styles?.view}>
      <View style={internalStyles.row}>
        <Text style={internalStyles.label}>Name</Text>
        <View style={internalStyles.valueWithCopy}>
          <Text style={[internalStyles.value, styles?.text]} numberOfLines={1}>
            {factor.friendlyName}
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(factor.friendlyName, 'Name')}
            style={internalStyles.copyButton}
          >
            <Text style={internalStyles.copyIcon}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={internalStyles.row}>
        <Text style={internalStyles.label}>Identity</Text>
        <View style={internalStyles.valueWithCopy}>
          <Text style={[internalStyles.value, styles?.text]} numberOfLines={1}>
            {factor.identity}
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(factor.identity, 'Identity')}
            style={internalStyles.copyButton}
          >
            <Text style={internalStyles.copyIcon}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={internalStyles.row}>
        <Text style={internalStyles.label}>Status</Text>
        <View
          style={[
            internalStyles.statusBadge,
            { backgroundColor: `${getStatusColor(factor.status)}15` },
          ]}
        >
          <Text
            style={[
              internalStyles.statusText,
              { color: getStatusColor(factor.status) },
            ]}
          >
            {factor.status}
          </Text>
        </View>
      </View>
      {showDetails && (
        <View style={internalStyles.detailsSection}>
          <View style={internalStyles.sidHeader}>
            <Text style={internalStyles.label}>SID</Text>
            <TouchableOpacity
              onPress={() => copyToClipboard(factor.sid, 'SID')}
              style={internalStyles.copyButton}
            >
              <Text style={internalStyles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[internalStyles.sidValue, styles?.text]}
            selectable={true}
          >
            {factor.sid}
          </Text>
        </View>
      )}
    </View>
  );
};

const internalStyles = {
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    marginRight: Spacing.md,
  },
  value: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'right' as const,
  },
  valueWithCopy: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
    gap: Spacing.sm,
  },
  copyButton: {
    padding: Spacing.xs,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.sm,
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  copyIcon: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'capitalize' as const,
  },
  sidHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Spacing.xs,
  },
  detailsSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  sidValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
};

export default FactorComponent;
