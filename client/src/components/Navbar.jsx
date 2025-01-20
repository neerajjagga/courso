import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const Navbar = () => {
    const { user } = useUserStore();

    return (
        <div className="flex justify-between w-full py-3 px-4 lg:px-36 fixed backdrop-blur-md shadow-lg items-center top-0 left-0 z-10">
            <div className='relative'>
                <Link to={'/'} className=''>
                    <GraduationCap className='absolute -top-1 -right-1 text-blue-600 rotate-6' size={30} />
                    <span className='text-4xl font-bold text-gray-100 z-12'>Courso</span>
                </Link>
            </div>

            <div className='font-semibold'>
                <ul className='flex gap-8 text-xl'>
                    <li className='hover:text-gray-300 transition-all'>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className='hover:text-gray-300 transition-all'>
                        <Link to={'/courses'}>Courses</Link>
                    </li>
                    <li className='hover:text-gray-300 transition-all'>
                        <Link to={'/about'}>About</Link>
                    </li>
                    <li className='hover:text-gray-300 transition-all'>
                        <Link to={'/contact-us'}>Contact Us</Link>
                    </li>
                </ul>
            </div>

            <div>
                {user ? (
                    <div className='flex items-center gap-4'>
                        <Link to={'/dashboard'} className='btn-primary   font-medium rounded-lg text-[15px] px-5 py-2.5 '>
                            Dashboard
                        </Link>
                        {user.profileImageUrl ? (
                            <div>
                                <img className='h-11 w-11 rounded-full object-cover' src={user.profileImageUrl} alt={user.fullname} />
                            </div>
                        ) : (
                            <div className='h-11 w-11 bg-black text-white rounded-full flex items-center justify-center font-semibold'>{user.fullname.charAt(0).toUpperCase()}</div>
                        )}
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link to={'/signup'} className='btn-primary   font-medium rounded-lg text-[15px] px-5 py-2.5 '>
                            SignUp
                        </Link>
                        <Link to={'/login'} className='btn-primary    font-medium rounded-lg text-[15px] px-5 py-2.5 '>
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar