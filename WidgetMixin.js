'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Validation = require('./Validation'),
    Message = require('./Message');

var WidgetMixin = {
  propTypes: {
    name: React.PropTypes.string, // 字段标识
    title: React.PropTypes.string, // 字段标题
    validateOnBlur: React.PropTypes.bool, // 当失去焦点时执行校验
    defaultValue: React.PropTypes.any, // 默认值, 用于初始化this.state.value, 有些组件需要特定类型的value(如string/array), 但是没有兼容null, 就是报错
  },

  getInitialState: function() {
    var {defaultValue} = this.props;
    var value = (typeof(defaultValue) === 'undefined') ? '' : defaultValue; // 字段值：默认赋值'', 因为多数字段都是string, 并且有些校验方法会检查参数string类型
    return {
      value, // 字段值
      errorMessage: undefined, // 校验错误的信息
    };
  },

  componentWillMount: function () {
    // 解析校验字符串
    this._validation = Validation.parse(this.props.validations);
    //在form中注册当前组件
    this.props.form && this.props.form.registerInput(this);
  },

  componentWillUnmount: function () {
    //在form中注销当前组件
    this.props.form && this.props.form.unregisterInput(this);
  },

  // 设置值：注意需要绑定到组件的值变化的回调中去
  setValue(value){
    if(typeof(value) !== 'undefined' && value !== null) // value不能是 undefined / null
      this.setState({value}, this.validate); // 更新value后, 立即校验
  },

  // 获得值
  getValue(){
    return this.state.value;
  },

  // 获得错误消息
  getErrorMessage(){
    return this.state.errorMessage;
  },

  // 校验: 在setState() 后调用
  validate(){
    // 执行校验
    // console.log(this.props.form.getValues());
    // console.log(this.props.form.getTitles());
    var values = this.props.form ? this.props.form.getValues() : {};
    var  {isValid, rule, args} = this._validation.check(this.state.value, values);

    // 如果校验失败, 则翻译失败消息
    var errorMessage = null;
    if(!isValid){
      var titles = this.props.form ? this.props.form.getTitles() : {};
      titles['TITLE'] = this.props.title; // 当前字段的标题直接为TITLE
      errorMessage = Message.translate(rule, args, titles);
      // console.log(errorMessage);
    }
    this.setState({errorMessage});

    return isValid;
  }
};

module.exports = WidgetMixin;
