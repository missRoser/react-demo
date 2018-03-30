import React, { Component } from 'react';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import './Table.css';
import Button from '../Button/Button';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }


  //排序
  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({sortKey, isSortReverse});
  }

  render() {
    const {list, onDismiss} = this.props;
    const {sortKey, isSortReverse} = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header row w60">
          <span className="col-md-4">
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
            Title
            </Sort>
          </span>
          <span className="col-md-2">
            <Sort
            sortKey={'AUTHOR'}
            onSort={this.onSort}
            activeSortKey={sortKey}
            >
            Author
            </Sort>
          </span>
          <span className="col-md-2">
            <Sort
            sortKey={'COMMENTS'}
            onSort={this.onSort}
            activeSortKey={sortKey}
            >
            Comments
            </Sort>
          </span>
          <span className="col-md-2">
            <Sort
            sortKey={'POINTS'}
            onSort={this.onSort}
            activeSortKey={sortKey}
            >
            Points
            </Sort>
          </span>
          <span className="col-md-2" style={{paddingTop: '6px'}}>
            Archive
          </span>
        </div>
        {reverseSortedList.map((item,i) => {
              return (
                <div key={item.objectID} className="row w60 dis-c">
                  <span className="col-md-4">
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span className="col-md-2">{item.author}</span>
                  <span className="col-md-2">{item.num_comments}</span>
                  <span className="col-md-2">{item.points}</span>
                  <span className="col-md-2">
                    <Button onClick = {() => onDismiss(item.objectID)}
                    >Dismiss</Button>
                  </span>
                </div>
              );
            })}
      </div>
      )
  }
}

const Sort = ({ sortKey, onSort, activeSortKey, children }) => {
  const sortClass = classNames('btn', {'btn-info':sortKey===activeSortKey} );


  return (<Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>)
}
export default Table;