export interface TextSettings {
  color: string;
  fontFamily: string;
  fontSize: number;
  x: number;
  y: number;
}

export interface DateSettings {
  enabled: boolean;
  format: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  x: number;
  y: number;
}

export interface QRSettings {
  enabled: boolean;
  size: number;
  x: number;
  y: number;
}

export interface CertificateConfig {
  templateImage: string | null;
  names: string[];
  nameSettings: TextSettings;
  dateSettings: DateSettings;
  qrSettings: QRSettings;
}

export interface GeneratedCertificate {
  name: string;
  dataUrl: string;
  qrDataUrl?: string;
}

export const FONT_OPTIONS = [
  { value: 'Georgia, serif', label: 'Georgia (Classic)' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Space Grotesk, sans-serif', label: 'Space Grotesk' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Brush Script MT, cursive', label: 'Brush Script' },
] as const;

export const DATE_FORMAT_OPTIONS = [
  { value: 'full', label: 'January 8, 2026' },
  { value: 'short', label: '01/08/2026' },
  { value: 'iso', label: '2026-01-08' },
  { value: 'long', label: '8th January 2026' },
] as const;
