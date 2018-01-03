/* Note Detail
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import { removeNote, updateNote } from '../../actions/notes';
import { API_BASE_URL } from '../../config';
import '../../styles/Notes.css';


const getNote = (notes, id) => {
  // Returns a specific note
  return notes.find(note => note._id === id);
};

const mapStateToProps = (state, ownProps) => {
  // Comes from router provided props
  const noteId = ownProps.match.params.id;

  return {
    note: getNote(state.notes, noteId),
  };
};

class NotesDetail extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      posted: false,
      error: '',
      body: props.note.body,
      newText: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.newText.length) {
      this.setState({ error: 'No text to update' });
      return;
    }

    // Only if text differs do we save
    if (this.state.newText === this.state.body) {
      this.setState({ error: 'Text hasn\'t changed!' });
      return;
    }

    const dispatch = this.props.dispatch;
    const noteId = this.props.match.params.id;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });


    // Update server then update the store
    fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers,
      body: 'text=' + encodeURIComponent(this.state.newText),
    })
    .then(response => response.json())
    .then(() => {
      dispatch(
        updateNote(
          noteId,
          this.state.newText,
        ),
      );
      // Redirect when we're done
      this.setState({ posted: true, error: '' });
    });
  }

  handleChange(e) {
    // Capture new text
    this.setState({ newText: e.target.value });
  }

  handleRemove(e) {
    e.preventDefault();

    const dispatch = this.props.dispatch;
    const noteId = this.props.match.params.id;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Remove from server first then update the store
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

        // Redirect when we're done
        this.setState({ posted: true });
      });
  }

  render() {
    return (
      <div className="note-area">

        <section className="section">

          <h3 className="title is-3">Edit Note</h3>
          <hr />

          <form onSubmit={this.handleSubmit}>
            <p className="control">
              <textarea
                className="textarea"
                onChange={this.handleChange}
                defaultValue={this.state.body}
              />
              { this.state.error &&
                <p><span className="help is-danger">{this.state.error}</span></p>
              }
            </p>

            <div className="control is-grouped">
              <p className="control">
                <button
                  onClick={this.handleRemove}
                  className="button is-danger is-outlined"
                >
                    Delete
                </button>
              </p>
              <p className="control">
                <input className="button is-primary" type="submit" value="Update" />
              </p>
            </div>
          </form>

        </section>

        { this.state.posted && <Redirect to="/" /> }
      </div>
    );
  }
}

NotesDetail.propTypes = {
  note: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  match: React.PropTypes.object.isRequired,
};

NotesDetail = connect(mapStateToProps)(NotesDetail);

export default NotesDetail;
