import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarBg: string;
  stars: number;
  quote: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="section-padding testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="badge"><i class="fa-solid fa-quote-left"></i> CLIENT FEEDBACK</span>
          <h2>Loved by Founders & <span class="gradient-text">Engineering Teams</span></h2>
          <p>Read how ApexVision transformed static web speeds, conversion rates, and brand identities for companies worldwide.</p>
        </div>

        <div class="testimonials-grid">
          <div class="glass-card test-card" *ngFor="let t of testimonials">
            <div class="star-rating">
              <i class="fa-solid fa-star" *ngFor="let s of [1,2,3,4,5]"></i>
            </div>

            <p class="quote-text">"{{ t.quote }}"</p>

            <div class="user-profile">
              <div class="avatar" [style.background]="t.avatarBg">
                {{ t.avatar }}
              </div>
              <div class="user-meta">
                <h4 class="user-name">{{ t.name }}</h4>
                <span class="user-role">{{ t.role }} &bull; <strong class="company">{{ t.company }}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      position: relative;
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }
    .test-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
    }
    .star-rating {
      color: #ffbd2e;
      font-size: 0.95rem;
      margin-bottom: 18px;
      display: flex;
      gap: 4px;
    }
    .quote-text {
      color: var(--text-muted);
      font-size: 0.98rem;
      line-height: 1.6;
      margin-bottom: 24px;
      font-style: italic;
      flex-grow: 1;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0b0f19;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .user-name {
      font-size: 1.05rem;
      margin-bottom: 2px;
    }
    .user-role {
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .company {
      color: var(--primary);
    }
  `]
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'VP of Product',
      company: 'AuraCloud Inc.',
      avatar: 'SJ',
      avatarBg: 'linear-gradient(135deg, #00f2fe, #4facfe)',
      stars: 5,
      quote: 'ApexVision built our static web portal using Angular. Our Lighthouse score jumped to 100 instantly, and customer bounce rates decreased by 42%!'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      company: 'NeuroCore AI',
      avatar: 'DC',
      avatarBg: 'linear-gradient(135deg, #7f00ff, #e100ff)',
      stars: 5,
      quote: 'The visual aesthetics and glassmorphism design are breathtaking. The interactive estimator feature alone brought in dozens of high-value client leads.'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Head of Marketing',
      company: 'Zenith Estates',
      avatar: 'ER',
      avatarBg: 'linear-gradient(135deg, #11998e, #38ef7d)',
      stars: 5,
      quote: 'Flawless execution, zero bugs, and incredibly smooth responsive layout across mobile and desktop. I recommend ApexVision to every growth team.'
    }
  ];
}
