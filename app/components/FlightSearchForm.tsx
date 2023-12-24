// components/FlightSearchForm.tsx
'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import Select from 'react-select';
import qs from 'query-string';
import axios from 'axios';
import Loading from './Loading';

interface AirportOption {
  label: string;
  value: string;
}

interface FormData {
  departureAirport: AirportOption | null;
  arrivalAirport: AirportOption | null;
  departureDate: string;
  returnDate?: string;
  roundTrip: boolean;
}

const airports: AirportOption[] = [
  { label: 'IST - Istanbul', value: 'IST' },
  { label: 'ATL - Atlanta', value: 'ATL' },
  { label: 'LHR - London', value: 'LHR' },
];

interface Props {
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const FlightSearchForm: React.FC<Props> = ({ setResults }) => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    register,
  } = useForm<FormData>({
    defaultValues: {
      departureAirport: null,
      arrivalAirport: null,
      departureDate: '',
      returnDate: '',
      roundTrip: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setResults(null);
    setError(null);
    setLoading(true);
    const query: any = {
      arrivalAirport: data.arrivalAirport?.value,
      departureAirport: data.departureAirport?.value,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
    };

    const url = qs.stringifyUrl(
      {
        url: 'http://localhost:3001/flights',
        query: query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='mt-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-y-4'
      >
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label
              htmlFor='departureAirport'
              className='block text-sm font-medium text-gray-700'
            >
              Kalkış Havalimanı
            </label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  options={airports}
                  isSearchable
                  placeholder='Örn: IST'
                />
              )}
              control={control}
              name='departureAirport'
              rules={{ required: 'Bu alan zorunludur' }}
            />
            {errors.departureAirport && (
              <p className='text-sm text-red-500'>
                {errors.departureAirport.message}
              </p>
            )}
          </div>
          <div className='flex-1'>
            <label
              htmlFor='arrivalAirport'
              className='block text-sm font-medium text-gray-700'
            >
              Varış Havalimanı
            </label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  options={airports.map((airport) => ({
                    ...airport,
                    isDisabled:
                      watch('departureAirport')?.value === airport.value,
                  }))}
                  isSearchable
                  placeholder='Örn: JFK'
                />
              )}
              control={control}
              name='arrivalAirport'
              rules={{ required: 'Bu alan zorunludur' }}
            />
            {errors.arrivalAirport && (
              <p className='text-sm text-red-500'>
                {errors.arrivalAirport.message}
              </p>
            )}
          </div>
        </div>
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label
              htmlFor='departureDate'
              className='block text-sm font-medium text-gray-700'
            >
              Gidiş Tarihi
            </label>
            <Controller
              render={({ field }) => (
                <input
                  type='date'
                  id='departureDate'
                  {...field}
                  className={`mt-1 p-2 w-full border ${
                    errors.departureDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
              )}
              control={control}
              name='departureDate'
              rules={{ required: 'Bu alan zorunludur' }}
            />
            {errors.departureDate && (
              <p className='text-sm text-red-500'>
                {errors.departureDate.message}
              </p>
            )}
          </div>
          {watch('roundTrip') && (
            <div className='flex-1'>
              <label
                htmlFor='returnDate'
                className='block text-sm font-medium text-gray-700'
              >
                Dönüş Tarihi
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    type='date'
                    id='returnDate'
                    {...field}
                    className={`mt-1 p-2 w-full border ${
                      errors.returnDate ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                )}
                control={control}
                name='returnDate'
              />
              {errors.returnDate && (
                <p className='text-sm text-red-500'>
                  {errors.returnDate.message}
                </p>
              )}
            </div>
          )}
        </div>
        <div className='flex items-center space-x-4'>
          <label
            htmlFor='roundTrip'
            className='text-sm font-medium text-gray-700'
          >
            Çift Yön
          </label>
          <input
            type='checkbox'
            id='roundTrip'
            {...register('roundTrip')}
            className='form-checkbox h-5 w-5 text-blue-500'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
          disabled={loading}
        >
          {loading ? 'Yükleniyor...' : 'Uçuşları Ara'}
        </button>
      </form>
      {error && (
        <div className='mt-4 p-4 bg-red-500 text-white rounded-md'>
          {error.message}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default FlightSearchForm;
