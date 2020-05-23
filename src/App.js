import React from 'react';
import { Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import Editor from './Editor.js';

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <Editor />
      </SnackbarProvider>
    </div>
  );
}

export default App;
