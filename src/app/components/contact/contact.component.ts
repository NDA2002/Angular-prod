import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="section-padding contact-section">
      <div class="container">
        <div class="section-header">
          <span class="badge"><i class="fa-solid fa-paper-plane"></i> GET IN TOUCH</span>
          <h2>Let's Build Something <span class="gradient-text">Extraordinary</span></h2>
          <p>Ready to start your Angular static website project? Drop us a message and our lead engineer will respond within 2 hours.</p>
        </div>

        <div class="contact-grid">
          <!-- Info Column -->
          <div class="info-column">
            <div class="glass-card info-card">
              <h3>Contact Details</h3>
              <p>Reach out directly or schedule a free consultation with our architecture team.</p>

              <div class="contact-methods">
                <div class="method-item">
                  <div class="method-icon"><i class="fa-solid fa-envelope"></i></div>
                  <div>
                    <span class="m-title">Email Us</span>
                    <a href="mailto:contact@apexvision.dev" class="m-val">contact&#64;apexvision.dev</a>
                  </div>
                </div>

                <div class="method-item">
                  <div class="method-icon purple"><i class="fa-solid fa-phone"></i></div>
                  <div>
                    <span class="m-title">Direct Line</span>
                    <a href="tel:+18005552739" class="m-val">+1 (800) 555-APEX</a>
                  </div>
                </div>

                <div class="method-item">
                  <div class="method-icon green"><i class="fa-solid fa-location-dot"></i></div>
                  <div>
                    <span class="m-title">Global Office</span>
                    <span class="m-val">Silicon Valley, CA & Remote</span>
                  </div>
                </div>
              </div>

              <div class="social-links">
                <a href="#" class="social-btn"><i class="fa-brands fa-github"></i></a>
                <a href="#" class="social-btn"><i class="fa-brands fa-twitter"></i></a>
                <a href="#" class="social-btn"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#" class="social-btn"><i class="fa-brands fa-discord"></i></a>
              </div>
            </div>
          </div>

          <!-- Form Column -->
          <div class="form-column">
            <div class="glass-card form-card">
              <!-- Toast Notification -->
              <div class="toast-success" *ngIf="formSubmitted">
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Message Sent!</strong>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              </div>

              <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="form-group">
                  <label for="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    [(ngModel)]="formData.name" 
                    required 
                    #nameModel="ngModel"
                    placeholder="John Doe" 
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    [(ngModel)]="formData.email" 
                    required 
                    email
                    #emailModel="ngModel"
                    placeholder="john@example.com" 
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="subject">Project Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    [(ngModel)]="formData.subject" 
                    placeholder="New Angular Static Website Project" 
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="message">Message Details *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    [(ngModel)]="formData.message" 
                    required 
                    placeholder="Tell us about your target goals, timeline, and features..." 
                    class="form-input"
                  ></textarea>
                </div>

                <button type="submit" [disabled]="!contactForm.form.valid || isSubmitting" class="btn btn-primary full-btn">
                  <span *ngIf="!isSubmitting">Send Message Now</span>
                  <span *ngIf="isSubmitting"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span>
                  <i class="fa-solid fa-paper-plane" *ngIf="!isSubmitting"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      position: relative;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 40px;
    }
    .info-card {
      padding: 40px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .info-card h3 {
      font-size: 1.75rem;
      margin-bottom: 12px;
    }
    .info-card p {
      color: var(--text-muted);
      margin-bottom: 32px;
    }
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 40px;
      flex-grow: 1;
    }
    .method-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .method-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background: rgba(0, 242, 254, 0.12);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }
    .method-icon.purple {
      background: rgba(127, 0, 255, 0.12);
      color: #e100ff;
    }
    .method-icon.green {
      background: rgba(16, 185, 129, 0.12);
      color: var(--success);
    }
    .m-title {
      display: block;
      font-size: 0.75rem;
      color: var(--text-dim);
      font-weight: 700;
      text-transform: uppercase;
    }
    .m-val {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .social-links {
      display: flex;
      gap: 12px;
    }
    .social-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: all var(--transition-fast);
    }
    .social-btn:hover {
      background: var(--gradient-primary);
      color: #0b0f19;
      border-color: transparent;
      transform: translateY(-3px);
    }

    /* Form Styles */
    .form-card {
      padding: 40px;
    }
    .toast-success {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid var(--success);
      color: var(--text-main);
      padding: 16px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
      animation: fadeIn 0.4s ease;
    }
    .toast-success i {
      font-size: 1.8rem;
      color: var(--success);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .form-input {
      width: 100%;
      padding: 14px 18px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.95rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .form-input:focus {
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.06);
    }
    .full-btn {
      width: 100%;
      margin-top: 10px;
    }

    @media (max-width: 992px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  formSubmitted = false;

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.formSubmitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' };
        
        setTimeout(() => {
          this.formSubmitted = false;
        }, 6000);
      }, 1000);
    }
  }
}
