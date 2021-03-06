var React = require('react');

var Util = require('../util/api_util'),
    CategoriesStore = require('../stores/categories');

var EditFeedForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return (
      { categories: "",
        selectedCategory: this.props.routeParams.category_id }
    );
  },
  componentDidMount: function () {
    this.setState({ categories: CategoriesStore.all() });
  },
  handleCategoryChange: function (e) {
    this.setState({ selectedCategory: e.currentTarget.value });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ selectedCategory: newProps.routeParams.category_id })
  },
  unsubscribe: function (e) {
    e.preventDefault();

    Util.destroySubscription(
      { feedId: this.props.routeParams.feed_id,
        categoryId: this.props.routeParams.category_id }
    );
    this.context.router.push("/")
  },
  changeCategory: function (e) {
    e.preventDefault();

    Util.updateSubscription(
      { feedId: this.props.routeParams.feed_id,
        categoryId: this.props.routeParams.category_id,
        selectedCategory: this.state.selectedCategory }
    );
    this.context.router.push("/")
  },
  render: function () {
    if (this.state.categories) {
      var options = this.state.categories.map(function (category, idx) {
        return (
          <option key={idx} value={category.id}>
            {category.name}
          </option>
        );
      });
    }

    return (
      <div className="main-container">
        <div className="form-container">
          <form onSubmit={this.changeCategory}>
            <select
              value={this.state.selectedCategory}
              onChange={this.handleCategoryChange}>
              {options}
            </select>

            <div className="form-controls group">
              <button>Change Category</button>

              <button className="button-danger"
                onClick={this.unsubscribe}>
                Unsubscribe
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditFeedForm;
