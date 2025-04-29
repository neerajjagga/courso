import { Link } from 'react-router-dom'
import { Moon, Sun, Menu, X, ChevronDown, LogOut, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthUser } from '../hooks/user/useAuthUser';
import { useLogoutUser } from '../hooks/user/useLogoutUser';

const Navbar = () => {
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useAuthUser();
  const { mutate: logout, isPending } = useLogoutUser();

  return (
    <div className="relative border-b border-gray-400 border-opacity-50">
      <div className="container flex items-center justify-between py-[0.8rem]">
        <Link to='/' className="cursor-pointer">
          <h1 className="md:text-4xl text-3xl font-bold bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent">Courso</h1>
        </Link>

        <div className='flex items-center gap-5 md:gap-8'>
          {/* <div className="text-black cursor-pointer dark:text-white">
            {isLightTheme ?
              <Moon onClick={() => setIsLightTheme(false)} size={26} /> :
              <Sun onClick={() => setIsLightTheme(true)} size={26} />
            }
          </div> */}
          {!user ? (
            <div className="hidden md:block">
              <div className="space-x-4">
                <Link to='/instructor-signup'>
                  <button className='text-lg px-5 py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff]'>Teach on Courso</button>
                </Link>
                <Link to="/login">
                  <button className="btn-primary">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn-secondary">Join now</button>
                </Link>
              </div>

            </div>
          ) : (
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <Link to='/dashboard/courses'>
                  <button disabled={isPending} className='text-lg px-5 py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff] flex justify-center items-center gap-2'>
                    <Rocket size={23} />
                    <span className='hidden sm:block'>Dashboard</span>
                  </button>
                </Link>

                {/* profile Icon */}
                <div className='relative flex items-end gap-1'>
                  {user.profileImageUrl ? (
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={user.profileImageUrl}
                      alt="User Profile Image"
                    />
                  ) : (
                    <span className='flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-red-600 rounded-full'>
                      {user.fullname?.charAt(0).toUpperCase()}
                    </span>)}
                  <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className={`${isProfileDropdownOpen && "rotate-180"} transition-all ease-in duration-200`}>
                    <ChevronDown />
                  </button>

                  {isProfileDropdownOpen && (
                    <button
                      disabled={isPending}
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className='absolute right-0 z-30 flex items-center justify-center gap-2 px-4 py-2 text-lg text-white transition-all duration-200 ease-in bg-gray-800 rounded-md -bottom-16 hover:text-red-500'><LogOut size={20} /> Logout</button>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className={`z-50 md:hidden`}>
            {!isHamburgerOpened ? (
              <Menu onClick={() => setIsHamburgerOpened(!isHamburgerOpened)} size={30} />
            ) : (
              <X onClick={() => setIsHamburgerOpened(!isHamburgerOpened)} size={30} className='' />
            )}
          </div>
        </div>

        {isHamburgerOpened && (
          !user ?
            <div className='absolute inset-0 z-40 flex justify-center w-full min-h-screen overflow-hidden backdrop-blur-md'>
              <div className="mt-32">
                <div className="flex flex-col items-center gap-6">
                  <Link to="/login" >
                    <button onClick={() => setIsHamburgerOpened(false)} className="btn-primary">Login</button>
                  </Link>
                  <Link to="/signup" >
                    <button onClick={() => setIsHamburgerOpened(false)} className="btn-secondary">Join now</button>
                  </Link>
                  <Link to='/instructor-signup'>
                    <button onClick={() => setIsHamburgerOpened(false)} className='text-lg px-5 py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff]'>Teach on Courso</button>
                  </Link>
                </div>
              </div>
            </div>
            :
            <div className='absolute inset-0 z-40 flex justify-center w-full min-h-screen overflow-hidden backdrop-blur-md'>
              <div className="flex flex-col items-center gap-4 mt-32">
                <div className='flex items-center justify-center gap-2 text-lg transition-all duration-100 ease-in'>
                  {user.profileImageUrl ? (
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={user.profileImageUrl}
                      alt="User Profile Image"
                    />
                  ) : (
                    <span className='flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-red-600 rounded-full'>
                      {user.fullname?.charAt(0).toUpperCase()}
                    </span>)}
                  {user.email.split('@')[0]}
                </div>

                <Link to='/dashboard/courses'>
                  <button disabled={isPending} className='text-lg px-5 py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff]'>Dashboard</button>
                </Link>

                {/* profile Icon */}
                <button disabled={isPending} onClick={() => logout()} className='flex items-center justify-center gap-2 px-4 py-2 text-lg text-white transition-all duration-200 ease-in bg-red-600 rounded-md -left-4 -bottom-16 hover:bg-red-500'><LogOut size={20} /> Logout</button>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar