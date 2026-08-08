import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'static';
  categoryLabel: string;
  imageBg: string;
  icon: string;
  description: string;
  tags: string[];
  metrics: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="section-padding portfolio-section">
      <div class="container">
        <div class="section-header">
          <span class="badge"><i class="fa-solid fa-wand-magic-sparkles"></i> PORTFOLIO SHOWCASE</span>
          <h2>Featured <span class="gradient-text">Masterpieces</span></h2>
          <p>Explore our latest web applications, static sites, and digital platforms engineered for industry leaders.</p>
        </div>

        <!-- Filter Controls -->
        <div class="filter-tabs">
          <button 
            *ngFor="let cat of categories" 
            class="filter-btn" 
            [class.active]="activeCategory === cat.key"
            (click)="setCategory(cat.key)"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Project Grid -->
        <div class="portfolio-grid">
          <div class="glass-card project-card" *ngFor="let p of filteredProjects">
            <div class="project-thumb" [style.background]="p.imageBg">
              <div class="thumb-overlay">
                <i [class]="p.icon + ' thumb-icon'"></i>
                <span class="view-badge"><i class="fa-solid fa-eye"></i> View Case Study</span>
              </div>
            </div>

            <div class="project-info">
              <div class="info-top">
                <span class="p-category">{{ p.categoryLabel }}</span>
                <span class="p-metric"><i class="fa-solid fa-chart-simple"></i> {{ p.metrics }}</span>
              </div>

              <h3 class="p-title">{{ p.title }}</h3>
              <p class="p-desc">{{ p.description }}</p>

              <div class="p-tags">
                <span class="p-tag" *ngFor="let tag of p.tags">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-section {
      position: relative;
    }
    .filter-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 50px;
    }
    .filter-btn {
      padding: 10px 22px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .filter-btn:hover {
      border-color: var(--border-glow);
      color: var(--text-main);
    }
    .filter-btn.active {
      background: var(--gradient-primary);
      color: #0b0f19;
      border-color: transparent;
      box-shadow: 0 4px 15px rgba(0, 242, 254, 0.4);
    }
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
    }
    .project-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .project-thumb {
      height: 220px;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    .thumb-overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 15, 25, 0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      opacity: 0;
      transition: opacity var(--transition-normal);
      backdrop-filter: blur(4px);
    }
    .project-card:hover .thumb-overlay {
      opacity: 1;
    }
    .thumb-icon {
      font-size: 3rem;
      color: var(--primary);
    }
    .view-badge {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      background: var(--gradient-primary);
      color: #0b0f19;
    }
    .project-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .info-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .p-category {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--primary);
      letter-spacing: 1px;
    }
    .p-metric {
      font-size: 0.8rem;
      color: var(--success);
      font-weight: 600;
    }
    .p-title {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .p-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .p-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .p-tag {
      font-size: 0.75rem;
      color: var(--text-dim);
      background: rgba(255, 255, 255, 0.05);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }
  `]
})
export class PortfolioComponent {
  activeCategory: string = 'all';

  categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'static', label: 'Static Portals' },
    { key: 'ai', label: 'AI Solutions' },
    { key: 'mobile', label: 'Mobile & PWA' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'AuraCloud Enterprise Portal',
      category: 'web',
      categoryLabel: 'Web Application',
      imageBg: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      icon: 'fa-solid fa-cloud-bolt',
      description: 'High-throughput cloud analytics dashboard with real-time telemetry streaming and Angular Signals state management.',
      tags: ['Angular', 'TypeScript', 'WebSockets', 'RxJS'],
      metrics: '3.2ms Latency'
    },
    {
      id: 2,
      title: 'Lumina Dynamic Static Engine',
      category: 'static',
      categoryLabel: 'Static Website',
      imageBg: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
      icon: 'fa-solid fa-bolt-lightning',
      description: 'Ultra-lightweight static showcase platform built with sub-second page transitions and glassmorphism visual layout.',
      tags: ['Angular Static', 'Glassmorphism', 'SEO', 'PWA'],
      metrics: '100 Lighthouse'
    },
    {
      id: 3,
      title: 'NeuroCore AI Intelligence Workspace',
      category: 'ai',
      categoryLabel: 'AI Tool',
      imageBg: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
      icon: 'fa-solid fa-brain',
      description: 'AI-assisted code generation platform with integrated syntax highlighting and live interactive prompts.',
      tags: ['Angular 19', 'AI API', 'Tailwind', 'Canvas'],
      metrics: '10x Speedup'
    },
    {
      id: 4,
      title: 'Nexus Pay Mobile Wallet PWA',
      category: 'mobile',
      categoryLabel: 'Mobile PWA',
      imageBg: 'linear-gradient(135deg, #130cb7 0%, #52e5e7 100%)',
      icon: 'fa-solid fa-wallet',
      description: 'Progressive Web Application for instant peer-to-peer crypto & fiat transactions with biometrics authentication.',
      tags: ['PWA', 'ServiceWorker', 'WebAuthn', 'Responsive'],
      metrics: '4.9 App Rating'
    },
    {
      id: 5,
      title: 'Vortex Global Logistics Portal',
      category: 'web',
      categoryLabel: 'Web Application',
      imageBg: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
      icon: 'fa-solid fa-globe',
      description: 'Supply chain tracking system monitoring global vessel coordinates and automated warehouse inventory.',
      tags: ['Angular', 'Mapbox', 'GraphQL', 'Charts'],
      metrics: '50k Active Users'
    },
    {
      id: 6,
      title: 'Zenith Luxury Real Estate Showcase',
      category: 'static',
      categoryLabel: 'Static Portal',
      imageBg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      icon: 'fa-solid fa-building-user',
      description: 'Interactive property viewing static website with 3D virtual tour embeds and instant inquiry forms.',
      tags: ['Static HTML', 'CSS Grid', 'ThreeJS', 'SmoothScroll'],
      metrics: '150% Leads'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeCategory === 'all') return this.projects;
    return this.projects.filter(p => p.category === this.activeCategory);
  }

  setCategory(key: string) {
    this.activeCategory = key;
  }
}
