import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-[full] bg-blue-600 text-white text-[30px] font-bold justify-center gap-10 flex flex-row items-center px-4 py-2 font-serif">
      <div>
        <NavLink to="/" className="hover:text-blue-100">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to="/pastes" className="hover:text-blue-100">
          Pastes
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar
