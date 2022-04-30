import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUlr,newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div className="card my-3"  >
        
          <img src={imageUlr} className="card-img-top" alt="..." />
          
          <div className="card-body">
            <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:1}}> {source}</span></h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" className="btn  btn-sm btn-dark">
              Read More
            </a>
            <p className="card-text"><small className="text-muted"> by {author} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
       
       
       
      </div>
    );
  }
}

export default NewsItem;
