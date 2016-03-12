'use strict';

/**
// 1 创建widget类
// 1.1 继承WidgetMixin，需要在组件值更新的回调中，调用this.setValue
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

// 1.2 工具方法，1.1的简写
var TextInputWidget = WidgetClassFactory.create(TextInput, 'onChangeText');

// 2 创建form
class FormExample extends React.Component {
  render(){
    return (
      <Form>
        <TextInputWidget name='email' title='邮件' validations='isRequired,isEmail' style={{borderColor: 'red', borderWidth: 1, height: 40, }} />
      </Form>
    )
  }
}
*/
'use strict';

var React = require('react-native');
var Form = require('./Form');
var WidgetMixin = require('./WidgetMixin');
var WidgetClassFactory = require('./WidgetClassFactory');
var Validation = require('./Validation');
var Message = require('./Message');
var PicsCart = require('react-native-sk-picscart');
var styles = require('./styles');
var Widget = {
  TextInput : WidgetClassFactory.create(React.TextInput, 'onChangeText', 'value'),
  TextInputInline : WidgetClassFactory.createInline(React.TextInput, 'onChangeText', 'value'),
  // TouchableInline: require('./Widget/TouchableInline'), // 点击直接跳转
  PicsCart : WidgetClassFactory.create(PicsCart, 'onChange', 'pics'),
}

module.exports = {
  Form,
  WidgetMixin,
  WidgetClassFactory,
  Validation,
  Message,
  Widget,
  formStyle: styles
};
