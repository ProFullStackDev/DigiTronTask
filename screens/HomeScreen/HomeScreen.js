import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Percentage, Value } from '../../components/FontSize';
import ListCard from '../../components/listCard';
import { connect } from 'react-redux';
import { EditTimeSlot } from '../../actions';

const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = (props) => {
  const renderItem = ({ item, index }) => (
    <ListCard item={item} index={index} />
  );

  useEffect(() => {}, [props.slots]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {console.warn(props.slots)}
        <Text style={styles.headerTitle}>DIGITRON</Text>
        <Text style={styles.subHeaderTitle}>INTERVIEW TIME SLOTS</Text>
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={() => props.navigation.navigate('Camera')}
        >
          <Text style={styles.camerBtnTxt}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.slots}
        extraData={props.slots}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    paddingTop: Platform.OS === 'ios' ? 32 : 18,
  },
  headerContainer: {
    width: screenWidth,
    paddingTop: Value(10),
    paddingHorizontal: screenWidth * (0.1 / 2),
  },
  headerTitle: {
    fontSize: Value(26),
    letterSpacing: 0.4,
    fontWeight: '600',
    lineHeight: Value(29),
    color: '#CD5C5C',
  },
  subHeaderTitle: {
    fontSize: Value(18),
    fontWeight: '500',
    color: 'grey',
    lineHeight: Value(19),
  },
  cameraBtn: {
    paddingHorizontal: Value(10),
    paddingVertical: Value(8),
    backgroundColor: 'grey',
    width: Value(100),
    borderRadius: Value(10),
    marginVertical: Value(5),
  },
  camerBtnTxt: { fontSize: Value(12), fontWeight: '400', color: 'white' },
});

const mapStateToProps = (state) => {
  return {
    slots: state.Slots,
  };
};

export default connect(mapStateToProps, { EditTimeSlot })(HomeScreen);
