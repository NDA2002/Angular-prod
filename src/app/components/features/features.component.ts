import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="estimator" class="section-padding estimator-section">
      <div class="container">
        <div class="estimator-wrapper glass-card">
          <div class="estimator-header">
            <span class="badge"><i class="fa-solid fa-calculator"></i> INTERACTIVE ESTIMATOR</span>
            <h2>Calculate Your Project <span class="gradient-text">Timeline & Cost</span></h2>
            <p>Select your project requirements below to see instant estimates tailored to your business needs.</p>
          </div>

          <div class="estimator-grid">
            <!-- Options Controls -->
            <div class="controls-column">
              <!-- Project Type -->
              <div class="control-group">
                <label class="control-label">1. Select Project Type</label>
                <div class="radio-buttons">
                  <button 
                    type="button"
                    class="radio-btn" 
                    [class.selected]="projectType === 'landing'"
                    (click)="projectType = 'landing'"
                  >
                    <i class="fa-solid fa-file-code"></i>
                    <span>Landing Page</span>
                  </button>
                  <button 
                    type="button"
                    class="radio-btn" 
                    [class.selected]="projectType === 'corporate'"
                    (click)="projectType = 'corporate'"
                  >
                    <i class="fa-solid fa-briefcase"></i>
                    <span>Corporate Site</span>
                  </button>
                  <button 
                    type="button"
                    class="radio-btn" 
                    [class.selected]="projectType === 'webapp'"
                    (click)="projectType = 'webapp'"
                  >
                    <i class="fa-solid fa-cubes"></i>
                    <span>Full Angular Web App</span>
                  </button>
                </div>
              </div>

              <!-- Page Count Slider -->
              <div class="control-group">
                <div class="slider-label">
                  <label class="control-label">2. Number of Custom Pages</label>
                  <span class="slider-value">{{ pageCount }} Pages</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  [(ngModel)]="pageCount" 
                  class="custom-range"
                />
              </div>

              <!-- Add-ons Checkboxes -->
              <div class="control-group">
                <label class="control-label">3. Enhancements & Add-ons</label>
                <div class="checkbox-grid">
                  <label class="checkbox-card" [class.checked]="addons.seo">
                    <input type="checkbox" [(ngModel)]="addons.seo" hidden />
                    <i class="fa-solid fa-magnifying-glass-chart"></i>
                    <span>Advanced SEO Package</span>
                  </label>
                  <label class="checkbox-card" [class.checked]="addons.pwa">
                    <input type="checkbox" [(ngModel)]="addons.pwa" hidden />
                    <i class="fa-solid fa-mobile-screen"></i>
                    <span>PWA Offline Support</span>
                  </label>
                  <label class="checkbox-card" [class.checked]="addons.animations">
                    <input type="checkbox" [(ngModel)]="addons.animations" hidden />
                    <i class="fa-solid fa-wand-magic"></i>
                    <span>3D / Micro Animations</span>
                  </label>
                  <label class="checkbox-card" [class.checked]="addons.cms">
                    <input type="checkbox" [(ngModel)]="addons.cms" hidden />
                    <i class="fa-solid fa-database"></i>
                    <span>Headless CMS Integration</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Estimate Output Summary Card -->
            <div class="summary-column">
              <div class="glass-card summary-card">
                <h3 class="summary-title"><i class="fa-solid fa-receipt"></i> Estimate Summary</h3>

                <div class="summary-rows">
                  <div class="sum-row">
                    <span>Base Architecture</span>
                    <span class="sum-val">\${{ getBasePrice() }}</span>
                  </div>
                  <div class="sum-row">
                    <span>Pages ({{ pageCount }})</span>
                    <span class="sum-val">\${{ pageCount * 120 }}</span>
                  </div>
                  <div class="sum-row" *ngIf="addons.seo">
                    <span>Advanced SEO</span>
                    <span class="sum-val">+\$250</span>
                  </div>
                  <div class="sum-row" *ngIf="addons.pwa">
                    <span>PWA Support</span>
                    <span class="sum-val">+\$300</span>
                  </div>
                  <div class="sum-row" *ngIf="addons.animations">
                    <span>Micro-animations</span>
                    <span class="sum-val">+\$200</span>
                  </div>
                  <div class="sum-row" *ngIf="addons.cms">
                    <span>Headless CMS</span>
                    <span class="sum-val">+\$450</span>
                  </div>
                </div>

                <div class="total-box">
                  <div class="total-info">
                    <span class="total-label">Estimated Budget</span>
                    <span class="total-price">\${{ calculateTotal() }}</span>
                  </div>
                  <div class="timeline-info">
                    <i class="fa-regular fa-clock"></i> Delivery: <strong>{{ calculateTimeline() }} Days</strong>
                  </div>
                </div>

                <a href="#contact" class="btn btn-primary full-width">
                  <span>Lock In This Estimate</span>
                  <i class="fa-solid fa-paper-plane"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .estimator-section {
      position: relative;
    }
    .estimator-wrapper {
      padding: 50px;
    }
    .estimator-header {
      text-align: center;
      max-width: 650px;
      margin: 0 auto 50px;
    }
    .estimator-header h2 {
      font-size: 2.25rem;
      margin: 14px 0;
    }
    .estimator-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 40px;
      align-items: start;
    }
    .control-group {
      margin-bottom: 32px;
    }
    .control-label {
      display: block;
      font-weight: 700;
      font-size: 1.05rem;
      margin-bottom: 14px;
      color: var(--text-main);
    }
    .radio-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }
    .radio-btn {
      padding: 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all var(--transition-fast);
    }
    .radio-btn i {
      font-size: 1.4rem;
    }
    .radio-btn.selected {
      background: var(--gradient-glow);
      border-color: var(--primary);
      color: var(--primary);
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
    }
    .slider-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .slider-value {
      font-weight: 700;
      color: var(--primary);
      font-size: 1.1rem;
    }
    .custom-range {
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      outline: none;
      accent-color: var(--primary);
      margin-top: 10px;
    }
    .checkbox-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .checkbox-card {
      padding: 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .checkbox-card.checked {
      background: rgba(0, 242, 254, 0.08);
      border-color: var(--primary);
      color: var(--primary);
    }

    /* Summary Column */
    .summary-card {
      padding: 30px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border-glow);
    }
    .summary-title {
      font-size: 1.25rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--primary);
    }
    .summary-rows {
      margin-bottom: 24px;
    }
    .sum-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .sum-val {
      font-weight: 700;
      color: var(--text-main);
    }
    .total-box {
      background: var(--gradient-glow);
      padding: 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-glow);
      margin-bottom: 24px;
    }
    .total-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .total-label {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .total-price {
      font-family: 'Outfit', sans-serif;
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--primary);
    }
    .timeline-info {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .full-width {
      width: 100%;
    }

    @media (max-width: 992px) {
      .estimator-grid {
        grid-template-columns: 1fr;
      }
      .checkbox-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FeaturesComponent {
  projectType: 'landing' | 'corporate' | 'webapp' = 'corporate';
  pageCount: number = 5;
  addons = {
    seo: true,
    pwa: false,
    animations: true,
    cms: false
  };

  getBasePrice(): number {
    switch (this.projectType) {
      case 'landing': return 499;
      case 'corporate': return 999;
      case 'webapp': return 1899;
    }
  }

  calculateTotal(): number {
    let total = this.getBasePrice() + (this.pageCount * 120);
    if (this.addons.seo) total += 250;
    if (this.addons.pwa) total += 300;
    if (this.addons.animations) total += 200;
    if (this.addons.cms) total += 450;
    return total;
  }

  calculateTimeline(): number {
    let days = Math.ceil(this.pageCount * 1.5);
    if (this.projectType === 'landing') days = 4;
    if (this.projectType === 'webapp') days += 5;
    if (this.addons.cms) days += 3;
    return days;
  }
}
