import React, { Component } from 'react';
import './Search.css';

class Search extends Component{
  componentDidMount() {
    if(this.input){
      this.input.focus();
    }
  }

  render() {
    const { 
      value, 
      onChange, 
      onSubmit, 
      children 
    } = this.props;

    return (
      <div className="w60 clearfix">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="col-sm-2 control-label" style={{paddingTop: '6px'}}>{children}</label>
            <div className="col-sm-8">
              <input
                id="search"
                className="form-control "
                type="text"
                value={value}
                onChange={onChange}
                ref = {(node) => {this.input = node;}}
              />
            </div>
            
            <button className="col-sm-1 btn btn-primary" type="submit">
              {children}
            </button>
          </div>
        </form>
      </div>
    );
  }

}

export default Search;