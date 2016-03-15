# react-native-sk-validatable-form

##Why it comes

Inspired by [react-native-gifted-form](https://github.com/FaridSafi/react-native-gifted-form) and [formsy-react](https://github.com/christianalfoni/formsy-react), I appreciate these project, but I want more:

1. Validate form fields in react-native.
2. Easy to add validation rules and messages, and use them with simple syntax.
3. Field's state(value) should be maintained by itself, not by form, but form can get fields' value, not store them.
4. Validation rule should be declarative, it should follow component's declaration, e.g. `<TextInput validations='isRequired,isLength:[1,50]'/>`
5. Each rule binds one error message, when you call a rule everywhere, you don't need write the message everywhere.
6. Field component should be easy to extend, not just traditional input components(e.g. TextInput, Swith), but any other input components.
7. Form scrolls to the focused input component automatically.

So I come up with this project.

##What is it

react-native-sk-validatable-form is a component that wraps your form fields, it’s easy to get their value, validate their value.

There are some concepts you need to know

1. **Form**: Component that represents a form, wraps ScrollView, contains input components, validates/gets their values
2. **Widget**: Component that represents a field, wraps input components(e.g. TextInput/Switch) to accept field's value, validates/get its value, keeps validation error. You can create a Widget class by 2 ways: 1 inherits `WidgetMixin` 2 use `WidgetClassFactory`.
3. **Validation**: Class that parse validation rules and checks the rules.
4. **Message**: Helper that contains every rule's error message template, and translates it into real message.

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
var { WidgetMixin, Form, Widget, Message } = require('react-native-sk-validatable-form');

// Message.setLanguage('cn');

var Home = React.createClass({
  submit(){
    var title, msg;
    if(this.refs.form.validate()){ // validate form (validate all fields' value in form)
      title = 'Success';
      msg = 'validate success';
    }else{
      title = 'Fail';
      msg = this.refs.form.getErrorMessages().join('\n'); // get all fields' validation error message
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
        keyboardShouldPersistTaps={true}
        scrollEventThrottle={200}
        style={[styles.container, this.props.style]}>
        {/* title 标题 */}
        <Widget.TextInputInline
          name='title' // field name
          title='title' // field title
          validations='isRequired,isLength:[1,50]' // field's validation rules
          validateOnBlur={true} // validate when input component blurs / onBlur() happens
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

```

![](https://raw.githubusercontent.com/shigebeyond/react-native-sk-validatable-form/master/demo.gif)


##Form Component

Form wraps ScrollView, contains widgets, validates/gets their values, and scrolls to the focused input component automatically.

### Form's properties

Any [ScrollView property](http://facebook.github.io/react-native/docs/scrollview.html)

### Form's methods

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


##Widget Component(WidgetMixin)

### Widget's properties

Any property of input component(e.g. TextInput/Switch) which widget wraps(Widget will pass these properties to input component).

And the following:

| Prop | Description | Default |
|---|---|---|
|**`name`**|Field name. |*None*|
|**`title`**|Field title. |*None*|
|**`defaultValue`**|Field's default value. |*None*|
|**`validations`**|Field's validation rules. |*None*|
|**`validateOnBlur`**|Validate when input component blurs / onBlur() happens. |*false*|

### Widget's methods

| Method | Description | Params |
|---|---|---|
|**`setValue(value)`**|Set current field's value. |*None*|
|**`getValue()`**|Get current field's value. |*None*|
|**`validate()`**|Validate current field' value. |*None*|
|**`getErrorMessage()`**|Get current field' validation error message. |*None*|

### How to define a widget

#### 1 inherits `WidgetMixin`

```javascript
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
```

#### 2 use `WidgetClassFactory`

`WidgetClassFactory` is a helper to define a widget, with the same inplements as above(1 inherits `WidgetMixin`).

`create()` method needs 3 parameters:

1 input component

2 value change callback (e.g. TextInput.onChangeText / Switch.onValueChange)

3 value property (e.g TextInput.value / Switch.value)

```javascript
var TextInputWidget = WidgetClassFactory.create(TextInput, 'onChangeText', 'value');
```

### Widegt's uses

```javascript
<TextInputWidget
  name='title' // field name
  title='title' // field title
  validations='isRequired,isLength:[1,50]' // field's validation rules
  validateOnBlur={true} // validate when input component blurs / onBlur() happens
  />
```

### Validation rules string

```javascript
validations='isRequired,isLength:[1,50]'
```

`validations` contains validation rules, which is defined in [validator](https://github.com/chriso/validator.js#validators) or you can define it yourself by [Validation.addValidator(rule, func)](#validations-method).

Multiple rules are split by `,`. One rule contains name and parameters which are split by `:`.

## Validation Class

Validation is a class that contains validation rules, and will check the rules.

### Validation's methods

| Method | Description | Params |
|---|---|---|
|**`static addValidator(rule, func)`**|Add a rule validator, which is used by [Validation rules string](#validation-rules-string) |*None*|
|**`static parse(validations)`**|Parse [validation rules string](#widgets-uses) (into a Validation object). |*None*|
|**`check(value, values)`**|check the rules, called by [WidgetMixin.validate()](#widgets-methods) |*None*|

## Message helper

Message is a helper to offer error message for a rule.

### Message's methods

| Method | Description | Params |
|---|---|---|
|**`setLanguage(language, messages = null)`**|Toggle language, only support cn(chinese) and en(english), you can add your implements by parameter `messages`. |*None*|
|**`addMessage(rule, messageTemplate)`**|add a message for a rule. |*None*|

### Add a message

```javascript
Message.addMessage('isEmail', '{TITLE} must be an email');
Message.addMessage('equalsToPassword', '{TITLE} must be an {password}');
```

In `Message.addMessage(rule, messageTemplate)`, messageTemplate is a string template which contains parameter and will be translated when showing a error message.

About messageTemplate parameters, `{TITLE}` represents current field's title, `{xxx}` represents 'xxx' field's title.