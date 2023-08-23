import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookingContext } from '../contexts/BookingContext';
import DatePicker from 'react-tailwindcss-datepicker';
import { FaGasPump, FaRegCalendarAlt} from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const { bookingData, setBookingData } = useContext(BookingContext);
    

    useEffect(() => {
        const fetchCar = async () => {
            const res = await axios.get(`https://car-rent-server-83c3606b0599.herokuapp.com/api/cars/${id}`);
            setCar(res.data);
            setBookingData(prevData => ({
                ...prevData,
                car: res.data,
            }));
        }

        fetchCar();
    }, [id, setBookingData]);

    // update the booking data on date change
    const handleDateChange = (dates) => {
        setBookingData(prevData => ({
            ...prevData,
            startDate: dates.startDate,
            endDate: dates.endDate,
        }));
    }
    
    const duration = () => bookingData.totalPrice / car.price;

    const dayOrDays = () => duration() > 1 ? 'days' : 'day';

    const handleSubmit = () => {
        // Implement booking confirmation logic
        if(bookingData.startDate && bookingData.endDate && !isVisible){
            navigate('/checkout');
        }
    }

    const PF = "https://car-rent-server-83c3606b0599.herokuapp.com/uploads/";
    return (
        <div className=''>
            <div>
                <Navbar />
            </div>
            {/* Pop up for changing the dates */}
            <div className={`w-1/2 md:w-1/4 xl:w-1/6 mx-auto -my-4 ${isVisible ? '' : 'hidden'}`}>
                <DatePicker 
                    startDate={bookingData.startDate}
                    endDate={bookingData.endDate}
                    onChange={handleDateChange}
                    disableDates={car.unavailableDates}
                    className="w-1/2"
                    primaryColor={"rose"} 
                    showFooter={true}
                    placeholder='Select Dates'
                />
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-8 mx-auto my-4 w-5/6 xl:w-2/3">
                <div className='flex flex-col gap-2 border border-extra-light-grey bg-ghost-white rounded-md p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <img src={PF+car.photos} alt={car.model} className="rounded-lg mb-2 h-80 w-full"/>
                    <div className="flex justify-between px-4">
                        <span className='font-bold'>{car.brand} {car.model}</span>
                        <div>
                            <span className='font-bold'>${car.price}</span>
                            <span className='text-sm'> /day</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-light-grey font-bold px-8">
                        <span>{car.year}</span>
                        <span>{car.energy}</span>
                        <span>Auto</span>
                    </div>
                    <div className="flex justify-between px-8">
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
                <div className="flex flex-col gap-8 border border-extra-light-grey rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className="flex flex-col gap-4 py-4 bg-ghost-white rounded-xl">
                        <div className='text-xl font-bold flex justify-around'>
                            <span>{car.brand} {car.model} {car.year}</span>
                        </div>
                        <div className='flex justify-around'>
                            <span>Start Date</span>
                            <span className='font-semibold'>{bookingData.startDate}</span>
                        </div>
                        <div className='flex justify-around'>
                            <span>End Date</span>
                            <span className='font-semibold'>{bookingData.endDate}</span>
                        </div>
                        <div className="flex justify-center mx-auto gap-4">
                            <button 
                                className="mx-auto mt-4 px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-airbnb-red rounded shadow ripple hover:shadow-lg hover:bg-red-700 focus:outline-none">
                                Add Options
                            </button>
                            <button 
                                onClick={() => setIsVisible(!isVisible)}
                                className="mx-auto mt-4 px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-airbnb-red rounded shadow ripple hover:shadow-lg hover:bg-red-700 focus:outline-none">
                                {!bookingData.endDate ? 'Choose Dates' : isVisible ? 'Confirm Dates' : 'Change Dates'}
                            </button>
                        </div>
                        <div className='flex flex-col px-8 py-4 gap-4'>
                            <div className="flex justify-between">
                                <span className='underline underline-offset-2'>${car.price} * {duration()} {dayOrDays()}</span>
                                <span className='font-bold'>${bookingData.totalPrice}</span>
                            </div>
                            <div className="flex">
                                <p className='underline'>Options</p>
                            </div>
                            <hr/>
                            <div className="flex justify-between font-bold py-2">
                                <span>Total</span>
                                <span>${bookingData.totalPrice}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleSubmit}
                            className={`mx-auto px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none ${(bookingData.endDate && !isVisible) ? '' : 'hidden'}`}>
                                Confirm booking
                        </button>
                    </div>           
                </div> 
        </div>
            <div className='w-1/2 mx-auto text-center'>
                <p className='text-3xl my-4'>Description</p>
                <p>{car.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sit itaque officia rem aperiam, dolorum voluptas incidunt voluptatum harum dolor laudantium ex deserunt error fugit commodi autem accusantium hic odio.</p>
            </div>
        </div>
        
    );
}

export default Booking;
