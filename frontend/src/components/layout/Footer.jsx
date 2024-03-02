import React from 'react'

const Footer = () => {
  return (
    <section className='px-[40px] pt-[3px]'>
      <div className='flex'>
        <div>
          <h1 className='font-bold'>Brands</h1>
          <p>Adidas</p>
          <p>Puma</p>
          <p>Reebok</p>
          <p>Nike</p>
        </div>

        <div>
        <h1 className='font-bold'>Company</h1>
          <p>About Us</p>
          <p>Carrer</p>
          <p>Find a store</p>
          <p>Rules and terms</p>
          <p>Sitemap</p>  
        </div>
        <div>

        <h1 className='font-bold'>Help</h1>
          <p>Conatct us</p>
          <p>Money Refund</p>
          <p>Order Status</p>
          <p>Shipping info</p>
          <p>Open dispute</p>  
        </div>

        <div>
        <h1 className='font-bold'>Account</h1>
          <p>User Login</p>
          <p>User Register</p>
          <p>Account Setting</p>
          <p>My Orders</p> 
        </div>

        <div>
        <h1 className='font-bold'>Social</h1>
          <p><i class="ri-facebook-circle-fill"></i>Facebook</p>
          <p><i class="ri-twitter-fill"></i>Twitter</p>
          <p><i class="ri-instagram-fill"></i>Instagram</p>
          <p><i class="ri-youtube-fill"></i>Youtube</p>
        </div>
      </div>
    </section>
  )
}

export default Footer;