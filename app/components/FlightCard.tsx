'use client';

import { Flight } from '../types/flight';
import moment from 'moment';

type FlightCardProps = {
  flight: Flight;
};

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md flex flex-row justify-between'>
      <div>
        <div className='text-xl font-semibold'>
          {flight.departureAirport.code} {`(${flight.departureAirport.name})`} -{' '}
          {flight.arrivalAirport.code} {`(${flight.arrivalAirport.name})`}
        </div>
        <div className='mb-4'>
          {moment(flight.departureTime).format('YYYY-MM-DD HH:mm')}
        </div>
        <div className='mb-4'>
          <strong>Uçuş Süresi:</strong> {Math.trunc(flight.duration / 60)} saat{' '}
          {flight.duration % 60} dakika
        </div>
        <div className='mb-4'>
          <strong>Fiyatı:</strong> {flight.price}
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='text-gray-600'>{flight.airline}</div>

        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Uçuşu Seç
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
