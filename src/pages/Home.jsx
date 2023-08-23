import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CarList from '../components/CarList';
import NavbarHome from '../components/NavbarHome';
import { BookingContext } from '../contexts/BookingContext';

const Home = () => {
  const [cars, setCars] = useState([]);
  const { bookingData } = useContext(BookingContext);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get('https://car-rent-server-83c3606b0599.herokuapp.com/api/cars', {
        params: {
          startDate: bookingData.startDate,
          endDate: bookingData.endDate
        }
      });
      setCars(res.data);
    }

    fetchCars();
  }, [bookingData.startDate, bookingData.endDate]);

  return (
    <div className="p-4">
      <div>
        <NavbarHome />
        <h1 className='text-xl text-center text-light-grey my-4'>
          {`${bookingData.endDate ? `Available cars`: 'List Of All Cars'}`}
        </h1>
      </div>
      <CarList cars={cars} />
    </div>
  );
}

export default Home;
