import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Thank you for your booking!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your booking has been successfully processed. You will receive an email confirmation shortly.
          </p>
          <Link to="/" className="mt-5 text-center underline text-sm text-blue-600 hover:text-blue-500">Go to homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
