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

##How to use it

1. `npm install react-native-sk-validatable-form@latest --save`

2. Write this in index.ios.js / index.android.js

```javascript


```
![](https://raw.githubusercontent.com/shigebeyond/react-native-sk-validatable-form/master/demo.gif)

##Form's roperties

Any [ScrollView property](http://facebook.github.io/react-native/docs/scrollview.html)

##Form's methods

| Method | Description | Params |
|---|---|---|
|**`registerInput(widget)`**|Keep a input widget. |*None*|
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
