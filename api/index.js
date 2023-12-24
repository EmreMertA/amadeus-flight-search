const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flightsData = require('./flightsData.json');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/flights', (req, res) => {
  const { departureAirport, arrivalAirport, departureDate, returnDate } =
    req.query;

  const filteredFlights = flightsData.flights.filter((flight) => {
    return (
      flight.departureAirport.code === departureAirport &&
      flight.arrivalAirport.code === arrivalAirport &&
      flight.departureTime.startsWith(departureDate)
    );
  });

  const returnFlights = flightsData.flights.filter((flight) => {
    return (
      flight.departureAirport.code === arrivalAirport &&
      flight.arrivalAirport.code === departureAirport &&
      flight.departureTime.startsWith(returnDate)
    );
  });

  if (filteredFlights.length === 0 && returnFlights.length === 0) {
    setTimeout(() => {
      res
        .status(404)
        .json({ message: 'Aradığınız kriterlerde uçuş bulunamadı.' });
    }, 1000);
  } else {
    setTimeout(() => {
      const response = {
        departure: filteredFlights,
        return: returnFlights,
      };
      res.json(response);
    }, 1000);
  }
});

app.listen(port, () => {
  console.log(`Flight Search API listening at http://localhost:${port}`);
});
