
'use strict';
import React, {
  AppRegistry,
  Alert,
} from 'react-native';

var {SKNavigator} = require('react-native-sk-navigator');
var { WidgetMixin, Form, Widget, formStyle } = require('react-native-sk-validatable-form');

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
        {/* sex 性别 */}
        <Widget.SexLink
          name='sex'
          title='sex'
          validations='isRequired'
          placeholder='Please select sex'
          />
        {/* date 日期 */}
        <Widget.DateLink
          name='date'
          title='date'
          validations='isRequired'
          placeholder='please select date'
          />
        {/* place 地点 */}
        <Widget.MapLink
          name='place'
          title='place'
          validations='isRequired'
          placeholder='please select place'
          />
        {/* content */}
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
  value: {
    flex: 1,
    fontSize: 15,
  },
  textInput:{
    // padding: 6,
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
    // backgroundColor: 'green',
  },
};

AppRegistry.registerComponent('SKFormExample', () => SKFormExample);
