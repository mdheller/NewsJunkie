var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link;

var Categories = require('./categories'),
    Util = require('../util/api_util');

var Sidebar = React.createClass({
  render: function () {
    return (
      <div className="sidebar-container group">
        <ul className="sidebar-top-links">
          <li className="category-item-sandwich">
            <div className="list-icon-all"></div>
            <Link className="category-title" to={'/'}>Today</Link>
          </li>
          <li className="category-item-sandwich">
            <div className="list-icon-all"></div>
            <Link className="category-title" to={'/'}>Popular</Link>
          </li>
        </ul>

        <div className="sidebar-button">
          <Link to={'/add_feed'}>Add Content</Link>
        </div>

        <Categories />

        <ul className="sidebar-controls">
          <div className="sidebar-button">
            <Link to={ '/add_category' }>Add Category</Link>
          </div>

          <div className="sidebar-button">
            <button onClick={Util.logout}>Logout</button>
          </div>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
