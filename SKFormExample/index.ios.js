
'use strict';
import React, {
  AppRegistry,
  Alert,
} from 'react-native';

var {SKNavigator} = require('react-native-sk-navigator');
var { Form, Widget, WidgetMixin, WidgetClassFactory, Validation, Message } = require('react-native-sk-validatable-form');

// 如果你想显示中文的错误消息
// Message.setLanguage('cn');

var Home = React.createClass({
  submit(){
    var title, msg;
    if(this.refs.form.validate()){
      title = 'Success';
      msg = 'validate success';
    }else{
      title = 'Fail';
      msg = this.refs.form.getErrorMessages().join('\n');
    }
    Alert.alert(
       title,
       msg,
       [
         {text:'ok'},
       ]
     );
  },
  render() {
    return (
      <Form
        ref='form'
        navigator={this.props.navigator}
        keyboardShouldPersistTaps={true} // 点在当前输入框外不隐藏键盘
        scrollEventThrottle={200} // 解决android不能手指滚动界面的问题
        style={[styles.container, this.props.style]}>
        {/* title 标题 */}
        <Widget.TextInputInline
          name='title'
          title='title'
          validations='isRequired,isLength:[1,50]'
          validateOnBlur={true}
          maxLength={50}
          style={[styles.textInput, styles.titleInput]}
          placeholderTextColor='#B9B9B9'
          placeholder='Please input title(limit 50 character)'
        />
        {/* married 已婚 */}
        <Widget.SwitchInline
          name='married'
          title='married'
          defaultValue={false}
          onTintColor='#F59E21'
          validations='isRequired'
        />
        {/* sex 性别 */}
        <Widget.SexLinkInline
          name='sex1'
          title='sex1'
          validations='isRequired'
          placeholder='Please select sex'
          />
        {/* sex 性别 */}
        <Widget.PickerIOSLinkInline
          name='sex2'
          title='sex2'
          validations='isRequired'
          placeholder='Please select sex'
          items={{'female': 'Female/Woman', 'male': 'Male/Man'}}
          />
        {/* sex 性别 */}
        <Widget.PickerLinkInline
          name='sex3'
          title='sex3'
          validations='isRequired'
          placeholder='Please select sex'
          items={{'female': 'Female/Woman', 'male': 'Male/Man'}}
          />
        {/* date 日期 */}
        <Widget.DateIOSLinkInline
          name='date'
          title='date'
          validations='isRequired'
          placeholder='please select date'
          />
        {/* place 地点 */}
        <Widget.MapLinkInline
          name='place'
          title='place'
          validations='isRequired'
          placeholder='please select place'
          />
        {/* content 内容 */}
        <Widget.TextInput
          name='content'
          title='content'
          validations='isRequired,isLength:[1,200]'
          validateOnBlur={true}
          maxLength={200}
          style={[styles.textInput, styles.contentInput]}
          placeholderTextColor='#B9B9B9'
          placeholder='Please input content'
          onFocus={() => this.refs.form.scrollTo({y: 60})}
          multiline={true}
        />
      </Form>
    );
  }
});

var SKFormExample = React.createClass({
  render() {
    return (
      <SKNavigator
        initialRoute={{ // 初始路由
           title: 'Home',
           component: Home,
           passProps: {
             ref: (ref) => this.home = ref,
           },
           rightButtonTitle: 'submit',
           onRightButtonPress: () => this.home.submit(),
         }}/>
    )
  }
})

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textInput:{
    fontSize: 15,
  },
  titleInput: {
    flex: 1,
    color: 'black',
  },
  contentInput: {
    marginLeft: 10,
    height: 160,
    color: '#5E5D5D',
  },
};

AppRegistry.registerComponent('SKFormExample', () => SKFormExample);
