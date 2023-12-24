'use client';
import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import FlightSearchForm from './components/FlightSearchForm';
import Hero from './components/Hero';
import FlightCard from './components/FlightCard';
import { Flight } from './types/flight';



interface SearchResult {
  departure: Flight[];
  return: Flight[];
}

const sortFunctions: Record<string, (flights: Flight[]) => Flight[]> = {
  price: (flights) => flights.sort((a, b) => a.price - b.price),
  departureTime: (flights) =>
    flights.sort(
      (a, b) =>
        new Date(a.departureTime).getTime() -
        new Date(b.departureTime).getTime()
    ),
  duration: (flights) => flights.sort((a, b) => a.duration - b.duration),
};

export default function Home() {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [sortBy, setSortBy] = useState<string>('price');
  const [sortedDeparture, setSortedDeparture] = useState<Flight[] | null>(null);
  const [sortedReturn, setSortedReturn] = useState<Flight[] | null>(null);

  const handleSortChange = (selectedSortBy: string) => {
    setSortBy(selectedSortBy);
  };

  useEffect(() => {
    setSortedDeparture([]);
    setSortedReturn([]);
    const sortResults = () => {
      if (results && sortFunctions[sortBy]) {
        setSortedDeparture(sortFunctions[sortBy](results.departure));
        setSortedReturn(sortFunctions[sortBy](results.return));
      }
    };

    sortResults();
  }, [sortBy, results]);

  return (
    <Container>
      <Hero />
      <FlightSearchForm setResults={setResults} />
      {sortedDeparture && sortedDeparture.length > 1 && (
        <div className='flex gap-4'>
          <label htmlFor='sortBy'>Sort by: </label>
          <select
            id='sortBy'
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value='price'>Price</option>
            <option value='departureTime'>Departure Time</option>
            <option value='duration'>Duration</option>
            {/* Additional sorting options can be added here */}
          </select>
        </div>
      )}
      {sortedDeparture && sortedDeparture.length > 1 && (
        <div className='gap-2 flex flex-col'>
          <h1 className='text-xl text-bold mt-4'>Departure</h1>
          {sortedDeparture.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
      {sortedReturn && sortedReturn?.length > 1 && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl text-bold mt-4'>Return</h1>
          {sortedReturn.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </Container>
  );
}
