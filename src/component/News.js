import React, { useState, useEffect } from "react";
import NewsItem from "../newsItem/NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


 const News =(props)=> {
 
 const capitalizeFirstLetter=(str)=> {
    const firstCP = str.codePointAt(0);
    const index = firstCP > 0xffff ? 2 : 1;

    return String.fromCodePoint(firstCP).toUpperCase() + str.slice(index);
  }
 const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0)
// document.title = ` ${capitalizeFirstLetter(
//  props.category
// )} -NewsMonk`;
  


  const newsUpdate= async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4ee9a73b835c4732a3c5a7874cea45f6&page=${page}&pageSize=${props.pageSize}`;
   setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    document.title = ` ${capitalizeFirstLetter(
 props.category
)} -NewsMonk`;
  
  }
  useEffect(() => {
    newsUpdate();
  }, [])
  
 
  const fetchMoreData =async () => {
   setPage(page +1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4ee9a73b835c4732a3c5a7874cea45f6&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat( parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
   
  };

  
    return (
      
      <div className="container my-3 ">
        <h1 className="text-center my-3">
          NewsMonk-{capitalizeFirstLetter(props.category)} Top
          Hedlines
        </h1>
       {loading && <Spiner />}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !==totalResults}
            loader={<Spiner />}
          >
            <div className="container">
        <div className="row" style={{justifyContent:"center"}}>
       
            {articles.map((element) => {
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
 News.defaultProps = {
  county: "in",
  pageSize: 6,
  category: "general",
}
 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
