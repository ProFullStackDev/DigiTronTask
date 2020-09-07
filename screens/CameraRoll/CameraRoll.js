import React, { Component } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';

const screenWidth = Math.round(Dimensions.get('window').width);
const groupByEveryN = function groupByEveryN(num) {
  const n = num;
  return (arrayArg) => {
    const array = [...arrayArg];
    const result = [];
    while (array.length > 0) {
      const groupByNumber = array.length >= n ? n : array.length;
      result.push(array.splice(0, groupByNumber));
    }
    return result;
  };
};
const logError = console.error;

class CameraRollScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = this.getInitialState();

  getInitialState() {
    return {
      assets: [],
      data: [],
      seen: new Set(),
      lastCursor: null,
      noMore: false,
      loadingMore: false,
      selectedURI: null,
      selectedIndex: null,
    };
  }

  static defaultProps = {
    groupTypes: 'All',
    batchSize: 5,
    imagesPerRow: 1,
  };

  componentDidMount() {
    this.fetch();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.groupTypes !== nextProps.groupTypes) {
      this.fetch(true);
    }
  }

  async _fetch(clear) {
    if (clear) {
      this.setState(this.getInitialState(), this.fetch);
      return;
    }

    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ThumbsApp would like to access your pictures.',
        }
      );
      if (result !== 'granted') {
        Alert.alert('Access to pictures was denied.');
        return;
      }
    }

    const fetchParams = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.dataType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    try {
      const data = await CameraRoll.getPhotos(fetchParams);
      this._appendAssets(data);
    } catch (e) {
      logError(e);
    }
  }

  /**
   * Fetches more images from the camera roll. If clear is set to true, it will
   * set the component to its initial state and re-fetch the images.
   */
  fetch = (clear) => {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this._fetch(clear);
      });
    }
  };

  render() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooterSpinner}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.2}
        style={styles.container}
        numColumns={3}
        data={this.state.data || []}
        extraData={this.props.bigImages + this.state.noMore}
      />
    );
  }

  _renderFooterSpinner = () => {
    if (!this.state.noMore) {
      return <ActivityIndicator />;
    }
    return null;
  };

  _renderItem = ({ item, index }) => {
    const imageSize = screenWidth / 3;
    const imageStyle = [
      styles.image,
      { width: imageSize, height: imageSize * 1.2, borderRadius: 10 },
    ];
    return (
      <TouchableOpacity
        style={[styles.row, imageStyle]}
        key={index}
        onPress={() => {
          this.setState({
            selectedIndex: index,
            selectedURI: item[0].node.image.uri,
          });
        }}
      >
        <Image
          source={{ uri: item[0].node.image.uri }}
          style={{ height: '100%', width: '100%' }}
        />
      </TouchableOpacity>
    );
  };

  _appendAssets(data) {
    const assets = data.edges;
    const newState = { loadingMore: false };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.seen = new Set(this.state.seen);

      // Unique assets efficiently
      // Checks new pages against seen objects
      const uniqAssets = [];
      for (let index = 0; index < assets.length; index++) {
        const asset = assets[index];
        let value = asset.node.image.uri;
        if (newState.seen.has(value)) {
          continue;
        }
        newState.seen.add(value);
        uniqAssets.push(asset);
      }

      newState.assets = this.state.assets.concat(uniqAssets);
      newState.data = groupByEveryN(this.props.imagesPerRow)(newState.assets);
    }

    this.setState(newState);
  }

  _onEndReached = () => {
    if (!this.state.noMore) {
      this.fetch();
    }
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    marginVertical: 2,
    paddingHorizontal: 2,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
});

export default CameraRollScreen;
