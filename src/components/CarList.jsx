import React from 'react';
import CarCard from './CarCard';

const CarList = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {cars.map(car => <CarCard key={car._id} car={car} />)}
    </div>
  );
}

export default CarList;
