import { useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';
import type { ThemeStyles } from '../types';
import { useI18n } from '../i18n';

interface Props {
  t: ThemeStyles;
  url: string;
  onClose: () => void;
}

export default function QRModal({ t, url, onClose }: Props) {
  const { t: tr } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="QR Code"
      onClick={onClose}
    >
      <div
        className={`relative max-w-sm w-full p-8 text-center ${t.card}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full opacity-60 hover:opacity-100 transition-opacity ${t.iconColor}`}
          aria-label="Close QR code"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className={`text-lg font-bold mb-6 ${t.accentText}`}>{tr('results.scanToShare')}</h3>

        <div className="bg-white p-4 rounded-2xl inline-block mx-auto mb-4">
          <QRCodeSVG value={url} size={220} level="M" />
        </div>

        <p className="text-sm opacity-60 mt-2">
          {tr('results.scanCaption')}
        </p>
      </div>
    </div>
  );
}
