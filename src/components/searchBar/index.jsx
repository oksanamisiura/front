import * as React from 'react';

import SearchIcon from './search-icon';

import './styles.sass';

const SearchBar = ({
  action,
  method,
  onLoaded
}) => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState({});
  const handleSubmit = React.useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }
      try {
        const url = new URL(`http://localhost:3000${action}`);

        url.searchParams.append('query', query);

        const response = await fetch(url, { method: method });
        const result = await response.json();

        onLoaded(null, result);
      } catch (error) {
        onLoaded(error, null);
      }
      return false;
    },
    [action, method, onLoaded, query]
  );

  const handleChange = React.useCallback(
    (event) => {
      setQuery(event.target.value);
      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <React.Fragment>
      <form action={action} method={method} className="SearchBar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="SearchBar__input"
          placeholder="Поиск по товарам"
          value={query}
          onChange={handleChange}
        />
        <button className="SearchBar__button">
          <SearchIcon />
          <span className="SearchBar__buttonTitle">Найти</span>
        </button>
      </form>
      {_.size(results) > 0 ? (
        <div className="results" />
      ) : null}
    </React.Fragment>
  );
};

SearchBar.defaultProps = {
  method: 'GET'
};

// class SearchBar extends React.Component {
//   static defaultProps = {
//     method: 'GET'
//   };
//
//   state = {
//     query: '',
//     results: {}
//   };
//
//   handleSubmit = async (event) => {
//     if (event) {
//       event.preventDefault();
//     }
//     try {
//       const url = new URL(`http://localhost:3000${this.props.action}`);
//
//       url.searchParams.append('query', this.state.query);
//
//       const response = await fetch(url, { method: this.props.method });
//       const result = await response.json();
//
//       this.props.onLoaded(null, result);
//     } catch (error) {
//       this.props.onLoaded(error, null);
//     }
//     return false;
//   }
//
//   handleChange = (event) => {
//     this.setState({ query: event.target.value }, () => {
//       this.handleSubmit();
//     });
//   }
//
//   render = () => (
//     <React.Fragment>
//       <form action={this.props.action} method={this.props.method} className="SearchBar" onSubmit={this.handleSubmit}>
//         <input
//           type="text"
//           className="SearchBar__input"
//           placeholder="Поиск по товарам"
//           value={this.state.query}
//           onChange={this.handleChange}
//         />
//         <button className="SearchBar__button">
//           <SearchIcon />
//           <span className="SearchBar__buttonTitle">Найти</span>
//         </button>
//       </form>
//       {_.size(this.state.results) > 0 ? (
//         <div className="results" />
//       ) : null}
//     </React.Fragment>
//   );
// }

export default SearchBar;
