'use strict';

var React = require('react-native');
var {
  Dimensions,
  StyleSheet,
} = React;
var {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
  inlineBox:{
    height:44,
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth:1,
    borderColor:'#F3F3F3',
  },
  inlineLabel: {
    width: width / 4,
    fontSize: 15,
    color: '#000',
    textAlign: 'center'
  },
  inlineIcon: {
    marginRight: 10
  }
});
