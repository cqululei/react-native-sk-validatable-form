var React = require('react-native');
var {
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} = React;

// fix bug: cann't require dismissKeyboard, so I copy it
// var dismissKeyboard = require('dismissKeyboard');
function dismissKeyboard() {
  TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField());
}


/**
 * 链接的mixin
 *  1 简单封装 TouchableHighlight, 点击弹出新的页面来输入(如选择日期/选择性别等)
 *  2 必须实现 onPress() 方法, 处理点击事件(弹出新页面)
 *  3 可选实现 displayValue() 方法, 用于显示不同的值(如日期/位置的值需要格式化)
 */
var LinkMixin = {
  propTypes: {
    value: React.PropTypes.any, // 值
    onChange: React.PropTypes.func, // 值变化的回调
  },

  getInitialState: function() {
    return {
      value: undefined,
    };
  },

  onChange(value){
    this.setState({value})
    this.props.onChange && this.props.onChange(value); // 调用props.onChange() 来保存与校验widget的值
  },

  render(){
    var value, valueStyle = {};
    if(this.state.value){
      value = this.displayValue ? this.displayValue(this.state.value) : this.state.value; // 值
    }else{
      value = this.props.placeholder; // 输入提示
      valueStyle = {color:'#ABABAB'};
    }
    return (
      <TouchableHighlight
        style={{flex: 1}}
        underlayColor='#c7c7cc'
        onPress={this.onPress}>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      </TouchableHighlight>
    )
  }
};

var styles = StyleSheet.create({
  value: {
    flex: 1,
    fontSize: 15,
  },
});

module.exports = LinkMixin;
