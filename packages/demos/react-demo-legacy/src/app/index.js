const path = require('path');
const React = require('react');

const Header = require('./header');
const Container = require('./container');
const LegacyComponent = require('demo-fixtures/legacy');
const CompatComponent = require('demo-fixtures/compat');

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
    return (
      <Container {...this.state}>
        <Header/>
        <div>
          <label>color</label>
          <input
            type="text"
            value={this.state.color}
            onChange={e => this.setState({color: e.target.value})}
          />
          <label>size</label>
          <input
            type="number"
            value={this.state.size}
            onChange={e => this.setState({size: Number(e.target.value)})}
          />
        </div>
        <h4>Legacy Component</h4>
        <LegacyComponent/>
        <h4>Compat Component</h4>
        <CompatComponent/>
      </Container>
    );
  }
}

module.exports = App;
