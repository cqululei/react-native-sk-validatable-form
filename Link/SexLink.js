var React = require('react-native');
var {
  Alert,
} = React;

var LinkMixin = require('./LinkMixin');

// 性别选择的链接
var SexLink = React.createClass({
  mixins: [LinkMixin],
  onPress(){
    Alert.alert(
        'sex',
        'select sex',
        [
          {text: 'male', onPress: () => this.onChange('male')},
          {text: 'female', onPress: () => this.onChange('female')},
        ]
      );
  },
  // displayValue(value){
  //   return value == 'male' ? '男' : '女';
  // }
});

module.exports = SexLink;
