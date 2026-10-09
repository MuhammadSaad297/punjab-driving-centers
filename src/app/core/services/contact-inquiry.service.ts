import emailjs from '@emailjs/browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { environment } from '../../../environments/environment';
import { InquiryFormValue } from '../models/inquiry.model';

export type InquiryChannel = 'web3forms' | 'emailjs';

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

interface ContactFormConfigFile {
  web3formsAccessKey?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactInquiryService {
  private readonly http = inject(HttpClient);
  private readonly recipient = environment.inquiryRecipientEmail;
  private readonly web3FormsUrl = 'https://api.web3forms.com/submit';

  private web3formsAccessKey = (environment.web3formsAccessKey ?? '').trim();

  /** Loads optional key from assets (works on localhost without rebuild). */
  private readonly configReady$ = this.http
    .get<ContactFormConfigFile>('assets/config/contact-form.json')
    .pipe(
      tap((file) => {
        const fromFile = file.web3formsAccessKey?.trim();
        if (fromFile) {
          this.web3formsAccessKey = fromFile;
        }
      }),
      catchError(() => of(null)),
      map(() => undefined),
      shareReplay(1)
    );

  ensureReady(): Observable<void> {
    return this.configReady$;
  }

  isWeb3FormsConfigured(): boolean {
    return this.web3formsAccessKey.length > 0;
  }

  isEmailJsConfigured(): boolean {
    const cfg = environment.emailJs;
    return Boolean(cfg.publicKey && cfg.serviceId && cfg.templateId);
  }

  isAutoSendConfigured(): boolean {
    return this.isWeb3FormsConfigured() || this.isEmailJsConfigured();
  }

  sendInquiry(form: InquiryFormValue): Observable<InquiryChannel> {
    return this.ensureReady().pipe(
      switchMap(() => {
        if (this.isWeb3FormsConfigured()) {
          return this.sendViaWeb3Forms(form).pipe(map(() => 'web3forms' as const));
        }
        if (this.isEmailJsConfigured()) {
          return this.sendViaEmailJs(form).pipe(map(() => 'emailjs' as const));
        }
        return throwError(
          () =>
            new Error(
              'Form email is not configured. Add web3formsAccessKey in assets/config/contact-form.json or environment.ts, then restart ng serve.'
            )
        );
      })
    );
  }

  private sendViaWeb3Forms(form: InquiryFormValue): Observable<void> {
    const payload = {
      access_key: this.web3formsAccessKey,
      subject: `Driving inquiry — ${form.name}`,
      name: form.name,
      from_name: form.name,
      email: form.email,
      phone: form.phone,
      vehicle_type: form.vehicle,
      message: [
        `Phone: ${form.phone}`,
        `Vehicle: ${form.vehicle}`,
        '',
        form.message || '(No message provided)',
      ].join('\n'),
    };

    return from(
      fetch(this.web3FormsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(async (response) => {
        const data = (await response.json()) as Web3FormsResponse;
        if (!response.ok || !data.success) {
          throw new Error(data.message ?? `Web3Forms error (${response.status})`);
        }
        return data;
      })
    ).pipe(map(() => undefined));
  }

  private sendViaEmailJs(form: InquiryFormValue): Observable<void> {
    const { publicKey, serviceId, templateId } = environment.emailJs;

    const templateParams: Record<string, string> = {
      to_email: this.recipient,
      from_name: form.name,
      user_name: form.name,
      user_email: form.email,
      user_phone: form.phone,
      phone: form.phone,
      vehicle_type: form.vehicle,
      message: form.message || '(No message provided)',
      reply_to: form.email,
    };

    return from(
      emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      })
    ).pipe(
      switchMap((result) =>
        result.status === 200 ? of(undefined) : throwError(() => new Error('EmailJS send failed'))
      ),
      catchError((err: HttpErrorResponse | Error) =>
        throwError(() => new Error(err instanceof Error ? err.message : 'EmailJS send failed'))
      )
    );
  }
}
