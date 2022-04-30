import React, { Component } from "react";
import NewsItem from "../newsItem/NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    county: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(str) {
    const firstCP = str.codePointAt(0);
    const index = firstCP > 0xffff ? 2 : 1;

    return String.fromCodePoint(firstCP).toUpperCase() + str.slice(index);
  }
 

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = ` ${this.capitalizeFirstLetter(
      this.props.category
    )} -NewsMonk`;
  }

  async newsUpdate() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ee9a73b835c4732a3c5a7874cea45f6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.newsUpdate();
  }
  onClickPrevious = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.newsUpdate();
  };
  onClickNext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.newsUpdate();
  };
  fetchMoreData =async () => {
    this.setState({page:this.state.page +1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ee9a73b835c4732a3c5a7874cea45f6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat( parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      
      <div className="container my-3 ">
        <h1 className="text-center my-3">
          NewsMonk-{this.capitalizeFirstLetter(this.props.category)} Top
          Hedlines
        </h1>
       { this.state.loading && <Spiner />}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spiner />}
          >
            <div className="container">
        <div className="row" style={{justifyContent:"center"}}>
       
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3 mx-2" key={element.url}>
                  <NewsItem
                    newsUrl={element.url}
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUlr={element.urlToImage}
                    author={!element.author ? "unkonwn" : element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
         
        </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
