import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { InquiryFormValue, InquirySendStatus } from '../../core/models/inquiry.model';
import { AppConfigService } from '../../core/services/app-config.service';
import { ContactInquiryService, InquiryChannel } from '../../core/services/contact-inquiry.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  readonly config = inject(AppConfigService);
  private readonly inquiryService = inject(ContactInquiryService);
  private readonly toast = inject(ToastService);

  configReady = false;
  autoSendReady = false;

  form: InquiryFormValue = {
    name: '',
    email: '',
    phone: '',
    vehicle: 'automatic',
    message: '',
  };

  status: InquirySendStatus = 'idle';
  lastChannel: InquiryChannel | null = null;

  ngOnInit(): void {
    this.inquiryService.ensureReady().subscribe(() => {
      this.configReady = true;
      this.autoSendReady = this.inquiryService.isAutoSendConfigured();
    });
  }

  onSubmit(): void {
    if (this.status === 'sending' || !this.configReady) {
      return;
    }

    this.status = 'sending';
    this.lastChannel = null;

    this.inquiryService.sendInquiry({ ...this.form }).subscribe({
      next: (channel) => {
        this.lastChannel = channel;
        this.status = 'idle';
        this.resetForm();
        this.toast.success('Email sent successfully! We will contact you soon.');
      },
      error: (err: Error) => {
        this.status = 'idle';
        this.toast.error('Could not send your inquiry. Please try again or call us.');
      },
    });
  }

  private resetForm(): void {
    this.form = {
      name: '',
      email: '',
      phone: '',
      vehicle: 'automatic',
      message: '',
    };
  }
}
