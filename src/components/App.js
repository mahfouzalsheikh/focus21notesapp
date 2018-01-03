/* App
 *
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import NotesList from './notes/List';
import NotesNew from './notes/New';
import NotesDetail from './notes/Detail';

class App extends Component {

  render() {
    return (
      <div id="app" className="container">

        <Router>
          <div>
            <Header />

            <div className="main">
              <Switch>
                <Route exact path="/" component={NotesList} />
                <Route exact path="/notes/new" component={NotesNew} />
                <Route path="/notes/:id" component={NotesDetail} />

                <Route render={
                  ({ location }) => (
                    <strong> Nothing matched {location.pathname} :( </strong>
                  )}
                />
              </Switch>
            </div>

            <Footer />

          </div>
        </Router>

      </div>
    );
  }
}

export default App;
