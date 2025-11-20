import { StyleSheet, Text, View, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import type { Factor } from '@twilio/twilio-verify-for-react-native';
import { Colors } from '../constants';
import FactorComponent from './Factor';

type FactorListItemProps = {
  item: Factor;
  onPress: (factor: Factor) => void;
  onDelete: (factor: Factor) => void;
};

const FactorListItem = ({ item, onPress, onDelete }: FactorListItemProps) => {
  const renderRightAction = () => {
    return (
      <View style={styles.deleteAction}>
        <Pressable style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <Pressable onPress={() => onPress(item)} style={styles.container}>
        <FactorComponent factor={item} styles={factorComponentStyles} />
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.black.default,
    borderBottomWidth: 0.5,
  },
  deleteAction: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const factorComponentStyles = StyleSheet.create({
  view: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default FactorListItem;
