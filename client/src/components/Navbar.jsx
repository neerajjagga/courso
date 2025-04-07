import { Link } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightTheme]);

  return (
    <div className="relative border-b border-gray-400 border-opacity-50">
      <div className="container flex items-center justify-between py-[0.8rem]">
        <Link to='/' className="cursor-pointer">
          <h1 className="md:text-4xl text-3xl font-bold bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent">Courso</h1>
        </Link>

        <div className='flex items-center gap-5 md:gap-8'>
          <div className="text-black cursor-pointer dark:text-white">
            {isLightTheme ?
              <Moon onClick={() => setIsLightTheme(false)} size={26} /> :
              <Sun onClick={() => setIsLightTheme(true)} size={26} />
            }
          </div>
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
          <div className='z-50 md:hidden'>
            {!isHamburgerOpened ? (
              <Menu onClick={() => setIsHamburgerOpened(!isHamburgerOpened)} size={30} />
            ) : (
              <X onClick={() => setIsHamburgerOpened(!isHamburgerOpened)} size={30} className='' />
            )}
          </div>
        </div>

        {isHamburgerOpened && (
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
        )}

      </div>
    </div>
  )
}

export default Navbar