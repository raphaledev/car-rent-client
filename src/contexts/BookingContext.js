import { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    car: null,
    startDate: null,
    endDate: null,
    totalPrice: 0,
    customerName: '',
    email: '',
    phoneNumber: '',
    paymentStatus: 'pending' //or initialize as per your requirement
  })

  // Add the effect dependencies
  useEffect(() => {
    calculateTotalPrice();
  }, [bookingData.car, bookingData.startDate, bookingData.endDate]); // Here you specify dependencies for the effect

  const calculateTotalPrice = () => {
    if (bookingData.startDate && bookingData.endDate && bookingData.car) {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalPrice = diffDays * bookingData.car.price;

      setBookingData(prevData => ({
        ...prevData,
        totalPrice,
      }));
    }
  }

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, calculateTotalPrice }}>
      {children}
    </BookingContext.Provider>
  )
}
