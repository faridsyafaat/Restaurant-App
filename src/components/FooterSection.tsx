import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-black text-white px-6 py-12 container-custom'>
      <div className='max-w-7xl mx-auto'>
        {/* Wrapper Columns */}
        <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
          {/* === LEFT SECTION === */}
          <div className='md:w-1/3'>
            <img src='/image/logo3.png' alt='Logo' className='w-[149px] mb-4' />

            <p className='text-sm opacity-80 mb-5'>
              Enjoy homemade flavors & chef’s signature dishes, freshly prepared
              every day. Order online or visit our nearest branch.
            </p>

            <p className='font-semibold mb-3'>Follow on Social Media</p>

            <div className='flex items-center gap-4 text-xl'>
              {/* React-Icons */}
              <FaFacebook />
              <FaInstagram />
              <FaLinkedin />
              <FaTiktok />
            </div>
          </div>

          {/* === MIDDLE + RIGHT (Mobile: 1 row) === */}
          <div className='flex flex-row w-full md:w-2/3 gap-10 justify-between'>
            {/* Middle Section */}
            <div className='w-1/2'>
              <h3 className='font-semibold text-lg mb-4'>Explore</h3>
              <ul className='space-y-2 opacity-80'>
                <li>All Food</li>
                <li>Nearby</li>
                <li>Discount</li>
                <li>Best Seller</li>
                <li>Delivery</li>
                <li>Lunch</li>
              </ul>
            </div>

            {/* Right Section */}
            <div className='w-1/2'>
              <h3 className='font-semibold text-lg mb-4'>Help</h3>
              <ul className='space-y-2 opacity-80'>
                <li>How to Order</li>
                <li>Payment Methods</li>
                <li>Track My Order</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
