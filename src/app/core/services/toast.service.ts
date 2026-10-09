import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error';

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  readonly toast = signal<ToastMessage | null>(null);
  private hideTimer?: ReturnType<typeof setTimeout>;

  success(text: string, durationMs = 4000): void {
    this.show('success', text, durationMs);
  }

  error(text: string, durationMs = 5000): void {
    this.show('error', text, durationMs);
  }

  dismiss(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
    this.toast.set(null);
  }

  private show(kind: ToastKind, text: string, durationMs: number): void {
    this.dismiss();
    const id = ++this.nextId;
    this.toast.set({ id, kind, text });
    this.hideTimer = setTimeout(() => {
      if (this.toast()?.id === id) {
        this.toast.set(null);
      }
    }, durationMs);
  }
}
