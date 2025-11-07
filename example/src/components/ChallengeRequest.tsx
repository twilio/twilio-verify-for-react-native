import {
  ActivityIndicator,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import {
  type Challenge,
  type ChallengeStatus,
} from '@twilio/twilio-verify-for-react-native';
import { Colors } from '../constants';
import ChallengeComponent from './Challenge';

type ChallengeRequestProps = {
  challenge: Challenge;
  componentStyles: {
    view: ViewStyle;
    text: TextStyle;
  };
  isSubmitting: boolean;
  onUpdate: (status: ChallengeStatus) => Promise<void>;
};

const ChallengeRequest = ({
  challenge,
  componentStyles,
  isSubmitting,
  onUpdate,
}: ChallengeRequestProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Challenge</Text>
        <ChallengeComponent
          challenge={challenge}
          styles={componentStyles}
          isDetailView={true}
        />
      </View>
      {challenge.status === ('pending' as ChallengeStatus) && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onUpdate('approved' as ChallengeStatus)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={Colors.white.default} />
            ) : (
              <Text style={styles.buttonText}>APPROVE</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onUpdate('denied' as ChallengeStatus)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={Colors.white.default} />
            ) : (
              <Text style={styles.buttonText}>DENY</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: Colors.blue.default,
    padding: 10,
  },

  buttonText: {
    color: Colors.white.default,
  },
});

export default ChallengeRequest;
