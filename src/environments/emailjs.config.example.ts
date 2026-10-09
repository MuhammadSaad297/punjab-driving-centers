/**
 * Copy these values into environment.ts / environment.prod.ts after setting up EmailJS.
 * @see https://www.emailjs.com/docs/
 *
 * 1. Create account → Email Services → connect inbox for info@punjabdrivingcenter.com
 * 2. Email Templates → create template with variables:
 *    {{from_name}}, {{user_email}}, {{user_phone}}, {{vehicle_type}}, {{message}}
 *    Set "To Email" to info@punjabdrivingcenter.com (or use {{to_email}})
 * 3. Account → API keys → Public Key
 */
export const emailJsExample = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
};
