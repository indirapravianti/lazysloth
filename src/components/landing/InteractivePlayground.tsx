import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Download, RefreshCw, Sparkles, Type, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import certificateTemplate from '@/assets/certificate.png';
import idCardTemplate from '@/assets/id_card.png';

const templates = [
  {
    id: 'certificate',
    name: 'Certificate',
    image: certificateTemplate,
    aspectRatio: 1.414, // A4 landscape-ish
  },
  {
    id: 'id_card',
    name: 'ID Card',
    image: idCardTemplate,
    aspectRatio: 0.63, // portrait card
  },
];

export function InteractivePlayground() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [name, setName] = useState('Jane Doe');
  const [userImage, setUserImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Set canvas size based on template
      const maxWidth = 500;
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      // Draw template background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (selectedTemplate.id === 'certificate') {
        // Certificate: draw recipient name centered at the line area
        ctx.fillStyle = '#1a365d';
        ctx.font = 'bold 28px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name || 'Jane Doe', canvas.width / 2, canvas.height * 0.52);
      } else if (selectedTemplate.id === 'id_card') {
        // ID Card: draw name at the line area (bottom portion)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name || 'Jane Doe', canvas.width / 2, canvas.height * 0.79);

        // Draw user image inside the circle frame
        if (userImage) {
          const userImg = new Image();
          userImg.crossOrigin = 'anonymous';
          userImg.onload = () => {
            // Circle position - centered, slightly above middle
            const circleX = canvas.width / 2;
            const circleY = canvas.height * 0.42;
            const circleRadius = canvas.width * 0.185;

            // Save context and create circular clip
            ctx.save();
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Draw the image centered in the circle
            const size = circleRadius * 2;
            ctx.drawImage(
              userImg,
              circleX - circleRadius,
              circleY - circleRadius,
              size,
              size
            );

            ctx.restore();
          };
          userImg.src = userImage;
        }
      }
    };
    img.src = selectedTemplate.image;
  };

  useEffect(() => {
    drawCanvas();
  }, [selectedTemplate, name, userImage]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Need to redraw and wait for completion before download
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-${selectedTemplate.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, 100);
  };

  const handleReset = () => {
    setName('Jane Doe');
    setUserImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-quirky-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full border-2 border-foreground font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Try it now — no signup needed!
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            Interactive Playground
          </h3>
          <p className="text-muted-foreground">
            See how easy it is. Pick a template, customize, and download.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Template selector */}
            <div className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-quirky">
              <Label className="text-sm font-bold mb-3 block">Choose Template</Label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTemplate(t);
                      if (t.id === 'certificate') {
                        setUserImage(null);
                      }
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedTemplate.id === t.id
                        ? 'border-foreground shadow-quirky-sm bg-muted'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    <div className="w-full h-16 rounded-lg mb-2 border overflow-hidden">
                      <img 
                        src={t.image} 
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text inputs */}
            <div className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-quirky space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-4 h-4" />
                <Label className="text-sm font-bold">Customize</Label>
              </div>
              
              <div>
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  {selectedTemplate.id === 'certificate' ? 'Recipient Name' : "Person's Name"}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name..."
                  className="mt-1"
                />
              </div>

              {selectedTemplate.id === 'id_card' && (
                <div>
                  <Label htmlFor="photo" className="text-xs text-muted-foreground">Profile Photo</Label>
                  <div className="mt-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-4 h-4" />
                      {userImage ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                    {userImage && (
                      <div className="mt-2 flex items-center gap-2">
                        <img 
                          src={userImage} 
                          alt="Preview" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-foreground"
                        />
                        <span className="text-xs text-muted-foreground">Photo uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
              <Button onClick={handleDownload} className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="order-1 lg:order-2">
            <div className="bg-card border-2 border-foreground rounded-2xl p-4 shadow-quirky-lg">
              <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              ↑ This is a real preview — download it!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
