'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
} = React;

var Form = React.createClass({

  componentWillMount: function() {
    // 引用输入的子组件
    this.inputs = [];
  },

  // 注册子组件,在子组件的componentWillMount()中调用
  registerInput: function (component) {
    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component);
    }
  },

  // 注销子组件,在子组件的componentWillUnmount()中调用
  unregisterInput: function (component) {
    var componentPos = this.inputs.indexOf(component);

    if (componentPos !== -1) {
      this.inputs = this.inputs.slice(0, componentPos)
        .concat(this.inputs.slice(componentPos + 1));
    }
  },

  scrollTo: function(...args) {
    this.refs.scrollView.scrollTo(...args);
  },

  /**
   * 滚动到指定输入框位置
   * 参考 https://github.com/facebook/react-native/issues/3195#issuecomment-146518331
   * @param input: the input component
   * @param extraHeight: takes an extra height in consideration. like tabbar height is 49
   */
  scrollToFocusedInput: function (input, extraHeight = 49) {
    this.refs.scrollView.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(input), extraHeight, true
    )
  },

  // 获得所有字段的标题
  getTitles(){
    return this.inputs.reduce((titles, input) => {
      titles[input.props.name] = input.props.title;
      return titles;
    }, {});
  },

  // 获得所有字段值
  getValues(){
    return this.inputs.reduce((values, input) => {
      values[input.props.name] = input.state.value;
      return values;
    }, {})
  },

  // 获得所有字段值
  getValueQueryString(){
    var result = '';
    for(var i in this.inputs){
      var pref = (i == 0 ? '' : '&');
      var {props, state} = this.inputs[i];
      result += (pref + props.name + '=' + state.value);
    }
    return result;
  },

  // 校验所有字段
  validate(){
    var result = true;
    for(var i in this.inputs){
      result = this.inputs[i].validate() && result; // 不管validate()在此前是否调用过, 在此时都要重新调用一次
    }
    return result;
  },

  // 获得所有字段的校验失败的消息
  getErrorMessages(){
    return this.inputs.reduce((msgs, input) => {
      if(input.state.errorMessage){
        msgs.push(input.state.errorMessage);
      }
      return msgs;
    }, [])
  },

  // 封装子组件
  childrenWithProps() {
    return React.Children.map(this.props.children, (child) => {
      if (!!child) {
        return React.cloneElement(child, {
          form: this, // 传递form
          navigator: this.props.navigator, // 传递导航栏
        });
      }
    });
  },

  render(){
    return (
      <ScrollView
        {...this.props}
        ref='scrollView'>
        {this.childrenWithProps()}
      </ScrollView>
    )
  }
})

module.exports = Form;
