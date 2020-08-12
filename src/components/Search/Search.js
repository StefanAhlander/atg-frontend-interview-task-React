import React, { useState } from 'react';
import './Search.css';

import Races from '../Races/Races';
import Results from '../Results/Results';

import { useFetch } from '../../hooks/useFetch';

const Search = () => {
  let upcoming, results;
  const [searchValue, setSearchValue] = useState('V75');

  const { response, error, isLoading } = useFetch(
    `https://www.atg.se/services/racinginfo/v1/api/products/${searchValue}`
  );

  if (response) {
    upcoming = response.upcoming;
    results = response.results;
  }

  const handleChange = event =>
    setSearchValue(event.target.value);

  return (
    <div className="Search">
      <h1>ATG Game Tracker</h1>
      <form>
        <label>Search for upcomming races or results </label>
        <select
          defaultValue={searchValue}
          onChange={handleChange}>
          <option>V75</option>
          <option>V65</option>
          <option>V64</option>
          <option>V4</option>
        </select>
      </form>

      <h2>{searchValue}</h2>
      <h3>{
        (upcoming && new Date(upcoming[0]['startTime']).toLocaleDateString()) ||
        (results && new Date(results[0]['startTime']).toLocaleDateString())
      }</h3>

      {isLoading && <h3>Loading...</h3>}

      {upcoming && <Races gameId={upcoming[0]['id']} />}

      {(!upcoming && results) && <Results gameId={results[0]['id']} />}

      <div className="Error">
        {error && <h3>Something went wrong. Please try again.</h3>}
      </div>
    </div>
  );
};

export default Search;
