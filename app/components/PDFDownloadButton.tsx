'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import type { FinanceData } from '@/app/types/finance';

interface PDFDownloadButtonProps {
  financeData: FinanceData;
}

export default function PDFDownloadButton({ financeData }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    try {
      setIsGenerating(true);
      
      const { pdf } = await import('@react-pdf/renderer');
      const { default: FinanceReport } = await import('./FinanceReport');
      
      const blob = await pdf(<FinanceReport data={financeData} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `finance-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      {isGenerating ? (
        'Generating PDF...'
      ) : (
        <>
          <FiDownload className="w-5 h-5 mr-2" />
          Download Report
        </>
      )}
    </button>
  );
} 