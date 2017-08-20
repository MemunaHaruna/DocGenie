import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchForDocuments } from '../../actions/documentActions';
import InputField from '../InputField.jsx';

/**
 * @description - displays search input which allows
 * users search for documents
 * @param {object} props
 * @returns {void}
 */
export const SearchDocuments = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    const searchKey = event.target.value;
    const { limit, offset } = props;
    let url;
    if (searchKey) {
      url = `/api/v1/search/documents/?searchKey=${searchKey}&limit=${limit}`;
    } else {
      url = `api/v1/documents/?limit=${limit}&offset=${offset}`;
    }
    props.searchForDocuments(url);
  };
  return (
    <div id="search-docs" className="row search-docs">
      <InputField name="searchKey" type="text" id="searchKey"
        className="validate"
        placeholder="Search for documents here..."
        onChange={handleChange} divClass="col s10" />
    </div>
  );
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    searchForDocuments: searchData => dispatch(searchForDocuments(searchData)),
  };
};

SearchDocuments.propTypes = {
  searchForDocuments: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchDocuments);
