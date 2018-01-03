/* Note Item
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { removeNote } from '../../actions/notes';
import { API_BASE_URL } from '../../config';
import '../../styles/Notes.css';

class NotesListItem extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    e.preventDefault();

    const dispatch = this.props.dispatch;
    const noteId = this.props.id;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Remove from server then update store
    fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers,
    })
      .then(response => response.json())
      .then(() => {
        dispatch(
          removeNote(
            noteId,
          ),
        );
      });
  }

  render() {
    return (
      <li className="note-item">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Posted { moment(this.props.dateCreated).fromNow() }</p>
          </header>

          <div className="card-content">
            <div className="content">
              { this.props.body.length > 140 ?
                this.props.body.substring(0, 140) + ' ...' :
                this.props.body }
            </div>
          </div>

          <footer className="card-footer">
            <Link to={`notes/${this.props.id}`} className="card-footer-item">Edit</Link>
            <a onClick={this.handleRemove} className="card-footer-item">Delete</a>
          </footer>
        </div>
      </li>
    );
  }
}

NotesListItem.propTypes = {
  body: React.PropTypes.string.isRequired,
  dateCreated: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
};

NotesListItem = connect()(NotesListItem);

export default NotesListItem;
