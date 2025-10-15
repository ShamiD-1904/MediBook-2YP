import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm justify-between w-full'>
        {/* ------- Left Side ------ */}
        <div className=''>
            <div className=''>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>MediBook is dedicated to simplifying your healthcare journey. Our platform seamlessly connects you with trusted medical professionals in your area, allowing you to book appointments in minutes. Your health, scheduled your way.</p>
            </div>
        </div>

        {/* -------Center------- */}

        <div>
            
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2  text-gray-60'>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Contact US</li>
                    <li>Privacy Policy</li>
                </ul>
            
        </div>

        {/* ------ Right Side ------ */}

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2  text-gray-60'>
                    <li>0000000000</li>
                    <li>0000000000000</li>
                </ul>
            </div>
    </div>

    {/* ------- Copyright Text ------- */}
    <div>
        <hr />
        <p>Copyright</p>

    </div>

</div>
    
  )
}

export default Footer
