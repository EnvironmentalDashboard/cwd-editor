import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import MessageEditor from './MessageEditor.js';

const api = require('./api.js');

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      views: [],
      currentView: 0
    }
  }

  componentDidMount() {
    api.fetch('views')
    .then(
      result => this.setState({ views: result, currentView: 0 })
    );
  }

  render() {
    const { views, currentView } = this.state;

    return (
      <div className="Editor">
        <AppBar position="static">
          <Tabs
            onChange={(e, value) => this.setState({ currentView: value })}
            value={currentView}
          >
            {views.map(v => (
              <Tab label={v.view.name} />
            ))}
          </Tabs>
        </AppBar>
        <MessageEditor
          id={views.length > 0 && views[currentView]._id}
        />
      </div>
    )
  }
}

export default Editor;
