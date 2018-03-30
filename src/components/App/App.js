import React, { Component } from 'react';
import Button from '../Button/Button';
import Search from '../Search/Search';
import Table from '../Table/Table';
import Loading from '../Loading/Loading';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

/*
const isSearchd = searchTerm =>{
  return (item) => {
    item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
}
*/
/*function isSearchd(searchTerm){
  return function(item){
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
}*/
const updateSearchTopStoriesState = (hits, page, nbPages) => prevState => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];
    
  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: {hits: updatedHits, page, nbPages} 
    },
    isLoading: false,
  }

}


class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      results: null,
      searchKey: '',//searchKey临时变量存储 searchTerm 是个动态值。
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    
  }


  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  //组合保存数据
  setSearchTopStories(result) {
    const {hits, page, nbPages} = result;

    this.setState(updateSearchTopStoriesState(hits, page, nbPages))
  }

  //发起请求 api
  fetchSearchTopStories(searchTerm,page = 0) {
    this.setState({
      isLoading: true
    });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(e => this.setState({error: e}));
  }

  //搜索按钮
  onSearchSubmit(ev) {
    const {searchTerm} = this.state;

    this.setState({ searchKey: searchTerm});

    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }

    ev.preventDefault();
  }

  //删除某个元素
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({results: {...results,[searchKey]: {hits: updatedHits, page}}});
  }

  //
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm});

    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {results, searchTerm, searchKey, error, isLoading} = this.state;

    const page = (
                  results && 
                  results[searchKey] && 
                  results[searchKey].page
                  ) || 0;

    const nbPages = (
                  results && 
                  results[searchKey] && 
                  results[searchKey].nbPages
                  ) || 0;

    const list = (  
                  results && 
                  results[searchKey] && 
                  results[searchKey].hits
                  ) || [];


    return (
      <div className="App">

        <Search
          value = {searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >搜索</Search>
        
        { error ? <p>出现了一些错误</p> :
          <Table 
            list = {list}
            onDismiss = {this.onDismiss}
          />
        }

        <div className="interactions">
          <span>总页数{nbPages}</span>
          <span style={{margin: '0 20px'}}>当前页数{page+1}</span>

          <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page+1)} className="btn btn-primary">more</ButtonWithLoading>

        </div>

      </div>
    );
  }
}

const withLoading = (Component) => ({isLoading, ...rest}) => 
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);


export default App;