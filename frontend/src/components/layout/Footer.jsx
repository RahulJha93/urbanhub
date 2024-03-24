import React from "react";

const Footer = () => {
  return (
    <section className="px-[40px] pt-[3px] bg-[#0F172A] text-[white]">
      <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1">
        <div>
          <h1 className="font-bold mb-[0.5rem]">Brands</h1>
          {[["Adidas", "adidas"], ["Puma", "puma"], ["Reebok", "reebok"], ["Nike", "nike"]].map(([title, url]) => (
            <p className="text-gray-500 font-medium" key={url}>{title}</p>
          ))}
        </div>

        <div>
          <h1 className="font-bold mb-[0.5rem]">Company</h1>
          {[
            ["About Us", "about"],
            ["Carrer", "career"],
            ["Find a store", "store"],
            ["Rules and terms", "terms"],
          ].map(([title, url]) => (
            <p className="text-gray-500 font-medium" key={url}>{title}</p>
          ))}
        </div>

        <div>
          <h1 className="font-bold mb-[0.5rem]">Help</h1>
          {[
            ["Contact us", "contact"],
            ["Money Refund", "refund"],
            ["Order Status", "status"],
            ["Shipping info", "shipping"],
          ].map(([title, url]) => (
            <p className="text-gray-500 font-medium" key={url}>{title}</p>
          ))}
        </div>

        <div>
          <h1 className="font-bold mb-[0.5rem]">Account</h1>
          {[
            ["User Login", "login"],
            ["User Register", "register"],
            ["Account Setting", "setting"],
            ["My Orders", "orders"],
          ].map(([title, url]) => (
            <p className="text-gray-500 font-medium" key={url}>{title}</p>
          ))}
        </div>

        <div>
          <h1 className="font-bold mb-[0.5rem]">Social</h1>

          <p className="text-gray-500 font-medium">
            <i className="ri-facebook-circle-fill"></i> Facebook
          </p>
          <p className="text-gray-500 font-medium">
            <i className="ri-twitter-fill"></i> Twitter
          </p>
          <p className="text-gray-500 font-medium">
            <i className="ri-instagram-fill"></i> Instagram
          </p>
          <p className="text-gray-500 font-medium">
            <i className="ri-youtube-fill"></i> Youtube
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
