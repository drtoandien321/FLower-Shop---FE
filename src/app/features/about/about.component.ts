import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="about-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>About Ann Flower</h1>
          <p>Bringing beauty and joy through the art of flowers since 2020</p>
        </div>
      </section>

      <!-- Story Section -->
      <section class="story-section">
        <div class="container">
          <div class="story-grid">
            <div class="story-image">
              <img 
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600" 
                alt="Our flower shop"
              />
            </div>
            <div class="story-content">
              <h2>Our Story</h2>
              <p>
                Ann Flower was born from a simple passion – the love of flowers and their 
                ability to transform moments into memories. What started as a small corner 
                shop has blossomed into a beloved destination for flower enthusiasts.
              </p>
              <p>
                Every bouquet we create tells a story. Whether it's celebrating a milestone, 
                expressing love, or simply brightening someone's day, we believe in the power 
                of flowers to connect hearts and spread happiness.
              </p>
              <p>
                Our team of skilled florists handpicks each bloom, ensuring only the freshest 
                and most beautiful flowers make their way to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section">
        <div class="container">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🌱</div>
              <h3>Freshness First</h3>
              <p>We source our flowers daily from local and international growers to ensure maximum freshness and longevity.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">💚</div>
              <h3>Sustainability</h3>
              <p>We're committed to eco-friendly practices, from biodegradable packaging to supporting sustainable farms.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🎨</div>
              <h3>Artistry</h3>
              <p>Each arrangement is a work of art, crafted with creativity and attention to every detail.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">❤️</div>
              <h3>Customer Love</h3>
              <p>Your satisfaction is our priority. We go above and beyond to make every experience special.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="container">
          <h2>Meet Our Team</h2>
          <div class="team-grid">
            <div class="team-member">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" 
                alt="Ann Nguyen"
              />
              <h3>Ann Nguyen</h3>
              <p class="role">Founder & Lead Florist</p>
              <p class="bio">With over 15 years of experience, Ann brings her artistic vision to every arrangement.</p>
            </div>
            <div class="team-member">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" 
                alt="David Chen"
              />
              <h3>David Chen</h3>
              <p class="role">Creative Director</p>
              <p class="bio">David ensures every bouquet tells a unique story through color and design.</p>
            </div>
            <div class="team-member">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" 
                alt="Sarah Kim"
              />
              <h3>Sarah Kim</h3>
              <p class="role">Customer Experience</p>
              <p class="bio">Sarah makes sure every customer feels special and cared for.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="cta-section">
        <div class="container">
          <h2>Let's Create Something Beautiful Together</h2>
          <p>Have a special occasion? We'd love to help make it memorable.</p>
          <div class="cta-buttons">
            <a routerLink="/products" class="btn-primary">Browse Flowers</a>
            <a href="mailto:hello@annflower.com" class="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section">
        <div class="container">
          <div class="info-grid">
            <div class="info-card">
              <h3>📍 Visit Us</h3>
              <p>123 Flower Street<br/>Garden City, GC 12345</p>
            </div>
            <div class="info-card">
              <h3>🕐 Opening Hours</h3>
              <p>Mon - Fri: 8:00 AM - 7:00 PM<br/>Sat - Sun: 9:00 AM - 5:00 PM</p>
            </div>
            <div class="info-card">
              <h3>📞 Get in Touch</h3>
              <p>Phone: +1 234 567 890<br/>Email: hello&#64;annflower.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .about-page {
      background: #fafafa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Hero */
    .hero {
      background: linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%);
      color: white;
      padding: 6rem 2rem;
      text-align: center;
    }

    .hero h1 {
      font-size: 3rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .hero p {
      font-size: 1.25rem;
      opacity: 0.9;
      margin: 0;
    }

    /* Story Section */
    .story-section {
      padding: 5rem 0;
      background: white;
    }

    .story-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .story-image img {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .story-content h2 {
      font-size: 2rem;
      color: #1a1a1a;
      margin: 0 0 1.5rem 0;
    }

    .story-content p {
      color: #666;
      line-height: 1.8;
      margin: 0 0 1rem 0;
    }

    /* Values Section */
    .values-section {
      padding: 5rem 0;
      background: #f8f9fa;
    }

    .values-section h2 {
      text-align: center;
      font-size: 2rem;
      margin: 0 0 3rem 0;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .value-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: transform 0.3s;
    }

    .value-card:hover {
      transform: translateY(-4px);
    }

    .value-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .value-card h3 {
      font-size: 1.1rem;
      margin: 0 0 0.75rem 0;
      color: #1a1a1a;
    }

    .value-card p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
    }

    /* Team Section */
    .team-section {
      padding: 5rem 0;
      background: white;
    }

    .team-section h2 {
      text-align: center;
      font-size: 2rem;
      margin: 0 0 3rem 0;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .team-member {
      text-align: center;
    }

    .team-member img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1.5rem;
      border: 4px solid #e8f5e9;
    }

    .team-member h3 {
      font-size: 1.25rem;
      margin: 0 0 0.25rem 0;
      color: #1a1a1a;
    }

    .team-member .role {
      color: #2d5a27;
      font-weight: 500;
      margin: 0 0 0.75rem 0;
    }

    .team-member .bio {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
    }

    /* CTA Section */
    .cta-section {
      padding: 5rem 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #2d3a4f 100%);
      color: white;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2rem;
      margin: 0 0 1rem 0;
    }

    .cta-section p {
      opacity: 0.9;
      margin: 0 0 2rem 0;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-primary {
      background: #2d5a27;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #234a1e;
    }

    .btn-secondary {
      background: transparent;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      border: 2px solid white;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: white;
      color: #1a1a2e;
    }

    /* Info Section */
    .info-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
    }

    .info-card h3 {
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
      color: #1a1a1a;
    }

    .info-card p {
      color: #666;
      margin: 0;
      line-height: 1.8;
    }

    /* Responsive */
    @media (max-width: 992px) {
      .story-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .values-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .team-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }

      .values-grid,
      .team-grid,
      .info-grid {
        grid-template-columns: 1fr;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class AboutComponent {}
