import React from 'react';
import { Link } from 'react-router-dom';
import { FaGasPump, FaRegCalendarAlt} from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi'

const CarCard = ({ car }) => {
  const PF = "https://car-rent-server-83c3606b0599.herokuapp.com/uploads/";
  return (
    <Link to={`/booking/${car._id}`}>
      <div className="flex flex-col p-4 m-2 rounded shadow-lg text-dark-grey gap-1">
        <img src={PF+car.photos} alt={car.model} className="rounded-lg mb-2 h-64"/>
        <div className="flex justify-between">
          <span className='font-bold'>{car.brand} {car.model}</span>
          <div>
            <span className='font-bold'>${car.price}</span>
            <span className='text-sm'> /day</span>
          </div>
        </div>
        <div className="flex justify-between text-light-grey font-bold">
          <span>{car.year}</span>
          <span>{car.energy}</span>
          <span>Auto</span>
        </div>
        <div className="flex justify-between">
          <span className='px-2'>
          <FaRegCalendarAlt />
          </span>
          <span>
            <FaGasPump />
          </span>
          <span className='px-2'>
            <GiGearStickPattern />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;