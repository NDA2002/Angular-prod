import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <!-- Glow Elements -->
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>

      <div class="container hero-container">
        <div class="hero-content">
          <div class="badge animate-pulse">
            <i class="fa-solid fa-bolt"></i> Next-Gen Angular Web Engineering
          </div>

          <h1 class="hero-title">
            Crafting Extraordinary Digital Experiences with <span class="gradient-text">Speed & Precision</span>
          </h1>

          <p class="hero-subtitle">
            We build ultra-fast, visually captivating static & dynamic websites engineered for modern web standards, responsive design, and seamless user interaction.
          </p>

          <div class="hero-actions">
            <a href="#portfolio" class="btn btn-primary">
              <span>View Showcase</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#estimator" class="btn btn-secondary">
              <i class="fa-solid fa-calculator"></i>
              <span>Cost Estimator</span>
            </a>
          </div>

          <div class="hero-trust">
            <p>TRUSTED BY INNOVATORS WORLDWIDE</p>
            <div class="tech-tags">
              <span class="tech-pill"><i class="fa-brands fa-angular"></i> Angular</span>
              <span class="tech-pill"><i class="fa-brands fa-js"></i> TypeScript</span>
              <span class="tech-pill"><i class="fa-brands fa-css3-alt"></i> Modern CSS</span>
              <span class="tech-pill"><i class="fa-solid fa-rocket"></i> Ultra Static</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-card-wrapper animate-float">
            <div class="glass-card main-visual-card">
              <div class="card-header-bar">
                <div class="dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="window-title">ApexVision_Dashboard.ts</span>
              </div>

              <div class="card-body-content">
                <div class="stat-grid">
                  <div class="stat-item">
                    <div class="stat-icon"><i class="fa-solid fa-gauge-high"></i></div>
                    <div class="stat-info">
                      <span class="stat-number">100/100</span>
                      <span class="stat-label">Lighthouse Score</span>
                    </div>
                  </div>

                  <div class="stat-item">
                    <div class="stat-icon purple"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="stat-info">
                      <span class="stat-number">99.99%</span>
                      <span class="stat-label">Uptime Security</span>
                    </div>
                  </div>
                </div>

                <div class="code-preview">
                  <div class="code-line"><span class="c-keyword">import</span> &#123; <span class="c-comp">Component</span> &#125; <span class="c-keyword">from</span> <span class="c-str">'&#64;angular/core'</span>;</div>
                  <div class="code-line"><span class="c-keyword">&#64;Component</span>(&#123; <span class="c-prop">standalone</span>: <span class="c-val">true</span> &#125;)</div>
                  <div class="code-line"><span class="c-keyword">export class</span> <span class="c-class">AwesomeWebsite</span> &#123;</div>
                  <div class="code-line indent"><span class="c-prop">speed</span> = <span class="c-str">'Instant Load'</span>;</div>
                  <div class="code-line indent"><span class="c-prop">design</span> = <span class="c-str">'Glassmorphic WOW'</span>;</div>
                  <div class="code-line">&#125;</div>
                </div>
              </div>
            </div>

            <!-- Floating Badge 1 -->
            <div class="glass-card floating-badge fb-1">
              <i class="fa-solid fa-chart-line icon-cyan"></i>
              <div>
                <strong>+240%</strong>
                <span>Conversion Boost</span>
              </div>
            </div>

            <!-- Floating Badge 2 -->
            <div class="glass-card floating-badge fb-2">
              <i class="fa-solid fa-star icon-gold"></i>
              <div>
                <strong>5.0 Rating</strong>
                <span>Client Delight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      padding: 160px 0 100px;
      overflow: hidden;
    }
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
    }
    .orb-1 {
      width: 450px;
      height: 450px;
      background: rgba(0, 242, 254, 0.15);
      top: -100px;
      left: -100px;
    }
    .orb-2 {
      width: 500px;
      height: 500px;
      background: rgba(127, 0, 255, 0.12);
      bottom: -150px;
      right: -100px;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 50px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .hero-title {
      font-size: 3.5rem;
      margin: 20px 0;
      letter-spacing: -1px;
    }
    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--text-muted);
      margin-bottom: 36px;
      max-width: 580px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 48px;
    }
    .hero-trust p {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-dim);
      letter-spacing: 1.5px;
      margin-bottom: 12px;
    }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .tech-pill {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.04);
      padding: 6px 14px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Hero Visual */
    .hero-visual {
      position: relative;
    }
    .visual-card-wrapper {
      position: relative;
    }
    .main-visual-card {
      overflow: hidden;
      border: 1px solid var(--border-glow);
    }
    .card-header-bar {
      background: rgba(0, 0, 0, 0.3);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .dots {
      display: flex;
      gap: 6px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }
    .window-title {
      font-size: 0.8rem;
      font-family: monospace;
      color: var(--text-dim);
    }
    .card-body-content {
      padding: 24px;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-item {
      background: rgba(255, 255, 255, 0.03);
      padding: 16px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 14px;
      border: 1px solid var(--border-color);
    }
    .stat-icon {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      background: rgba(0, 242, 254, 0.15);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .stat-icon.purple {
      background: rgba(127, 0, 255, 0.15);
      color: #e100ff;
    }
    .stat-number {
      display: block;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .code-preview {
      background: rgba(0, 0, 0, 0.4);
      padding: 16px;
      border-radius: var(--radius-md);
      font-family: monospace;
      font-size: 0.85rem;
      line-height: 1.7;
    }
    .c-keyword { color: #ff79c6; }
    .c-comp { color: #8be9fd; }
    .c-str { color: #f1fa8c; }
    .c-prop { color: #50fa7b; }
    .c-val { color: #bd93f9; }
    .c-class { color: #ffb86c; }
    .indent { padding-left: 20px; }

    .floating-badge {
      position: absolute;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: var(--shadow-lg);
    }
    .fb-1 {
      top: -20px;
      right: -20px;
    }
    .fb-2 {
      bottom: -20px;
      left: -20px;
    }
    .icon-cyan { color: var(--primary); font-size: 1.4rem; }
    .icon-gold { color: #ffbd2e; font-size: 1.4rem; }

    @media (max-width: 992px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        justify-content: center;
      }
      .tech-tags {
        justify-content: center;
      }
      .hero-visual {
        margin-top: 40px;
      }
    }
  `]
})
export class HeroComponent {}
