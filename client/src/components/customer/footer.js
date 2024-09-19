import React from 'react';
import InputBox from '../common/InputBox';
function footer(props) {
    return (
      <>
      <div>
      <div className='md:grid grid-cols-3  p-10 '>
            <div className='md:col-span-1 max-sm:mt-5'>
                <h1 className="text-title text-2xl font-mono font-bold ">Aabha Trade</h1>
                <p className='mt-3 text-xl'>Your one-stop shop for fresh produce, pantry staples, and everyday essentials. Quality goods, friendly service, and convenience in every aisle.</p>
            </div>
            <div className='md:col-span-1 contact max-sm:mt-5'>
            <h1 className="text-title text-2xl font-mono font-bold ">Get in Touch</h1>
                <div className='flex mt-4'>
                    <i className='fi fi-rs-marker text-[20px] mr-3 '></i><p>Balkumari-9 Lalitpur</p>
                </div>
                <div className='flex mt-2 '>
                    <i className="fi fi-rr-phone-call text-[20px] mr-3"></i><p>9869968581</p>
                </div>
                <div className='flex mt-2'>
                    <i className="fi fi-rr-envelope text-[20px] mr-3"></i><p>khanalnischal2075@gmail.com</p>
                </div>

            </div>
            <div className='md:col-span-1 max-sm:hidden'>
            <h1 className="text-title  text-2xl  font-bold max-sm:mt-5 ">Get Updates</h1>
            <p className='text-2xl mt-3 text-dark-grey '>Your Email</p>
            <InputBox
              name="email"
              type="email"
              placeholder="Enter Your Email"
              icon="fi-rr-at"
            />
                <button className="btn-twitter flex items-center justify-center gap-4 w-[70%] center font-xl">
            Subscribe
          </button>
            </div>
        </div>
        <div className='flex items-center justify-center gap-5 ' id='social-links'>
        <i className="fi fi-brands-facebook text-[2rem]"></i>
        <i className="fi fi-brands-instagram text-[2rem]"></i>
        <i className="fi fi-brands-tik-tok text-[2rem]"></i>
        </div>
        <div id="copyright ">
            <p className='text-xl mb-5'>© 2024 Aabha Trade. All rights reserved.</p>
        </div>
      </div>
      </>
    );
}

export default footer;