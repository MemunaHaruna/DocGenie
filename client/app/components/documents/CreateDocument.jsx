import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import { createDocument, editDocument } from '../../actions/documentActions';


/**
 * CreateDocument component which renders the modal for creating documents
 * @export
 * @class CreateDocument
 * @extends {React.Component}
 */
export class CreateDocument extends React.Component {
  constructor(props) {
  // Pass props back to parent
    super(props);
    this.state = { ...props.currentDocument };
    this.handleCreateDocument = this.handleCreateDocument.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * onChange method is triggered once form-input changes
   * @param {object} e, event
   * @memberOf CreateDocument
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * componentWillReceiveProps, React lifecyle method, triggered once the
   * component receives next props
   * @param {object} nextProps
   * @returns nextState
   * @memberOf CreateDocument
   */
  componentWillReceiveProps(nextProps) {
    return this.setState({ ...nextProps.currentDocument });
  }

  /**
   * handleCreateDocument method is invoked on create-document form submit
   * @param {object} event
   * @memberOf CreateDocument
   */
  handleCreateDocument(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const access = event.target.access.value;
    const action = !this.props.currentDocument.id ?
      'createDocument' : 'editDocument';
    this.props[action]({
      title,
      content,
      access,
      user: this.props.user,
      id: this.props.currentDocument.id,
    }).then(() => {
      this.setState({ title: '', content: '', access: '' });
    });
  }

  /**
   * render, React lifecycle method
   * @returns a DOM element
   * @memberOf CreateDocument
   */
  render() {
    const { user, currentDocument, documentError } = this.props;
    const { title, access, content } = this.state;
    return (
      <Modal
        modalOptions={{
          complete: () => {
            this.setState({ title: '', content: '', access: '' });
          }
        }}
        header={!currentDocument.title ? 'Create Document' :
          `Edit: ${currentDocument.title}`} id="create-form">
        <div className="row">
          <form className="col s12 m12" onSubmit={this.handleCreateDocument}
            action="#" id="created-new-document">
            <div className="error-message">{documentError}</div>
            <div className="row">
              <div className="input-field col s12">
                <input name="title" id="title" type="text" className="validate"
                  placeholder="Title" value={title} onChange={this.onChange}/>
                <label htmlFor="title" />
              </div>
            </div>
            <div className="row">
              <select name="access" value={access} className="browser-default"
                onChange={this.onChange}>
                <option value="" disabled selected>Select access</option>
                <option value="0">Public</option>
                <option value="-1">Private</option>
                <option value={user.roleId}>Role</option>
              </select>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea name="content" id="content"
                  className="materialize-textarea"
                  placeholder="Body of document here..."
                  value={content} onChange={this.onChange} />
                <label htmlFor="content" />
              </div>
            </div>
            <button type="submit" className="btn btn-large create-doc right">
              SAVE
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    currentDocument: state.documents.currentDocument || {},
    documentError: state.documents.error,
    userError: state.user.error,
    user: state.user.currentProfile,
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    createDocument: document => dispatch(createDocument(document)),
    editDocument: document => dispatch(editDocument(document))
  };
};

CreateDocument.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  editDocument: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  documentError: PropTypes.string,
};
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
