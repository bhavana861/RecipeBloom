import React from "react";
import "../components/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>🍴 RecipeBloom</h2>
          <p>
            Discover delicious recipes, share your cooking ideas,
            and create unforgettable food experiences.
          </p>
        </div>


        <div className="footer-links">

          <div>
            <h3>Explore</h3>
            <a>Home</a>
            <a>Recipes</a>
            <a>Popular</a>
            <a>Categories</a>
          </div>


          <div>
            <h3>Support</h3>
            <a>About Us</a>
            <a>Contact</a>
            <a>Privacy</a>
            <a>Help</a>
          </div>

        </div>


        <div className="footer-news">

          <h3>Join our kitchen</h3>

          <p>
            Get new recipes and cooking inspiration.
          </p>

          <div className="subscribe">

            <input 
              type="email"
              placeholder="Your email"
            />

            <button>
              Join
            </button>

          </div>

        </div>


      </div>


      <div className="footer-bottom">

        <p>
          © 2026 🍴 RecipeBloom. All rights reserved.
        </p>

        <div className="socials">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>YouTube</span>
        </div>

      </div>


    </footer>
  );
};

export default Footer;