import { jsPDF } from 'jspdf';
import type { AgeGroup } from '../types';
import { APTITUDE_DETAILS } from '../data/aptitudes';
import type { RankedAptitude } from '../hooks/useSurvey';

const AGE_LABELS: Record<AgeGroup, string> = {
  elementary: 'Elementary Students',
  jrHigh: 'Middle Schoolers',
  highSchool: 'High Schoolers'
};

export function generatePDF(
  name: string,
  ageGroup: AgeGroup,
  ranked: RankedAptitude[]
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Paths', pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Aptitude Profile Report', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Student info
  doc.setDrawColor(200);
  doc.line(20, y, pageWidth - 20, y);
  y += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student: ${name}`, 20, y);
  y += 7;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Age Group: ${AGE_LABELS[ageGroup]}`, 20, y);
  y += 5;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
  y += 10;

  // Score breakdown bar chart
  doc.setDrawColor(200);
  doc.line(20, y, pageWidth - 20, y);
  y += 8;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Score Breakdown', 20, y);
  y += 8;

  const maxScore = Math.max(...ranked.map(r => r.score), 1);
  const barMaxWidth = 100;

  for (const { aptitude, score } of ranked) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(aptitude, 20, y + 4);
    const barWidth = (score / maxScore) * barMaxWidth;
    doc.setFillColor(99, 102, 241);
    doc.rect(55, y - 1, barWidth, 6, 'F');
    doc.setFontSize(9);
    doc.text(String(score), 55 + barWidth + 3, y + 4);
    y += 10;
  }
  y += 5;

  // Primary aptitude
  const primary = ranked[0];
  const primaryInfo = APTITUDE_DETAILS[primary.aptitude];
  doc.setDrawColor(200);
  doc.line(20, y, pageWidth - 20, y);
  y += 8;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241);
  doc.text(`Primary: ${primaryInfo.name}`, 20, y);
  doc.setTextColor(0);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(primaryInfo.description, pageWidth - 40);
  doc.text(descLines, 20, y);
  y += descLines.length * 5 + 4;

  doc.setFont('helvetica', 'bold');
  doc.text('Strengths: ', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(primaryInfo.strengths.join(', '), 20 + doc.getTextWidth('Strengths: '), y);
  y += 8;

  // Action plan
  const plan = primaryInfo.nextSteps[ageGroup];

  const printSection = (title: string, items: string[]) => {
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, 20, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    items.forEach((item) => {
      if (y > 275) { doc.addPage(); y = 20; }
      const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 45);
      doc.text(lines, 25, y);
      y += lines.length * 4.5 + 2;
    });
    y += 3;
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Action Plan for ${AGE_LABELS[ageGroup]}:`, 20, y);
  y += 8;

  printSection('Books to Read', plan.books.map(b => `${b.title} — ${b.why}`));
  printSection('People to Look Up', plan.people.map(p => `${p.name} — ${p.why}`));
  printSection('Activities to Try', plan.activities);
  printSection('Interests to Explore', plan.interests);
  y += 2;

  // Career paths
  doc.setFont('helvetica', 'bold');
  doc.text('Career Paths:', 20, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  primaryInfo.careers.forEach(career => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${career.title}`, 25, y);
    y += 5;
    career.courses.forEach(course => {
      doc.setFontSize(8);
      doc.text(`  ${course.name} — ${course.concept}`, 30, y);
      y += 4;
    });
    doc.setFontSize(10);
    y += 2;
  });

  // Secondary aptitude (if exists and has score > 0)
  if (ranked.length > 1 && ranked[1].score > 0) {
    if (y > 240) { doc.addPage(); y = 20; }
    const secondary = ranked[1];
    const secInfo = APTITUDE_DETAILS[secondary.aptitude];
    y += 4;
    doc.setDrawColor(200);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(107, 114, 128);
    doc.text(`Secondary: ${secInfo.name}`, 20, y);
    doc.setTextColor(0);
    y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const secDesc = doc.splitTextToSize(secInfo.description, pageWidth - 40);
    doc.text(secDesc, 20, y);
    y += secDesc.length * 5 + 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths: ', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(secInfo.strengths.join(', '), 20 + doc.getTextWidth('Strengths: '), y);
  }

  doc.save(`${name}-Student-Paths-Report.pdf`);
}
