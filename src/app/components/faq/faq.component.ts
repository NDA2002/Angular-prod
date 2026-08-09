import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'dev' | 'pricing' | 'support';
  categoryLabel: string;
  icon: string;
  isOpen?: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  userVoted?: 'up' | 'down';
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="faq" class="section-padding faq-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge"><i class="fa-solid fa-circle-question"></i> FREQUENTLY ASKED QUESTIONS</span>
          <h2>Got Questions? <span class="gradient-text">We Have Answers</span></h2>
          <p>Everything you need to know about our services, process, technology stack, and pricing models.</p>
        </div>

        <!-- Search Bar & Filters Header -->
        <div class="faq-controls-card glass-card">
          <div class="search-box">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search questions (e.g. Angular, pricing, timeline, security)..." 
              [(ngModel)]="searchQuery" 
              (input)="onSearchChange()" 
            />
            <button *ngIf="searchQuery" class="clear-search-btn" (click)="clearSearch()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Category Filter Tabs -->
          <div class="category-tabs">
            <button 
              *ngFor="let cat of categories" 
              class="cat-tab-btn" 
              [class.active]="selectedCategory === cat.key"
              (click)="selectCategory(cat.key)"
            >
              <i [class]="cat.icon"></i>
              <span>{{ cat.label }}</span>
            </button>
          </div>
        </div>

        <!-- FAQ Items Accordion Grid -->
        <div class="faq-list">
          <div 
            *ngFor="let item of filteredFaqs" 
            class="faq-card glass-card"
            [class.expanded]="item.isOpen"
          >
            <div class="faq-question-bar" (click)="toggleFaq(item)">
              <div class="question-title-wrap">
                <div class="cat-badge" [class]="'cat-' + item.category">
                  <i [class]="item.icon"></i>
                </div>
                <h3 class="faq-question-text">{{ item.question }}</h3>
              </div>
              <button class="accordion-icon-btn" aria-label="Toggle answer">
                <i class="fa-solid" [class.fa-chevron-down]="!item.isOpen" [class.fa-chevron-up]="item.isOpen"></i>
              </button>
            </div>

            <div class="faq-answer-content" *ngIf="item.isOpen">
              <div class="answer-inner">
                <p>{{ item.answer }}</p>

                <div class="faq-meta-bar">
                  <span class="faq-tag"><i class="fa-solid fa-tag"></i> {{ item.categoryLabel }}</span>

                  <div class="helpfulness-widget">
                    <span class="helpful-label">Was this helpful?</span>
                    <button 
                      class="vote-btn vote-up" 
                      [class.voted]="item.userVoted === 'up'"
                      (click)="voteHelpful(item, 'up')"
                    >
                      <i class="fa-thumbs-up" [class.fa-solid]="item.userVoted === 'up'" [class.fa-regular]="item.userVoted !== 'up'"></i>
                      <span>{{ item.helpfulCount }}</span>
                    </button>
                    <button 
                      class="vote-btn vote-down" 
                      [class.voted]="item.userVoted === 'down'"
                      (click)="voteHelpful(item, 'down')"
                    >
                      <i class="fa-thumbs-down" [class.fa-solid]="item.userVoted === 'down'" [class.fa-regular]="item.userVoted !== 'down'"></i>
                      <span>{{ item.unhelpfulCount }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State when search returns no results -->
          <div *ngIf="filteredFaqs.length === 0" class="empty-faq-state glass-card text-center">
            <i class="fa-solid fa-cloud-sun-rain empty-icon"></i>
            <h3>No matching questions found</h3>
            <p>We couldn't find anything matching "{{ searchQuery }}". Try another keyword or reach out directly to our team!</p>
            <button class="btn btn-secondary mt-3" (click)="clearSearch()">
              <i class="fa-solid fa-rotate-left"></i> Reset Search
            </button>
          </div>
        </div>

        <!-- Help CTA Box -->
        <div class="faq-cta-banner glass-card mt-5">
          <div class="cta-content">
            <div class="cta-icon">
              <i class="fa-solid fa-headset"></i>
            </div>
            <div class="cta-text">
              <h3>Still have unanswered questions?</h3>
              <p>Can't find the answer you're looking for? Talk to our dedicated engineering team today.</p>
            </div>
          </div>
          <a href="#contact" class="btn btn-primary cta-action-btn">
            <i class="fa-solid fa-paper-plane"></i> Contact Us
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      position: relative;
      background: radial-gradient(circle at 50% 0%, rgba(127, 0, 255, 0.05) 0%, transparent 60%);
    }

    .faq-controls-card {
      padding: 24px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-radius: var(--radius-lg);
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .search-icon {
      position: absolute;
      left: 20px;
      color: var(--text-dim);
      font-size: 1.1rem;
    }

    .search-input {
      width: 100%;
      padding: 16px 48px 16px 52px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-main);
      font-size: 1rem;
      transition: all var(--transition-fast);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
      background: rgba(0, 0, 0, 0.35);
    }

    .clear-search-btn {
      position: absolute;
      right: 16px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1.1rem;
      padding: 6px;
      border-radius: 50%;
      transition: color var(--transition-fast);
    }

    .clear-search-btn:hover {
      color: var(--primary);
    }

    .category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .cat-tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .cat-tab-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-main);
      transform: translateY(-2px);
    }

    .cat-tab-btn.active {
      background: var(--gradient-primary);
      color: #0b0f19;
      border-color: transparent;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .faq-card {
      border-radius: var(--radius-md);
      transition: all var(--transition-normal);
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .faq-card:hover {
      border-color: var(--border-glow);
      box-shadow: var(--shadow-sm);
    }

    .faq-card.expanded {
      border-color: var(--primary);
      background: var(--bg-card-hover);
      box-shadow: var(--shadow-glow);
    }

    .faq-question-bar {
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      gap: 16px;
    }

    .question-title-wrap {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .cat-badge {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .cat-general { background: rgba(0, 242, 254, 0.15); color: #00f2fe; }
    .cat-dev { background: rgba(127, 0, 255, 0.15); color: #e100ff; }
    .cat-pricing { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .cat-support { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

    .faq-question-text {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-main);
    }

    .accordion-icon-btn {
      background: rgba(255, 255, 255, 0.05);
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .faq-card.expanded .accordion-icon-btn {
      background: var(--primary);
      color: #0b0f19;
    }

    .faq-answer-content {
      border-top: 1px solid var(--border-color);
      padding: 20px 24px;
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .answer-inner p {
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .faq-meta-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 16px;
      border-top: 1px dashed var(--border-color);
    }

    .faq-tag {
      font-size: 0.85rem;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .helpfulness-widget {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .helpful-label {
      font-size: 0.85rem;
      color: var(--text-dim);
    }

    .vote-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .vote-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--text-main);
    }

    .vote-btn.vote-up.voted {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border-color: #10b981;
    }

    .vote-btn.vote-down.voted {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border-color: #ef4444;
    }

    .empty-faq-state {
      padding: 48px 24px;
      border-radius: var(--radius-lg);
    }

    .empty-icon {
      font-size: 3rem;
      color: var(--text-dim);
      margin-bottom: 16px;
    }

    .faq-cta-banner {
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(127, 0, 255, 0.1) 100%);
      border: 1px solid var(--border-glow);
    }

    .cta-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .cta-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-md);
      background: var(--gradient-primary);
      color: #0b0f19;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
    }

    .cta-text h3 {
      font-size: 1.25rem;
      margin-bottom: 4px;
    }

    .cta-text p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .faq-cta-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .cta-action-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class FaqComponent {
  searchQuery: string = '';
  selectedCategory: string = 'all';

  categories = [
    { key: 'all', label: 'All Questions', icon: 'fa-solid fa-list' },
    { key: 'general', label: 'General', icon: 'fa-solid fa-circle-info' },
    { key: 'dev', label: 'Development Process', icon: 'fa-solid fa-code' },
    { key: 'pricing', label: 'Pricing & Billing', icon: 'fa-solid fa-wallet' },
    { key: 'support', label: 'Support & Security', icon: 'fa-solid fa-shield-halved' }
  ];

  faqs: FaqItem[] = [
    {
      id: 1,
      category: 'general',
      categoryLabel: 'General',
      icon: 'fa-solid fa-rocket',
      question: 'What types of web applications do you specialize in?',
      answer: 'We specialize in building modern, high-performance web applications using Angular, React, Next.js, and TypeScript. Our expertise covers SaaS products, enterprise dashboards, static marketing websites, and AI-powered portals with glassmorphism UI aesthetics.',
      helpfulCount: 42,
      unhelpfulCount: 2,
      isOpen: true
    },
    {
      id: 2,
      category: 'dev',
      categoryLabel: 'Development Process',
      icon: 'fa-solid fa-laptop-code',
      question: 'How long does a typical project take from start to finish?',
      answer: 'Small static sites or landing pages usually take 1 to 2 weeks. Full-scale Angular SaaS web apps take between 4 to 8 weeks depending on feature complexity, API integrations, and user testing requirements.',
      helpfulCount: 38,
      unhelpfulCount: 1
    },
    {
      id: 3,
      category: 'pricing',
      categoryLabel: 'Pricing & Billing',
      icon: 'fa-solid fa-receipt',
      question: 'What are your pricing models and payment terms?',
      answer: 'We offer both fixed-price project quotes and time-and-materials milestone billing. Typically, projects require a 30% deposit upfront, 40% upon prototype delivery, and 30% upon final sign-off and deployment.',
      helpfulCount: 29,
      unhelpfulCount: 0
    },
    {
      id: 4,
      category: 'dev',
      categoryLabel: 'Development Process',
      icon: 'fa-solid fa-mobile-screen',
      question: 'Will my web application be fully responsive and mobile-friendly?',
      answer: 'Absolutely! Every platform we build is engineered with mobile-first design principles, fluid grid layouts, and touch-optimized micro-interactions across desktop, tablet, and mobile devices.',
      helpfulCount: 51,
      unhelpfulCount: 3
    },
    {
      id: 5,
      category: 'support',
      categoryLabel: 'Support & Security',
      icon: 'fa-solid fa-lock',
      question: 'Do you provide ongoing maintenance and technical support after launch?',
      answer: 'Yes! We provide 30 days of complimentary post-launch bug fixes and monitoring. Following that, we offer monthly SLA support packages for performance optimization, security updates, and feature updates.',
      helpfulCount: 34,
      unhelpfulCount: 1
    },
    {
      id: 6,
      category: 'support',
      categoryLabel: 'Support & Security',
      icon: 'fa-solid fa-server',
      question: 'Can you host and deploy the website on custom domain servers?',
      answer: 'Yes, we handle complete CI/CD deployment pipelines on platforms like Vercel, Netlify, AWS CloudFront, Cloudflare Pages, or custom Linux/Windows server environments with SSL certificates.',
      helpfulCount: 27,
      unhelpfulCount: 0
    }
  ];

  get filteredFaqs(): FaqItem[] {
    return this.faqs.filter(item => {
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const q = this.searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        item.question.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q) || 
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(key: string) {
    this.selectedCategory = key;
  }

  onSearchChange() {
    // Keeps filtering active instantly
  }

  clearSearch() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
  }

  toggleFaq(item: FaqItem) {
    item.isOpen = !item.isOpen;
  }

  voteHelpful(item: FaqItem, type: 'up' | 'down') {
    if (item.userVoted === type) {
      if (type === 'up') item.helpfulCount--;
      else item.unhelpfulCount--;
      item.userVoted = undefined;
    } else {
      if (item.userVoted === 'up') item.helpfulCount--;
      if (item.userVoted === 'down') item.unhelpfulCount--;

      if (type === 'up') item.helpfulCount++;
      else item.unhelpfulCount++;
      item.userVoted = type;
    }
  }
}
