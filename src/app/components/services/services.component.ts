import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section-padding services-section">
      <div class="container">
        <div class="section-header">
          <span class="badge"><i class="fa-solid fa-layer-group"></i> OUR CAPABILITIES</span>
          <h2>Tailored Engineering for <span class="gradient-text">Modern Web Success</span></h2>
          <p>We combine cutting-edge technology stacks with stunning visual aesthetics to deliver exceptional static and dynamic web solutions.</p>
        </div>

        <div class="services-grid">
          <div class="glass-card service-card" *ngFor="let s of services">
            <div class="card-top">
              <div class="service-icon">
                <i [class]="s.icon"></i>
              </div>
              <span class="service-tag">{{ s.badge }}</span>
            </div>

            <h3 class="service-title">{{ s.title }}</h3>
            <p class="service-desc">{{ s.description }}</p>

            <ul class="feature-list">
              <li *ngFor="let f of s.features">
                <i class="fa-solid fa-circle-check text-cyan"></i>
                <span>{{ f }}</span>
              </li>
            </ul>

            <div class="card-action">
              <a href="#contact" class="link-btn">
                <span>Learn More</span>
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      position: relative;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 30px;
    }
    .service-card {
      padding: 36px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-md);
      background: var(--gradient-glow);
      border: 1px solid var(--border-glow);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .service-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-dim);
      background: rgba(255, 255, 255, 0.05);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
    }
    .service-title {
      font-size: 1.35rem;
      margin-bottom: 14px;
    }
    .service-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 24px;
      flex-grow: 1;
    }
    .feature-list {
      list-style: none;
      margin-bottom: 28px;
    }
    .feature-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 10px;
    }
    .text-cyan {
      color: var(--primary);
    }
    .card-action {
      border-top: 1px solid var(--border-color);
      padding-top: 20px;
    }
    .link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--primary);
      transition: gap var(--transition-fast);
    }
    .link-btn:hover {
      gap: 12px;
    }
  `]
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 1,
      icon: 'fa-solid fa-laptop-code',
      title: 'Static & Single Page Apps',
      badge: 'SPEED & SEO',
      description: 'Blazing fast Angular SPA & Jamstack static architectures with instant page loads and 100% SEO optimization.',
      features: ['SSR & Hydration support', 'Pre-rendered static HTML', 'Lighthouse 100 Audit']
    },
    {
      id: 2,
      icon: 'fa-solid fa-palette',
      title: 'UI/UX Glassmorphism',
      badge: 'PREMIUM DESIGN',
      description: 'Next-generation user interface design featuring vibrant gradients, smooth animations, and intuitive modern UX.',
      features: ['Tailored Color Palettes', 'Dark/Light Dynamic Modes', 'Micro-interactions']
    },
    {
      id: 3,
      icon: 'fa-solid fa-server',
      title: 'Cloud & API Integration',
      badge: 'SCALABILITY',
      description: 'Seamless integration with REST & GraphQL APIs, serverless functions, and global CDN deployments.',
      features: ['Edge CDN Hosting', 'Reactive State Management', 'Secure Authentication']
    },
    {
      id: 4,
      icon: 'fa-solid fa-mobile-screen-button',
      title: 'Responsive & PWA',
      badge: 'CROSS-PLATFORM',
      description: 'Flawless responsive behavior across mobile, tablet, and desktop viewports with offline PWA support.',
      features: ['Mobile First Layouts', 'Offline Caching Capabilities', 'App-like Experience']
    },
    {
      id: 5,
      icon: 'fa-solid fa-gauge-high',
      title: 'Performance Tuning',
      badge: 'OPTIMIZATION',
      description: 'Comprehensive audit and code optimization to minimize bundle size, reduce latency, and boost Core Web Vitals.',
      features: ['Tree-shaking & Lazy Loading', 'Asset Compression', 'Zero Dependency Bloat']
    },
    {
      id: 6,
      icon: 'fa-solid fa-chart-line',
      title: 'Analytics & SEO Engine',
      badge: 'GROWTH',
      description: 'Structured metadata, dynamic OpenGraph cards, schema markup, and integrated web analytics tracking.',
      features: ['Custom Meta Engine', 'Automated Sitemap Generator', 'Real-time Telemetry']
    }
  ];
}
