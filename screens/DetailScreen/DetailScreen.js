import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NeuInput } from 'react-native-neu-element';
import { Value } from '../../components/FontSize';
import { connect } from 'react-redux';
import { EditTimeSlot, DeleteTimeSlot } from '../../actions';
const screenWidth = Math.round(Dimensions.get('window').width);

const DetailScreen = (props) => {
  const { booked } = props.route.params.item;
  const { index } = props.route.params;
  const { item } = props.route.params;
  const [form, setForm] = useState({
    firstName: booked ? item.firstName : '',
    lastName: booked ? item.lastName : '',
    phoneNumber: booked ? item.phoneNumber : '',
  });

  const submit = () => {
    if (
      form.firstName.length < 1 ||
      form.lastName.length < 1 ||
      form.phoneNumber.length < 1
    ) {
      Alert.alert(
        'Fill all required details',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true }
      );
    } else {
      props.EditTimeSlot(index, {
        ...item,
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        booked: true,
      });
      props.navigation.navigate('Home', { ref: true });
    }
  };

  const cancelForm = () => {
    const { startTime, endTime, booked } = item;
    if (booked) {
      props.DeleteTimeSlot(index, {
        startTime,
        endTime,
        booked: false,
      });
      props.navigation.navigate('Home', { ref: true });
    } else {
      props.navigation.pop();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Enter your information</Text>
      <View style={{ paddingTop: Value(20) }}>
        <Text style={[{ paddingVertical: Value(10) }, styles.labelStyle]}>
          First Name:
        </Text>
        <NeuInput
          onChangeText={(e) => setForm({ ...form, firstName: e })}
          value={form.firstName}
          placeholder="Enter first name..."
          width={screenWidth * 0.9}
          height={Value(40)}
          color={'#e3e3e3'}
          borderRadius={10}
        />
        <Text style={[{ paddingVertical: Value(10) }, styles.labelStyle]}>
          Last Name:
        </Text>
        <NeuInput
          onChangeText={(e) => setForm({ ...form, lastName: e })}
          value={form.lastName}
          placeholder="Enter last name..."
          width={screenWidth * 0.9}
          height={Value(40)}
          color={'#e3e3e3'}
          borderRadius={10}
        />
        <Text style={[{ paddingVertical: Value(10) }, styles.labelStyle]}>
          Phone Number:
        </Text>
        <NeuInput
          onChangeText={(e) => setForm({ ...form, phoneNumber: e })}
          value={form.phoneNumber}
          placeholder="Enter phone numeber..."
          width={screenWidth * 0.9}
          height={Value(40)}
          color={'#e3e3e3'}
          borderRadius={10}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btnStyle, { backgroundColor: '#CD5C5C' }]}
            onPress={() => cancelForm()}
          >
            <Text style={styles.btnText}>{booked ? 'Delete' : 'Cancel'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnStyle, { backgroundColor: '#87ceeb' }]}
            onPress={() => submit()}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * (0.1 / 2),
    backgroundColor: '#e3e3e3',
    paddingTop: Platform.OS === 'ios' ? 32 : 18,
  },
  headerStyle: {
    fontSize: Value(22),
    color: '#CD5C5C',
    fontWeight: '400',
    paddingVertical: Value(10),
  },
  labelStyle: {
    fontSize: Value(15),
    color: 'grey',
    fontWeight: '500',
  },
  btnContainer: {
    width: screenWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: Value(30),
  },
  btnStyle: {
    paddingHorizontal: Value(20),
    paddingVertical: Value(5),
    borderRadius: Value(4),
  },
  btnText: {
    color: 'white',
    fontSize: Value(14),
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export default connect(null, { EditTimeSlot, DeleteTimeSlot })(DetailScreen);
