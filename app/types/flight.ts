export interface Flight {
  id: number
  departureAirport: DepartureAirport
  arrivalAirport: ArrivalAirport
  airline: string
  departureTime: string
  arrivalTime: string
  duration: number
  price: number
}

export interface DepartureAirport {
  code: string
  city: string
  name: string
}

export interface ArrivalAirport {
  code: string
  city: string
  name: string
} 