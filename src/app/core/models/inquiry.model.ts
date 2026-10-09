export interface InquiryFormValue {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  message: string;
}

export type InquirySendStatus = 'idle' | 'sending' | 'success' | 'error';
