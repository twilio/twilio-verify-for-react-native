import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import type { Challenge } from '@twilio/twilio-verify-for-react-native';

type ChallengeComponentProps = {
  challenge: Challenge;
  styles: {
    view: ViewStyle;
    text: TextStyle;
  };
  isDetailview?: boolean;
};

type ChallengeAdditionalInfoProps = {
  challenge: Challenge;
  textStyle: TextStyle;
};

const ChallengeAdditionalInfo = ({
  challenge,
  textStyle,
}: ChallengeAdditionalInfoProps) => {
  return (
    <View>
      <Text style={textStyle}>
        Update at: {challenge.updatedAt.toLocaleString()}
      </Text>
      {challenge.challengeDetails.fields.length > 0 && (
        <View>
          <Text style={textStyle}>Details:</Text>
          <View style={styles.detailsBlock}>
            {challenge.challengeDetails.date && (
              <Text style={textStyle}>
                Date: {challenge.challengeDetails.date.toLocaleString()}
              </Text>
            )}
            {challenge.challengeDetails.fields.map((field, index) => (
              <Text style={textStyle} key={index}>
                {field.label + ': ' + field.value}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const ChallengeComponent = ({
  challenge,
  styles,
  isDetailview = false,
}: ChallengeComponentProps) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Sid: {challenge.sid}</Text>
      <Text style={styles.text}>
        Message: {challenge.challengeDetails.message}
      </Text>
      <Text style={styles.text}>Status: {challenge.status}</Text>
      <Text style={styles.text}>
        Created at: {challenge.createdAt.toLocaleString()}
      </Text>
      <Text style={styles.text}>
        Expires on: {challenge.expirationDate.toLocaleString()}
      </Text>
      {isDetailview && (
        <ChallengeAdditionalInfo
          challenge={challenge}
          textStyle={styles.text}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsBlock: { marginLeft: 10 },
});

export default ChallengeComponent;
