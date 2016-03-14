var React = require('react-native');
var {
  Picker
} = React;

var LinkMixin = require('./LinkMixin');

// 选项选择器
var Selector = React.createClass({
  getInitialState() {
    return {
      value: undefined,
    };
  },
  render() {
    var {items} = this.props;
    return (
      <Picker
        selectedValue={this.state.value}
        onValueChange={(value) => this.setState({value})}>
        {Object.keys(items).map((value) => (
          <Picker.Item
            key={value}
            value={value}
            label={items[value]}
          />
        ))}
      </Picker>
    );
  },
});

// 日期选择器的链接
var PickerLink = React.createClass({
  mixins: [LinkMixin],
  onPress(){
    this.props.navigator.push({
      title: this.props.title || 'Select Date',
      component: Selector,
      passProps: {
        ref: (ref) => this.selector = ref,
        items: this.props.items,
      },
      rightButtonTitle: 'done',
      onRightButtonPress: () => {
        this.onChange(this.selector.state.value);
        this.props.navigator.pop();
      },
    });
  },
  displayValue(value){
    return this.props.items[value];
  }
});

module.exports = PickerLink;
