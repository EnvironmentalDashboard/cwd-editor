import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const api = require('./api.js');

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      views: []
    }
  }

  componentDidMount() {
    api.fetch('views')
    .then(
      result => this.setState({ views: result })
    );
  }

  render() {
    const { views } = this.state;

    return (
      <div className="Editor">
        <Tabs
          onChange={e => this.setState({ views: [...this.state.views, this.state.views[0]] })}
        >
          {views.map(v => (
            <Tab label={v.view.name} />
          ))}
        </Tabs>
        {views.map((v, index) => (
          <div className="view">
            {v.view.name}{index}
          </div>
        ))}
      </div>
    )
  }
}

export default Editor;
