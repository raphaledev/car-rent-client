import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Booking from './pages/Booking';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
