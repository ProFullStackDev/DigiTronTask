import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import { NeuView } from 'react-native-neu-element';
import { Value } from './FontSize';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ListCard = (props) => {
  const { startTime, endTime, booked } = props.item;
  const { index } = props;
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: screenWidth * (0.1 / 2),
        paddingTop: Value(10),
      }}
      onPress={() => console.warn('hello')}
    >
      <NeuView
        color={'#e3e3e3'}
        width={screenWidth * 0.9}
        height={screenHeight * 0.09}
        borderRadius={8}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: Value(10),
          }}
        >
          <NeuView
            color={booked ? '#CD5C5C' : '#e3e3e3'}
            height={screenHeight * 0.065}
            width={screenWidth * 0.46}
            borderRadius={8}
            inset
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Image
                source={
                  booked ? (
                    require('../assets/images/timer1.png')
                  ) : (
                    require('../assets/images/timer.png')
                  )
                }
                style={{ height: Value(32), width: Value(32) }}
              />
              <Text
                style={[styles.textStyle, { color: booked ? 'white' : 'grey' }]}
              >
                {`${startTime} `}-{` ${endTime}`}
              </Text>
            </View>
          </NeuView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Detail', { item: props.item, index: index })}
          >
            <NeuView
              color={'#e3e3e3'}
              height={screenHeight * 0.065}
              width={screenWidth * 0.3}
              borderRadius={8}
              concave
            >
              <Text style={[styles.textStyle, { color: '#CD5C5C' }]}>
                {booked ? 'Edit' : 'Book'}
              </Text>
            </NeuView>
          </TouchableOpacity>
        </View>
      </NeuView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Value(10),
  },
});
export default ListCard;
