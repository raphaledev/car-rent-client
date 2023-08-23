import React, { useContext } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookingContext } from "../contexts/BookingContext";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const {bookingData} = useContext(BookingContext);
  const navigate = useNavigate();
  const initialValues = {
    customerName: '',
    email: '',
    phoneNumber: '',
  }

  const duration = bookingData.totalPrice / bookingData.car.price;

  const createBooking = async (values, { setSubmitting }) => {
    console.log('Create booking function called.'); // Test log 1
    console.log(JSON.stringify(values, null, 2));

    const booking = {
        car: bookingData.car._id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice: bookingData.totalPrice,
        paymentStatus: true, // Here we assume that the payment was successful
        customerName: values.customerName,
        email: values.email,
        phoneNumber: values.phoneNumber
    };
   

    console.log(booking); // Log the booking data

    try {
      await axios.post('https://car-rent-server-83c3606b0599.herokuapp.com/api/bookings', booking);

      console.log('Booking creation request sent.'); // Test log 2
      navigate('/thankyou');
    } catch (error) {
      console.log('Error while creating booking:', error); // Error log
    } finally {
      setSubmitting(false);
    }
  };

  const PF = "https://car-rent-server-83c3606b0599.herokuapp.com/uploads/";

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 p-4 gap-4 md:gap-8 lg:gap-16 xl:gap-24 mx-auto my-4 w-5/6">
        <Formik initialValues={initialValues} onSubmit={createBooking}>
            {() => (
            <Form className="mt-8 space-y-6">
                <h3 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Customer Information</h3>
                <Field className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="text" name="customerName" placeholder="Full Name" />
                <Field className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="email" name="email" placeholder="Email" />
                <Field className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="tel" name="phoneNumber" placeholder="Phone Number" />
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Pay ${bookingData.totalPrice}
                </button>
          </Form>
            )}
        </Formik>
        <div className="rounded-lg md:col-span-2 px-8 bg-blue-200">
            <h2 className="text-2xl text-center font-semibold mb-4">Order Details</h2>
            <div className='flex flex-col gap-2 rounded-md'>
                <img src={PF+bookingData.car.photos} alt={bookingData.car.model} className="rounded-lg mb-2 h-48 w-full"/>
                <div className="flex flex-col justify-between px-4 gap-4">
                    <div className='flex justify-between'> 
                        <span className=''>{bookingData.car.brand} {bookingData.car.model} {bookingData.car.year}</span>
                        <span className='font-bold'>${bookingData.car.price} /day</span>
                    </div>
                    <div className=''>
                        <p className='font-bold'>From {bookingData.startDate} To {bookingData.endDate}</p>
                    </div>
                    <div className="flex justify-between px-8 mb-">
                        <p>Duration</p>
                        <p>{duration} days</p>
                    </div>
                    <div className="flex justify-between px-8">
                        <p>Total</p>
                        <p>${bookingData.totalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Checkout;
