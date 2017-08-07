import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FroalaEditor from 'react-froala-wysiwyg';
import { Modal } from 'react-materialize';
import { createDocument, editDocument, changeCurrentDocument }
  from '../../actions/documentActions';
import InputField from '../InputField.jsx';

// Froala Editor JS files.
require('../../../../node_modules/froala-editor/js/froala_editor.pkgd.min');

const editorConfig = {
  height: 130,
  toolbarButtons: [
    'bold',
    'italic',
    'underline',
    '|',
    'fontFamily',
    'fontSize',
    'color',
    '|',
    'paragraphFormat',
    'align',
    'formatOL',
    'formatUL',
    'outdent',
    'indent',
    'quote',
    'strikeThrough',
    'subscript',
    'superscript',
    '|',
    'insertLink',
    'insertHR',
    'selectAll',
    'clearFormatting',
    '|',
    'spellChecker',
    'help',
    '|',
    'undo',
    'redo'
  ]
};

/**
* @description - renders the modal for creating documents
* @export
* @class CreateDocument
* @extends {React.Component}
*/
export class CreateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.currentDocument };
    this.handleCreateDocument = this.handleCreateDocument.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
  * @description - onChange method is triggered once form-input changes
  * @param {object} event - form data: title, content, access
  * @memberOf CreateDocument
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onContentChange(content) {
    this.setState({ content });
  }
  /**
   * @description - React lifecyle method, triggered once the
   * component receives next props
   * @param {object} nextProps
   * @returns nextState
   * @memberOf CreateDocument
   */
  componentWillReceiveProps(nextProps) {
    return this.setState({ ...nextProps.currentDocument });
  }

  /**
  * @description - handleCreateDocument method is
  * invoked on create-document form submit
  * @param {object} event
  * @memberOf CreateDocument
  */
  handleCreateDocument(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = this.state.content;
    const access = event.target.access.value;
    const action = !this.props.currentDocument.id ?
      'createDocument' : 'editDocument';
    this.props[action]({
      title,
      content,
      access,
      user: this.props.user,
      id: this.props.currentDocument.id,
    }, this.props.url).then(() => {
      this.setState({ title: '', content: '', access: '' });
    });
  }

  /**
   * @description - render, React lifecycle method
   * @returns a DOM element
   * @memberOf CreateDocument
   */
  render() {
    const { user, currentDocument, documentError } = this.props;
    const { title, access, content } = this.state;
    return (
      <Modal
        fixedFooter
        modalOptions={{
          complete: () => {
            this.props.changeCurrentDocument({});
            this.setState({ title: '', content: '', access: '' });
          }
        }}
        header={!currentDocument.title ? 'Create Document' :
          `Edit: ${currentDocument.title}`} id="create-form">
        <div className="row">
          <form className="col s12 doc-form"
            onSubmit={this.handleCreateDocument}
            action="#" id="created-new-document">
            <div className="error-message">{documentError}</div>
            <div className="row">
              <InputField divClass="input-field col s6" name="title"
                id="title" type="text"
                className="validate" placeholder="Enter title" value={title}
                onChange={this.onChange}/>
              <label htmlFor="title" />

              <div className="input-field col s6">
                <select name="access" value={access} className="browser-default"
                  onChange={this.onChange}>
                  <option value="" disabled selected>Select access</option>
                  <option value="0">Public</option>
                  <option value="-1">Private</option>
                  <option value={user.roleId}>Role</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <FroalaEditor
                  tag="textarea"
                  className="content"
                  config={editorConfig}
                  model={content}
                  onModelChange={this.onContentChange}
                />
                <label htmlFor="content" />
              </div>
            </div>
            <button id="save-doc" type="submit"
              className="btn btn-large create-doc right">
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
    createDocument: (document, paginationMetadata) =>
      dispatch(createDocument(document, paginationMetadata)),
    editDocument: (document, paginationMetadata) =>
      dispatch(editDocument(document, paginationMetadata)),
    changeCurrentDocument: document =>
      dispatch(changeCurrentDocument(document)),
  };
};

CreateDocument.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  editDocument: PropTypes.func.isRequired,
  changeCurrentDocument: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  documentError: PropTypes.string,
  url: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
