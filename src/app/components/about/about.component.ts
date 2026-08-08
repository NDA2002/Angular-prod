import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section-padding about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="badge"><i class="fa-solid fa-users"></i> WHO WE ARE</span>
            <h2 class="about-title">Pioneering Next-Gen Web <span class="gradient-text">Architectures</span></h2>
            
            <p class="about-text">
              Founded by passionate software engineers and visual designers, ApexVision specializes in creating high-performance static websites, modern web apps, and digital experiences using Angular.
            </p>
            <p class="about-text">
              We eliminate unnecessary web bloat, ensure 100% compliance with Core Web Vitals, and deliver pixel-perfect designs with dark glassmorphism and modern UI design principles.
            </p>

            <div class="values-grid">
              <div class="value-item">
                <i class="fa-solid fa-bolt text-cyan"></i>
                <div>
                  <h4>Ultra Fast Performance</h4>
                  <span>Sub-second page rendering and pre-baked HTML assets.</span>
                </div>
              </div>

              <div class="value-item">
                <i class="fa-solid fa-shield-halved text-purple"></i>
                <div>
                  <h4>Enterprise Security</h4>
                  <span>Static web architecture with zero server-side vulnerabilities.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="stats-card-wrapper">
            <div class="glass-card metrics-card">
              <div class="metric-row">
                <div class="m-box">
                  <span class="m-number gradient-text">150+</span>
                  <span class="m-label">Projects Delivered</span>
                </div>
                <div class="m-box">
                  <span class="m-number gradient-text">99.9%</span>
                  <span class="m-label">Client Satisfaction</span>
                </div>
              </div>

              <div class="metric-divider"></div>

              <div class="metric-row">
                <div class="m-box">
                  <span class="m-number gradient-text">100</span>
                  <span class="m-label">Lighthouse Audits</span>
                </div>
                <div class="m-box">
                  <span class="m-number gradient-text">24/7</span>
                  <span class="m-label">Global Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      position: relative;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 60px;
      align-items: center;
    }
    .about-title {
      font-size: 2.5rem;
      margin: 16px 0 24px;
    }
    .about-text {
      color: var(--text-muted);
      font-size: 1.05rem;
      margin-bottom: 20px;
      line-height: 1.7;
    }
    .values-grid {
      display: grid;
      gap: 20px;
      margin-top: 32px;
    }
    .value-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      background: rgba(255, 255, 255, 0.03);
      padding: 18px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }
    .value-item i {
      font-size: 1.5rem;
      margin-top: 4px;
    }
    .value-item h4 {
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
    .value-item span {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .text-cyan { color: var(--primary); }
    .text-purple { color: #e100ff; }

    .metrics-card {
      padding: 40px;
      border: 1px solid var(--border-glow);
    }
    .metric-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      text-align: center;
    }
    .metric-divider {
      height: 1px;
      background: var(--border-color);
      margin: 30px 0;
    }
    .m-number {
      font-family: 'Outfit', sans-serif;
      font-size: 3rem;
      font-weight: 800;
      display: block;
    }
    .m-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    @media (max-width: 992px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
