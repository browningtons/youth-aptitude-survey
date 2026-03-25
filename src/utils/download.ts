import html2canvas from 'html2canvas';
import type { Theme } from '../types';

const BG_COLORS: Record<Theme, string> = {
  neon: '#0f172a',
  glass: '#eef2ff',
  minimal: '#ffffff',
  sunset: '#fffbeb',
  forest: '#0c0a09'
};

export async function handleDownload(
  name: string,
  themeKey: Theme,
  setIsDownloading: (v: boolean) => void
) {
  setIsDownloading(true);
  try {
    const element = document.getElementById('capture-area');
    const buttons = document.getElementById('action-buttons');
    if (!element || !buttons) return;

    const originalDisplay = buttons.style.display;
    buttons.style.display = 'none';

    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: BG_COLORS[themeKey]
    });

    buttons.style.display = originalDisplay;

    const image = canvas.toDataURL('image/jpeg', 0.9);
    const link = document.createElement('a');
    link.href = image;
    link.download = `${name || 'Student'}-Aptitude-Profile.jpg`;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    const buttons = document.getElementById('action-buttons');
    if (buttons) buttons.style.display = '';
  } finally {
    setIsDownloading(false);
  }
}
