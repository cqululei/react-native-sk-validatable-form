# react-native-sk-validatable-form

##Why it comes

Inspired by [react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form) and [formsy-react](https://github.com/christianalfoni/formsy-react), I appreciate these project, but I want more:

1. Validate form fields in react-native.
2. Easy to add validation rules and messages, and use them with simple syntax.
3. Field's state(value) should be maintained by itself, not by form, but form can get fields' value, not store them.
4. Validation rule should be declarative, it should follow component's declaration, e.g. `<TextInput validations='isRequired,isLength:[1,50]'/>`
5. Each rule has a error message, when you call a rule everywhere, you don't need write the message everywhere.
6. Field component should be easy to extend, not just traditional input components(e.g. TextInput, Swith), but any other input components

So I come up with this project.

##What is it

react-native-sk-validatable-form is a component that wraps your form fields, it’s easy to get their value, validate their value.

There are some concepts you need to know

1. **Form**: Component that wraps ScrollView, contains input components, validates/gets their values
2. **Widget**: Component that wraps input components(e.g. TextInput/Switch), validates/get its value, keeps validation error. You can create a Widget class by 2 ways: 1 inherits **WidgetMixin** 2 use **WidgetClassFactory**.
3. **Validation**: Class that parse validation rules and checks the rules.
4. **Message**: Util that contains every rule's error message template, and translates it into real message.

##How to use it

### Example

1. `npm install react-native-sk-validatable-form@latest --save`

2. Write this in index.ios.js / index.android.js

```javascript


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

```
![](https://raw.githubusercontent.com/shigebeyond/react-native-sk-validatable-form/master/demo.gif)

##Form's roperties

Any [ScrollView property](http://facebook.github.io/react-native/docs/scrollview.html)

##Form's methods

| Method | Description | Params |
|---|---|---|
|**`registerInput(widget)`**|Remember a input widget. |*None*|
|**`unregisterInput(widget)`**|Forget a input widget. |*None*|
|**`scrollTo(...)`**|Delegate ScrollView's method `scrollTo()`. |*None*|
|**`scrollToFocusedInput(input)`**|Scroll to the focuse input widget. |*None*|
|**`getTitles()`**|Get all fields' title. |*None*|
|**`getValues()`**|Get all fields' value. |*None*|
|**`validate()`**|Validate all fields' value. |*None*|
|**`getErrorMessages()`**|Get all fields' validation error message. |*None*|

##Widget's methods

| Method | Description | Params |
|---|---|---|
|**`setValue(value)`**|Set current field' value. |*None*|
|**`getValue()`**|Get current field' value. |*None*|
|**`validate()`**|Validate current field' value. |*None*|
|**`getErrorMessage()`**|Get current field' validation error message. |*None*|
