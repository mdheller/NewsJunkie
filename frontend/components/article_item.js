var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    Modal = require('react-modal');

var Util = require('../util/api_util');

var ArticleItem = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false });
  },
  closeModal: function () {
    this.setState({ modalOpen: false })
  },
  openModal: function (callback) {
    this.setState({ modalOpen: true })

    callback();
  },
  strip: function (dirtyString) {
    var container = document.createElement('div');
    var text = document.createTextNode(dirtyString);
    container.appendChild(text);
    return container.innerHTML;
  },
  style: {
    overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(0, 0, 0, 0.4)',
        overflow        : 'hidden'
      },
      content : {
        maxWidth        : '600px',
        width           : '100%',
        height          : '97%',
        margin          : '3% auto 50px auto',
        padding         : '10px 80px 20px 80px',
        display         : 'block',
        top             : '8%',
        left            : 0,
        right           : 0,
        bottom          : 0,
        border          : 'none',
        borderRadius    : 0,
        overflow        : 'scroll'
      }
  },
  createMarkup: function () {
    var content = this.props.article.body;

    return ({ __html: content });
  },
  createBlurb: function () {
    try {
      var blurb = $(this.props.article.body).text().slice(0, 120);
    } catch (e) {
      var blurb = this.strip(this.props.article.body).slice(0, 120);
    }

    return blurb.toString();
  },
  createSharingUrls: function () {
    var articleUrl = this.props.article.url;

    var fb = "`http://www.facebook.com/sharer.php?u=`" + articleUrl;
    var tw = "https://twitter.com/share?url=" + articleUrl;

    return { facebook: fb, twitter: tw };
  },
  markAsRead: function () {
    Util.markAsRead(this.props.article.article_id);
  },
  readStatus: function () {
    if (this.props.article.read) {
      return "read";
    } else {
      return "unread";
    }
  },
  render: function () {
    return (
      <li>
        <div className="article-item"
          onClick={this.openModal.bind(this, this.markAsRead)}>

          <div className="article-image">
            <img src={this.props.article.image_url} />
          </div>
          <div className="article-content">
            <h2 className={this.readStatus()}>{this.props.article.title}</h2>
            <span className="blurb">{this.createBlurb()}</span>
            <span className="meta-data">
              {this.props.article.feed_name} / {this.props.article.pubDate}
            </span>

            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={this.style}>

                <div className="article-view">
                  <h1>
                    <a href={this.props.article.url}  target="_blank">
                      {this.props.article.title}
                    </a>
                  </h1>

                  <span className="meta-data">
                    {this.props.article.feed_name} / {this.props.article.pubDate}
                  </span>

                  <div id="share-buttons">
                    <a
                      href={this.createSharingUrls().facebook}
                      target="_blank">
                      <img
                        src="https://simplesharebuttons.com/images/somacro/facebook.png"
                        alt="Facebook" />
                    </a>

                    <a
                      href={this.createSharingUrls().twitter}
                      target="_blank">
                      <img
                        src="https://simplesharebuttons.com/images/somacro/twitter.png"
                        alt="Twitter" />
                    </a>
                  </div>

                  <article>
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                  </article>

                  <a href={this.props.article.url}  target="_blank">
                    Read More
                  </a>
                </div>

            </Modal>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = ArticleItem;
