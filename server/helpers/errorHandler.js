module.exports = {
  /**
   * @description - filters error from server
   * @param {string} error
   * @returns {string} error - filtered error
   */
  filterSequelizeErrorMessage(error) {
    if (error.indexOf('error:') !== -1) {
      const sliceIndex = 'error:'.length + error.indexOf('error:') + 1;
      return error.slice(sliceIndex);
    }
    return error;
  }
};
