/**
 * @description - returns pagination object
 * @param {number} count - document/user count
 * @param {object} rows - rows fetched with Sequelize findAndCountAll query
 * @param {number} limit - limit
 * @param {number} offset - offset
 * @returns {void}
 */
exports.pagination = (count, rows, limit, offset) => ({
  totalCount: count,
  pages: Math.ceil(count / limit),
  currentPage: Math.floor(offset / limit) + 1,
  pageSize: rows.length,
});
