import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-base font-satoshi">
      <Navbar />
      <main className='container'>
        {children}
      </main>
    </div>
  )
}

export default Layout