import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { CertificateConfig, GeneratedCertificate } from '@/types/certificate';

export function formatDate(date: Date, format: string): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const getDaySuffix = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  switch (format) {
    case 'full':
      return `${months[month]} ${day}, ${year}`;
    case 'short':
      return `${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
    case 'iso':
      return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    case 'long':
      return `${day}${getDaySuffix(day)} ${months[month]} ${year}`;
    default:
      return `${months[month]} ${day}, ${year}`;
  }
}

export async function generateQRCode(data: string, size: number): Promise<string> {
  return QRCode.toDataURL(data, {
    width: size,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
}

export async function generateCertificate(
  config: CertificateConfig,
  name: string,
  index: number
): Promise<GeneratedCertificate> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx || !config.templateImage) {
      reject(new Error('Canvas context or template not available'));
      return;
    }
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw template
      ctx.drawImage(img, 0, 0);
      
      // Draw name
      ctx.fillStyle = config.nameSettings.color;
      ctx.font = `${config.nameSettings.fontSize}px ${config.nameSettings.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, config.nameSettings.x, config.nameSettings.y);
      
      // Draw date if enabled
      if (config.dateSettings.enabled) {
        const dateStr = formatDate(new Date(), config.dateSettings.format);
        ctx.fillStyle = config.dateSettings.color;
        ctx.font = `${config.dateSettings.fontSize}px ${config.dateSettings.fontFamily}`;
        ctx.fillText(dateStr, config.dateSettings.x, config.dateSettings.y);
      }
      
      // Generate and draw QR code if enabled
      let qrDataUrl: string | undefined;
      if (config.qrSettings.enabled) {
        const qrData = `CERT-${Date.now()}-${index}-${name.replace(/\s/g, '-').toUpperCase()}`;
        qrDataUrl = await generateQRCode(qrData, config.qrSettings.size);
        
        const qrImg = new Image();
        qrImg.onload = () => {
          ctx.drawImage(
            qrImg,
            config.qrSettings.x - config.qrSettings.size / 2,
            config.qrSettings.y - config.qrSettings.size / 2,
            config.qrSettings.size,
            config.qrSettings.size
          );
          
          resolve({
            name,
            dataUrl: canvas.toDataURL('image/png'),
            qrDataUrl,
          });
        };
        qrImg.src = qrDataUrl;
      } else {
        resolve({
          name,
          dataUrl: canvas.toDataURL('image/png'),
        });
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load template image'));
    img.src = config.templateImage;
  });
}

export async function downloadCertificates(certificates: GeneratedCertificate[]): Promise<void> {
  if (certificates.length === 1) {
    // Single certificate - direct download
    const link = document.createElement('a');
    link.download = `certificate-${certificates[0].name.replace(/\s/g, '-')}.png`;
    link.href = certificates[0].dataUrl;
    link.click();
    return;
  }
  
  // Multiple certificates - create zip
  const zip = new JSZip();
  
  certificates.forEach((cert, index) => {
    const base64Data = cert.dataUrl.split(',')[1];
    const fileName = `certificate-${String(index + 1).padStart(3, '0')}-${cert.name.replace(/\s/g, '-')}.png`;
    zip.file(fileName, base64Data, { base64: true });
  });
  
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `certificates-${Date.now()}.zip`);
}

export function parseNamesFile(content: string): string[] {
  return content
    .split(/[\n,;]+/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}
