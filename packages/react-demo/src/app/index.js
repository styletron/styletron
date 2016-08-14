const path = require('path');
const React = require('react');
const {div, input, label, button} = require('react-fp');

const Header = require('./header');
const Container = require('./container');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 10
    };
    const urlColor = path.basename(props.path);
    if (urlColor) {
      this.state.color = urlColor;
    }
  }
  render() {
    return Container(this.state, [
      Header(),
      div([
        label('color'),
        input({
          type: 'text',
          value: this.state.color,
          onChange: (e) => {
            this.setState({color: e.target.value});
          }
        }),
        label('size'),
        input({
          type: 'number',
          value: this.state.size,
          onChange: (e) => {
            this.setState({size: Number(e.target.value)});
          }
        }),
      ]),
      button({onClick: () => console.log(document.querySelector('style').sheet.cssRules)}, 'log sheet rules')
    ]);
  }
}

module.exports = App;
