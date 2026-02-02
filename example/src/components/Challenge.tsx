import {
  View,
  Text,
  type ViewStyle,
  type TextStyle,
  StyleSheet,
} from 'react-native';

import type { Challenge } from '@twilio/twilio-verify-for-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants';

type ChallengeComponentProps = {
  challenge: Challenge;
  styles?: {
    view?: ViewStyle;
    text?: TextStyle;
  };
  isDetailView?: boolean;
};

type ChallengeAdditionalInfoProps = {
  challenge: Challenge;
};

const ChallengeAdditionalInfo = ({
  challenge,
}: ChallengeAdditionalInfoProps) => {
  return (
    <View style={internalStyles.additionalInfo}>
      <View style={internalStyles.infoRow}>
        <Text style={internalStyles.label}>Updated</Text>
        <Text style={internalStyles.value}>
          {challenge.updatedAt.toLocaleString()}
        </Text>
      </View>
      {challenge.challengeDetails.fields.length > 0 && (
        <View style={internalStyles.detailsSection}>
          <Text style={internalStyles.detailsTitle}>Additional Details</Text>
          {challenge.challengeDetails.date && (
            <View style={internalStyles.infoRow}>
              <Text style={internalStyles.label}>Date</Text>
              <Text style={internalStyles.value}>
                {challenge.challengeDetails.date.toLocaleString()}
              </Text>
            </View>
          )}
          {challenge.challengeDetails.fields.map(
            (field: { label: string; value: string }, index: number) => (
              <View style={internalStyles.infoRow} key={index}>
                <Text style={internalStyles.label}>{field.label}</Text>
                <Text style={internalStyles.value}>{field.value}</Text>
              </View>
            )
          )}
        </View>
      )}
    </View>
  );
};

const ChallengeComponent = ({
  challenge,
  styles,
  isDetailView = false,
}: ChallengeComponentProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return Colors.success.main;
      case 'denied':
        return Colors.error.main;
      case 'pending':
        return Colors.warning.main;
      default:
        return Colors.text.secondary;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles?.view}>
      <View style={internalStyles.messageContainer}>
        <Text style={internalStyles.messageText}>
          {challenge.challengeDetails.message}
        </Text>
      </View>

      <View style={internalStyles.infoRow}>
        <Text style={internalStyles.label}>Status</Text>
        <View
          style={[
            internalStyles.statusBadge,
            { backgroundColor: `${getStatusColor(challenge.status)}15` },
          ]}
        >
          <Text
            style={[
              internalStyles.statusText,
              { color: getStatusColor(challenge.status) },
            ]}
          >
            {challenge.status}
          </Text>
        </View>
      </View>

      <View style={internalStyles.infoRow}>
        <Text style={internalStyles.label}>Created</Text>
        <Text style={internalStyles.value}>
          {formatDate(challenge.createdAt)}
        </Text>
      </View>

      <View style={internalStyles.infoRow}>
        <Text style={internalStyles.label}>Expires</Text>
        <Text style={internalStyles.value}>
          {formatDate(challenge.expirationDate)}
        </Text>
      </View>

      {isDetailView && <ChallengeAdditionalInfo challenge={challenge} />}

      {isDetailView && (
        <View style={internalStyles.sidSection}>
          <Text style={internalStyles.label}>Challenge SID</Text>
          <Text style={internalStyles.sidValue} selectable={true}>
            {challenge.sid}
          </Text>
        </View>
      )}
    </View>
  );
};

const internalStyles = StyleSheet.create({
  messageContainer: {
    backgroundColor: Colors.primary.lighter,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  messageText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },
  value: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.primary,
    textAlign: 'right',
    flex: 1,
    marginLeft: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'capitalize',
  },
  additionalInfo: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  detailsSection: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
  },
  detailsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  sidSection: {
    marginTop: Spacing.lg,
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
});

export default ChallengeComponent;
