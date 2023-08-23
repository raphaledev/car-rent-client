import { Link } from 'react-router-dom';
import { GrUserAdmin } from 'react-icons/gr'
import logo from '../assets/logo-senauto.png'

const Navbar = () => {

  return (
    <nav className="flex items-center justify-between mx-8 text-airbnb-red">
      <div className='w-20'>
        <Link to='/'>
          <img className='' src={logo} alt='Sen Auto Logo'/>
        </Link>
      </div>
      <span>
          <GrUserAdmin size={30} />
      </span>
    </nav>
  );
}

export default Navbar;
