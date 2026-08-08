import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer class="footer-section">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="#" class="brand-logo">
              <div class="logo-icon"><i class="fa-solid fa-cube"></i></div>
              <span class="logo-text">Apex<span class="gradient-text">Vision</span></span>
            </a>
            <p class="brand-desc">
              Pioneering high-performance static web architectures and interactive web applications with Angular. Engineered for speed, SEO, and visual excellence.
            </p>
          </div>

          <div class="footer-links-grid">
            <div class="link-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Showcase</a></li>
                <li><a href="#estimator">Cost Estimator</a></li>
              </ul>
            </div>

            <div class="link-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Static Web SPA</a></li>
                <li><a href="#services">Glassmorphic UI/UX</a></li>
                <li><a href="#services">Progressive Web Apps</a></li>
                <li><a href="#services">Performance Audits</a></li>
              </ul>
            </div>

            <div class="link-col newsletter-col">
              <h4>Newsletter</h4>
              <p>Subscribe for web engineering insights & release notes.</p>
              <form (ngSubmit)="onSubscribe()" class="newsletter-form">
                <input 
                  type="email" 
                  [(ngModel)]="newsletterEmail" 
                  name="email" 
                  placeholder="Enter email address" 
                  required
                />
                <button type="submit"><i class="fa-solid fa-arrow-right"></i></button>
              </form>
              <span class="sub-msg" *ngIf="subscribed"><i class="fa-solid fa-check text-cyan"></i> Subscribed successfully!</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 ApexVision Studio. Built with Angular & High-Performance Static Web Standards.</p>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#">Terms of Service</a>
            <span>&bull;</span>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      background: rgba(0, 0, 0, 0.4);
      border-top: 1px solid var(--border-color);
      padding: 80px 0 30px;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1.2fr 2fr;
      gap: 60px;
      margin-bottom: 60px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .logo-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md);
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0b0f19;
      font-size: 1.1rem;
    }
    .brand-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.6;
      max-width: 360px;
    }
    .footer-links-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.4fr;
      gap: 30px;
    }
    .link-col h4 {
      font-size: 1.05rem;
      margin-bottom: 20px;
      color: var(--text-main);
    }
    .link-col ul {
      list-style: none;
    }
    .link-col li {
      margin-bottom: 12px;
    }
    .link-col a {
      color: var(--text-muted);
      font-size: 0.9rem;
      transition: color var(--transition-fast);
    }
    .link-col a:hover {
      color: var(--primary);
    }
    .newsletter-col p {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 16px;
    }
    .newsletter-form {
      display: flex;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      padding: 4px 4px 4px 16px;
    }
    .newsletter-form input {
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      font-size: 0.85rem;
      width: 100%;
    }
    .newsletter-form button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--gradient-primary);
      border: none;
      color: #0b0f19;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sub-msg {
      display: block;
      margin-top: 10px;
      font-size: 0.8rem;
      color: var(--primary);
    }

    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: var(--text-dim);
    }
    .legal-links {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .legal-links a {
      color: var(--text-dim);
    }
    .legal-links a:hover {
      color: var(--primary);
    }

    @media (max-width: 992px) {
      .footer-top {
        grid-template-columns: 1fr;
      }
      .footer-links-grid {
        grid-template-columns: 1fr 1fr;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  newsletterEmail = '';
  subscribed = false;

  onSubscribe() {
    if (this.newsletterEmail) {
      this.subscribed = true;
      this.newsletterEmail = '';
      setTimeout(() => this.subscribed = false, 5000);
    }
  }
}
