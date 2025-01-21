import { GraduationCap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useState, useEffect, useRef } from 'react';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const { user } = useUserStore();
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between w-full py-3 px-4 lg:px-36 fixed backdrop-blur-md shadow-lg items-center top-0 left-0 z-10">
            <div className="relative">
                <Link to={'/'} className="">
                    <GraduationCap className="absolute -top-1 -right-1 text-blue-600 rotate-6" size={30} />
                    <span className="text-4xl font-bold text-gray-100 z-12">Courso</span>
                </Link>
            </div>

            <div className="font-semibold">
                <ul className="flex gap-8 text-xl">
                    <li className="hover:text-gray-300 transition-all">
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className="hover:text-gray-300 transition-all">
                        <Link to={'/courses'}>Courses</Link>
                    </li>
                    <li className="hover:text-gray-300 transition-all">
                        <Link to={'/about'}>About</Link>
                    </li>
                    <li className="hover:text-gray-300 transition-all">
                        <Link to={'/contact-us'}>Contact Us</Link>
                    </li>
                </ul>
            </div>

            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link
                            to={'/dashboard'}
                            className="flex gap-2 border-2 bg-white bg-opacity-95 text-black border-blue-600 font-semibold rounded-lg px-3 py-2"
                        >
                            <span className='text-[16px] font-bold'>Dashboard</span>
                            <Rocket className='text-blue-600' />
                        </Link>

                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setProfileDropdown((prev) => !prev)}
                                className="cursor-pointer"
                            >
                                {user.profileImageUrl ? (
                                    <img
                                        className="h-11 w-11 rounded-full object-cover hover:brightness-75 transition-all ease"
                                        src={user.profileImageUrl}
                                        alt={user.fullname}
                                    />
                                ) : (
                                    <div className="h-11 w-11 bg-blue-950 text-white rounded-full flex items-center justify-center font-semibold hover:brightness-75 transition-all ease">
                                        {user.fullname.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <ProfileDropdown profileDropdown={profileDropdown} user={user} />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to={'/signup'}
                            className="btn-primary font-medium rounded-lg text-[15px] px-5 py-2.5"
                        >
                            SignUp
                        </Link>
                        <Link
                            to={'/login'}
                            className="btn-primary font-medium rounded-lg text-[15px] px-5 py-2.5"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
