import { useState, useContext } from 'react';
import DatePicker from 'react-tailwindcss-datepicker';
import { BookingContext } from '../contexts/BookingContext';
import { GrUserAdmin } from 'react-icons/gr'
import logo from '../assets/logo-senauto.png'

const NavbarHome = () => {
  const [dates, setDates] = useState({ 
    startDate: null, 
    endDate: null 
  });
  const { setBookingData } = useContext(BookingContext);
  
  const handleDateChange = (dates) => {
    setBookingData(prevData => ({
      ...prevData,
      startDate: dates.startDate,
      endDate: dates.endDate,
    }));
    setDates(dates);
  }

  const handleReset = () => {
    setBookingData(prevData => ({
      ...prevData,
      startDate: null,
      endDate: null,
    }));
    setDates({ startDate: null, endDate: null });
  }
  
  return (
    <nav className="flex items-center justify-between mx-4 text-airbnb-red">
      <div className='w-20'>
        <img src={logo} alt='Sen Auto Logo'/>
      </div>
      <div className='flex items-center gap-4'>
        <div className="grow border-2 border-airbnb-red rounded-md">
          <DatePicker
              minDate={new Date()}
              primaryColor={"rose"} 
              selected={dates.startDate}
              placeholder={dates.startDate && dates.endDate ? `${dates.startDate} - ${dates.endDate}` : "Select dates"}
              onChange={handleDateChange}
              showFooter={true}
          />
        </div>
        <div className={`${dates.endDate ? '' : 'hidden'}`}>
            <button 
                className='py-2 px-4 rounded-md bg-airbnb-red text-white'
                onClick={handleReset}
                >
                Reset Dates
            </button>
          </div>
      </div>
      <span>
          <GrUserAdmin size={30} />
      </span>
    </nav>
  );
}

export default NavbarHome;
