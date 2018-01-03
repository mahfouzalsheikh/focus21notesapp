/* Footer
 *
 */

import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>Created with <span style={{ color: 'red' }}>&hearts;</span> by <a href="https://github.com/tsoporan/notesapp">tsoporan</a> </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
