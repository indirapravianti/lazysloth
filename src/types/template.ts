// Core template types for the Template-based Mass Asset Generator

export type TemplateType = 'certificate' | 'business_card' | 'lanyard' | 'badge' | 'custom';

export type FieldType = 'text' | 'image' | 'qr' | 'barcode' | 'date' | 'signature';

export interface FieldStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  bold?: boolean;
  italic?: boolean;
}

export interface FieldPosition {
  x: number;
  y: number;
}

export interface TemplateField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  position: FieldPosition;
  style: FieldStyle;
  size?: { width: number; height: number };
  linkedTo?: string; // For QR codes linked to verification ID
  defaultValue?: string;
}

export interface TemplateCanvas {
  width: number;
  height: number;
}

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  description?: string;
  canvas: TemplateCanvas;
  backgroundImage: string | null;
  fields: TemplateField[];
  createdAt: string;
  updatedAt: string;
}

export interface DatasetEntry {
  [fieldId: string]: string;
}

export interface Dataset {
  id: string;
  name: string;
  templateId: string;
  entries: DatasetEntry[];
  createdAt: string;
}

export interface GeneratedAsset {
  id: string;
  templateId: string;
  datasetEntryIndex: number;
  name: string;
  dataUrl: string;
  verificationId?: string;
  qrDataUrl?: string;
  createdAt: string;
}

export interface AssetBatch {
  id: string;
  templateId: string;
  templateName: string;
  assets: GeneratedAsset[];
  createdAt: string;
}

// Preset canvas sizes for different template types
export const TEMPLATE_PRESETS: Record<TemplateType, { canvas: TemplateCanvas; label: string; description: string }> = {
  certificate: {
    canvas: { width: 2480, height: 1754 },
    label: 'Certificate',
    description: 'A4 Landscape (2480 × 1754)',
  },
  business_card: {
    canvas: { width: 1050, height: 600 },
    label: 'Business Card',
    description: 'Standard (3.5" × 2")',
  },
  lanyard: {
    canvas: { width: 638, height: 1013 },
    label: 'Lanyard / ID Card',
    description: 'Portrait (CR80)',
  },
  badge: {
    canvas: { width: 800, height: 800 },
    label: 'Badge',
    description: 'Square (800 × 800)',
  },
  custom: {
    canvas: { width: 1920, height: 1080 },
    label: 'Custom',
    description: 'Set your own dimensions',
  },
};

// Default field templates
export const DEFAULT_FIELD_STYLES: Record<FieldType, Partial<FieldStyle>> = {
  text: {
    fontSize: 48,
    fontFamily: 'Georgia, serif',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    fontFamily: 'Georgia, serif',
    color: '#4a4a4a',
    textAlign: 'center',
  },
  image: {},
  qr: {},
  barcode: {},
  signature: {},
};

export function createDefaultTemplate(type: TemplateType, name: string): Template {
  const preset = TEMPLATE_PRESETS[type];
  const now = new Date().toISOString();
  
  return {
    id: `template_${Date.now()}`,
    name,
    type,
    canvas: { ...preset.canvas },
    backgroundImage: null,
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'text',
        required: true,
        position: { x: preset.canvas.width / 2, y: preset.canvas.height * 0.45 },
        style: { ...DEFAULT_FIELD_STYLES.text },
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}
