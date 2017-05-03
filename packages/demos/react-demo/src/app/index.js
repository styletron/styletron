const path = require('path');
const React = require('react');

const Header = require('./header');
const Container = require('./container');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 10,
    };
    const urlColor = path.basename(props.path);
    if (urlColor) {
      this.state.color = urlColor;
    }
  }
  logRules() {
    console.log(document.querySelector('.styletron').sheet.cssRules);
  }
  render() {
    return (
      <Container {...this.state}>
        <Header />
        <div>
          <label>color</label>
          <input
            type="text"
            value={this.state.color}
            onChange={e => this.setState({ color: e.target.value })}
          />
          <label>size</label>
          <input
            type="number"
            value={this.state.size}
            onChange={e => this.setState({ size: Number(e.target.value) })}
          />
        </div>
        <button onClick={this.logRules}>log sheet rules</button>
      </Container>
    );
  }
}

module.exports = App;
