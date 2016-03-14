var React = require('react-native');
var {
  PickerIOS
} = React;

var LinkMixin = require('./LinkMixin');

// 选项选择器
var SelectorIOS = React.createClass({
  getInitialState() {
    return {
      value: undefined,
    };
  },
  render() {
    var {items} = this.props;
    return (
      <PickerIOS
        selectedValue={this.state.value}
        onValueChange={(value) => this.setState({value})}>
        {Object.keys(items).map((value) => (
          <PickerIOS.Item
            key={value}
            value={value}
            label={items[value]}
          />
        ))}
      </PickerIOS>
    );
  },
});

// 日期选择器的链接
var PickerIOSLink = React.createClass({
  mixins: [LinkMixin],
  onPress(){
    this.props.navigator.push({
      title: this.props.title || 'Select Date',
      component: SelectorIOS,
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

module.exports = PickerIOSLink;
