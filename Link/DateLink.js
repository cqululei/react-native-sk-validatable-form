var React = require('react-native');
var {
  DatePickerIOS
} = React;

var LinkMixin = require('./LinkMixin');

// 日期选择器
var DateSelector = React.createClass({
  getInitialState() {
    return {
      date: new Date(),
    };
  },
  render() {
    return (
      <DatePickerIOS
        style={this.props.style}
        mode="date"
        date={this.state.date}
        onDateChange={(date) => this.setState({date})}
      />
    );
  },
});

// 日期选择器的链接
var DateLink = React.createClass({
  mixins: [LinkMixin],
  onPress(){
    this.props.navigator.push({
      title: this.props.title || 'Select Date',
      component: DateSelector,
      passProps: {
        ref: (ref) => this.dateSelector = ref,
      },
      rightButtonTitle: 'done',
      onRightButtonPress: () => {
        this.onChange(this.dateSelector.state.date);
        this.props.navigator.pop();
      },
    });
  },
  displayValue(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
});

module.exports = DateLink;
