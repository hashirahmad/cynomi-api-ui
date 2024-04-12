import * as React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import {HomePage, CreateSleepEntryPage, HistoryPage} from './Pages';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/entry" Component={CreateSleepEntryPage} />
            <Route path="/history" Component={HistoryPage} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App