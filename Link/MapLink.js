var React = require('react-native');
var {
  View,
  MapView,
  Text,
  TextInput,
  StyleSheet,
  PropTypes
} = React;

var LinkMixin = require('./LinkMixin');

// 位置选择器
var MapSelector = React.createClass({

  getInitialState() {
    return {
      isFirstLoad: true,
      mapRegion: undefined, // 当前位置
      mapRegionInput: undefined, // 选择的位置
      annotations: [],
    };
  },

  render() {
    return (
      <MapView
        style={[{flex: 1}, this.props.style]}
        onRegionChange={this._onRegionChange}
        onRegionChangeComplete={this._onRegionChangeComplete}
        region={this.state.mapRegion}
        annotations={this.state.annotations}
      />
    );
  },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },

});

// 位置选择器的链接
var MapLink = React.createClass({
  mixins: [LinkMixin],
  onPress(){
    this.props.navigator.push({
      title: this.props.title || 'Select Place',
      component: MapSelector,
      passProps: {
        ref: (ref) => this.mapSelector = ref,
      },
      rightButtonTitle: 'done',
      onRightButtonPress: () => {
        this.onChange(this.mapSelector.state.mapRegionInput);
        this.props.navigator.pop();
      },
    });
  },
  displayValue(mapRegionInput){
    return '[' + mapRegionInput.latitude + ',' + mapRegionInput.longitude + ']';
  }
});

var styles = StyleSheet.create({
  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

module.exports = MapLink;
