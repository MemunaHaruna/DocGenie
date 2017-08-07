import React from 'react';
import renderHtml from 'react-render-html';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findADocument } from '../../actions/documentActions';

/**
 * @description - displays full content of one document when user
 * clicks on viewMore link in DocumentCard Component
 * @export
 * @class ViewOneDocument
 * @extends {React.Component}
 */
export class ViewOneDocument extends React.Component {
  /**
   * @description - react lifecycle method which is invoked immediately the
   * component mounts
   * @memberOf ViewOneDocument
   */
  componentDidMount() {
    this.props.findADocument(this.props.params.id);
  }

  /**
   * @description - render, react lifecyle method
   * @returns a DOM element
   * @memberOf ViewOneDocument
   */
  render() {
    const { document } = this.props;
    return (
      <div className="container">
        <div className="row viewOneDocument">
          {document &&
            <div className="col s10 offset-s1">
              <h4>{document.title}</h4>
              <p className="center-align">
                <i>
                  <b>Date Published: </b> {document.createdAt.slice(0, 10)}
                </i>
              </p>
              <hr/>
              <div className="row">
                <p className="col s6">
                  <i>
                    <b>Created by: </b> {document.user.fullname}
                  </i>
                </p>
                <p className="col s6">
                  <i>
                    <b>Access: </b>
                    {document.access === 0 && 'Public'}
                    {document.access === -1 && 'Private'}
                    {document.access === 1 && 'Role'}
                    {document.access === 2 && 'Role'}
                  </i>
                </p>

              </div>
              <span id="doc-content">{renderHtml(document.content)}</span>
            </div>}
        </div>
      </div>
    );
  }
}
// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    document: state.documents.document,
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    findADocument: id => dispatch(findADocument(id)),
  };
};

ViewOneDocument.propTypes = {
  documents: PropTypes.array,
  findADocument: PropTypes.func.isRequired,
  document: PropTypes.object,
  params: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOneDocument);
