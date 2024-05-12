import React from 'react'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer class="py-5 container">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">

        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Trains</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">General Information</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Important Information</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Agent</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Enquiries</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
  
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
   
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Gateway</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">News</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Mobile Zone</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Policies</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Zone</a></li>
        </ul>
      </div>

      <div class="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address"/>
            <button class="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>© 2024 Company, Inc. All rights reserved.</p>
      <ul className="social-icons-list" style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
  <li className="ms-3"><a className="link-body-emphasis" href="#"><FaTwitter /></a></li>
  <li className="ms-3"><a className="link-body-emphasis" href="#"><FaInstagram /></a></li>
  <li className="ms-3"><a className="link-body-emphasis" href="#"><FaFacebook /></a></li>
</ul>
    </div>
  </footer>
  )
}

export default Footer
