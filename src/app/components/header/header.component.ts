import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container header-container">
        <a href="#" class="brand-logo">
          <div class="logo-icon">
            <i class="fa-solid fa-cube"></i>
          </div>
          <span class="logo-text">Apex<span class="gradient-text">Vision</span></span>
        </a>

        <nav class="nav-links" [class.open]="mobileMenuOpen">
          <a href="#hero" (click)="closeMobileMenu()" class="nav-item">Home</a>
          <a href="#services" (click)="closeMobileMenu()" class="nav-item">Services</a>
          <a href="#portfolio" (click)="closeMobileMenu()" class="nav-item">Portfolio</a>
          <a href="#estimator" (click)="closeMobileMenu()" class="nav-item">Estimator</a>
          <a href="#testimonials" (click)="closeMobileMenu()" class="nav-item">Testimonials</a>
          <a href="#about" (click)="closeMobileMenu()" class="nav-item">About Us</a>
          <a href="#contact" (click)="closeMobileMenu()" class="nav-item">Contact</a>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" (click)="toggleTheme()" [title]="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <i [class]="isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
          </button>
          
          <a href="#contact" class="btn btn-primary nav-cta">Get Started</a>

          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle menu">
            <i [class]="mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 20px 0;
      transition: all var(--transition-normal);
    }
    .header.scrolled {
      padding: 12px 0;
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0b0f19;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(0, 242, 254, 0.3);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }
    .nav-item {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-muted);
      transition: color var(--transition-fast);
      position: relative;
    }
    .nav-item:hover {
      color: var(--primary);
    }
    .nav-item::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 2px;
      background: var(--gradient-primary);
      transition: width var(--transition-fast);
      border-radius: 2px;
    }
    .nav-item:hover::after {
      width: 100%;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .theme-toggle {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }
    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--primary);
      border-color: var(--border-glow);
    }
    .nav-cta {
      padding: 10px 22px;
      font-size: 0.9rem;
    }
    .mobile-toggle {
      display: none;
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
      font-size: 1.2rem;
      cursor: pointer;
    }

    @media (max-width: 992px) {
      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: var(--bg-surface);
        flex-direction: column;
        padding: 30px;
        gap: 20px;
        border-bottom: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        transform: translateY(-150%);
        transition: transform var(--transition-normal);
        z-index: 999;
      }
      .nav-links.open {
        transform: translateY(0);
      }
      .mobile-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .nav-cta {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() isDarkMode: boolean = true;
  @Output() themeToggled = new EventEmitter<void>();

  isScrolled = false;
  mobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  toggleTheme() {
    this.themeToggled.emit();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
