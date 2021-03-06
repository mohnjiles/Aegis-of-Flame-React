import React, { Component } from 'react';
import { getNews } from '../utils/api';
import { Panel } from 'react-bootstrap';
import { getYoutubeId } from '../utils/utils';
import YouTube from 'react-youtube';
import { Markdown } from 'react-showdown';


class News extends Component {

  constructor(props) {
    super(props);
    this.state = { news: [] };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    getNews().then(news => {

      let theNews = news.map((news) => {
        let id = getYoutubeId(news.content);
        if (id !== false) {
          news.youtubeId = id;
        }
        return news;
      });

      this.setState({news: theNews});
    });
  }


  render() {
    return (
      <div>
        <Panel header="News" bsStyle="primary">
          {
            this.state.news.map((news, index) => {

              let youtube;
              if (news.youtubeId != null) {
                const opts = {
                  height: '300',
                  width: '98%'
                };
                youtube = <YouTube
                  videoId= {news.youtubeId}
                  opts = {opts}
                />
              }

              return (
                <div className="row news-item" key={index}>
                  <div className="col-md-12">
                    <div className="row">
                      <h2 className="news-title">{news.title}</h2>
                    </div>
                    <div className="row">
                      <Markdown markup={news.content}/>
                    </div>
                    <div className="row">
                      {youtube}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Panel>
      </div>
    )
  }
}

export default News;
