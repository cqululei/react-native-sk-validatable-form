'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
} = React;

var WidgetMixin = require('./WidgetMixin'),
    styles = require('./styles');
/**
 工具方法, 方便实现类似的类
 var TextInputWidget = React.createClass({
   mixins: [WidgetMixin],
   render(){
     return (
      <TextInput
        {...this.props}
        onChangeText={this.setValue}
        value={this.state.value} />
      )
   }
 })
 */

/**
 * 装饰组件属性, 添加setter/getter/onBlur等属性
 * @param Component 要装饰的组件，如TextInput
 * @param getter 组件值变化的回调，通过该回调来获得值, 如TextInput的onChangeText，PicsCart的onChange
 * @param setter 设置组件值的属性名，通过该属性来设置值, 如TextInput的value，PicsCart的pics
 * @param that 组件引用
 * @return 新属性
 */
function decorateProps(Component, getter, setter, that){
  var other = {};
  // 1 getter: 组件值变化的回调，通过该回调来获得值, 此时调用WidgetMixin.setValue()来保存值
  other[getter] = that.setValue;
  // 2 setter: 设置组件值的属性名，通过该属性来设置值, 用WidgetMixin.state.value来赋值
  other[setter] = that.state.value;
  // 3 onBlur: 失去焦点时校验
  var { onBlur, onFocus, ...props } = that.props;
  if(Component.propTypes && Component.propTypes.onBlur){ // 如果是输入控件, 则// 改写onBlur方法
    other['onBlur'] = (event) => {
      that.props.validateOnBlur && that.validate(); // 当失去焦点时执行校验
      onBlur && onBlur()
    };
  }
  // 4 onFocus：获得焦点时滚动
  if(Component.propTypes && Component.propTypes.onFocus){ // 如果是输入控件, 则// 改写onFocus方法
    other['onFocus'] = (event) => {
      that.props.form && that.props.form.scrollToFocusedInput(that); // 当输入框获得焦点时，表单滚动到输入框位置
      onFocus && onFocus()
    };
  }
  return React.addons.update(props, {$merge: other});
}

var WidgetClassFactory = {
  /**
   * 将Component封装为Widget: 用WidgetMixin装饰Component
   *     无论你封装的组件的值是什么字段名, 但是Widget操作的值的字段名都是value, 我们底层实现通过getter/setter来做适配
   * @param Component 要装饰的组件，如TextInput
   * @param getter 组件值变化的回调，通过该回调来获得值, 如TextInput的onChangeText，PicsCart的onChange
   * @param setter 设置组件值的属性名，通过该属性来设置值, 如TextInput的value，PicsCart的pics
   * @return 组件类
   */
  create(Component, getter = 'onValueChange', setter = 'value'){
    return React.createClass({
      mixins: [WidgetMixin],
      render(){
        // 装饰属性
        var props = decorateProps(Component, getter, setter, this);
        // 渲染
        return (
          <Component
            {...props}
          />
        );
      }
    })
  },

  /**
   * 将Component封装为Widget
   * 同create()方法, 不过显示样式为一行, 左标题, 右组件
   */
  createInline(Component, getter = 'onValueChange', setter = 'value'){
    return React.createClass({
      mixins: [WidgetMixin],
      render(){
        // 装饰属性
        var props = decorateProps(Component, getter, setter, this);
        // 是否合法
        var icon = this.state.errorMessage === null ? (<Image source={require('./img/valid.png')} style={styles.inlineIcon}/>) : null;
        // 渲染
        return (
          <View style={styles.inlineBox}>
            {/* 标题 */}
            <Text style={styles.inlineLabel}>{this.props.title}</Text>
            {/* 组件 */}
            <Component
              {...props}
            />
            {/* 合法图标 */}
            {icon}
          </View>
        );
      }
    })
  },

};

module.exports = WidgetClassFactory;
