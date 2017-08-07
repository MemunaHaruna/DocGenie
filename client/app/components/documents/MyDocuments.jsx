import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { viewAllDocuments, changeCurrentDocument, deleteDocument }
  from '../../actions/documentActions';
import CreateDocument from './CreateDocument.jsx';
import DocumentCard from './DocumentCard.jsx';

/**
* @description - This component maps through a user's own documents and renders
* each document as a DocumentCard component
* @export
* @class MyDocuments
* @extends {React.Component}
*/
export class MyDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 6,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
  * @description -react lifecycle method which is invoked immediately the
  * component mounts
  * @memberOf MyDocuments
  */
  componentDidMount() {
    const { limit, offset } = this.state;
    const userId = this.props.user.id;
    const url =
     `/api/users/${userId}/documents/?limit=${limit}&offset=${offset}`;
    this.props.viewAllDocuments(url);
  }

  /**
  * @description - triggers changeCurrentDocument action
  * @param {object} document
  * @memberOf MyDocuments
  */
  editDocument(document) {
    this.props.changeCurrentDocument(document);
  }

  /**
  * @description Allows user navigate pages by changing limit and offset
  * @param  {object} page
  * @return {void}
  */
  handlePageChange(page) {
    const { limit } = this.state;
    const selected = page.selected;
    const { id: userId } = this.props.user;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      const url =
      `/api/users/${userId}/documents/?limit=${limit}&offset=${offset}`;
      this.props.viewAllDocuments(url);
    });
  }

  /**
  * render, react lifecyle method
  * @returns a DOM element
  * @memberOf MyDocuments
  */
  render() {
    const { id: userId } = this.props.user;
    const url =
     `/api/users/${userId}/documents/?
     limit=${this.state.limit}&offset=${this.state.offset}`;
    return (
      <div className="dashboard-container">
        <div className="row my-documents">
          <h4 className="my-documents-text">MY DOCUMENTS</h4>
          <span className="col s2 my-documents-icon">
            <a href="#create-form"
              className="btn-floating btn-large waves-effect red right"
              onClick={() => this.editDocument()}>
              <i className="material-icons">add</i>
            </a>
          </span>
          <CreateDocument limit={this.state.limit} offset={this.state.offset}
            url={url}/>
        </div>
        <div className="col s12">
          <div className="row" style={{ fontSize: '15px' }}>
            <div className="col s10 offset-s1">
              {this.props.documents && this.props.documents.map((document, i) =>
                (
                <DocumentCard index={i} document={document} key={document.id}
                  limit={this.state.limit}
                  offset={this.state.offset} url={url}/>
                )
              )}
              {this.props.documents && this.props.documents.length === 0 &&
              <div className="center-align">
                <h5>Aww shucks, No documents found
                </h5>
              </div>}
            </div>
          </div>

          {/* pagination */}
          {this.props.documents && this.props.documents.length === 0 ? '' :
            (<div className="center-align">
              <ReactPaginate
                previousLabel={<i className="material-icons">chevron_left</i>}
                nextLabel={<i className="material-icons">chevron_right</i>}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={this.props.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active page-list'} />
            </div>
            )}
        </div>
      </div>
    );
  }
}
// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    documents: state.documents.documents,
    pages: state.documents.pages,
    currentPage: state.documents.currentPage,
    user: state.user.currentProfile
  };
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    viewAllDocuments: url =>
      dispatch(viewAllDocuments(url)),
    changeCurrentDocument: document =>
      dispatch(changeCurrentDocument(document)),
    deleteDocument: document => dispatch(deleteDocument(document)),
  };
};

MyDocuments.propTypes = {
  documents: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  changeCurrentDocument: PropTypes.func.isRequired,
  viewAllDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDocuments);
