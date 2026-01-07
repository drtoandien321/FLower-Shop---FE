import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h2 class="logo">Flower Go</h2>
          <p class="tagline">Beautiful flowers for every occasion</p>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h3>Shop</h3>
            <ul>
              <li><a href="/products">All Flowers</a></li>
              <li><a href="/products?category=red-rose">Red Roses</a></li>
              <li><a href="/products?category=lotus">Lotus</a></li>
              <li><a href="/products?category=jasmine">Jasmine</a></li>
            </ul>
          </div>
          
          <div class="link-group">
            <h3>Support</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          
          <div class="link-group">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Flower Go. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: white;
      padding: 3rem 0 0;
      margin-top: auto;
    }

    .footer-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .tagline {
      color: #888;
      margin: 0;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .link-group h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .link-group ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .link-group li {
      margin-bottom: 0.5rem;
    }

    .link-group a {
      color: #888;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .link-group a:hover {
      color: white;
    }

    .footer-bottom {
      border-top: 1px solid #333;
      margin-top: 3rem;
      padding: 1.5rem 2rem;
      text-align: center;
    }

    .footer-bottom p {
      color: #666;
      margin: 0;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class FooterComponent {}
