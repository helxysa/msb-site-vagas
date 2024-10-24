'use client'

import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import QRCode from 'qrcode';

interface VagaPreview {
  id: string;
  titulo: string;
  area: string;
  descricao: string;
}

async function getVagas(): Promise<VagaPreview[]> {
  const vagasRef = collection(db, 'vagas');
  const vagasSnapshot = await getDocs(vagasRef);
  return vagasSnapshot.docs.map(doc => ({
    id: doc.id,
    titulo: doc.data().titulo,
    area: doc.data().area,
    descricao: doc.data().descricao,
  }));
}

export default function ExportPDF() {
  const [logoBase64, setLogoBase64] = useState('');
  const [vagas, setVagas] = useState<VagaPreview[]>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  useEffect(() => {
    fetch('/images/logo-msb.png')
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result as string);
        reader.readAsDataURL(blob);
      });

    getVagas().then(async fetchedVagas => {
      setVagas(fetchedVagas);
      const codes = await Promise.all(fetchedVagas.map(vaga => 
        QRCode.toDataURL(`${window.location.origin}/vagas/${vaga.id}`)
      ));
      setQrCodes(codes);
    });
  }, []);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const exportPDF = () => {
    try {
      const pdf = new jsPDF();

      // Cabeçalho
      pdf.setFillColor(173, 216, 230);
      pdf.rect(0, 0, 210, 50, 'F');
      pdf.setFillColor(154, 205, 50);
      pdf.triangle(170, 0, 210, 0, 210, 50, 'F');

      // Logo MSB
      if (logoBase64) {
        pdf.addImage(logoBase64, 'PNG', 10, 10, 50, 25);
      } else {
        pdf.setTextColor(0, 0, 139);
        pdf.setFontSize(28);
        pdf.text("MSB", 10, 25);
        pdf.setFontSize(14);
        pdf.text("TECNOLOGIA", 10, 35);
      }

      // Título principal
      pdf.setTextColor(0, 0, 139);
      pdf.setFontSize(26);
      pdf.text("Trabalhe com a gente", 10, 70);

      pdf.setFontSize(14);
      pdf.setTextColor(80);
      pdf.text("Conheça nossas vagas e participe do processo seletivo", 10, 80);

      // Vagas
      vagas.forEach((vaga, index) => {
        if (index > 0 && index % 3 === 0) {
          pdf.addPage();
        }

        const yPos = 95 + ((index % 3) * 60);
        
        pdf.setFillColor(173, 216, 230);
        pdf.roundedRect(10, yPos - 5, 190, 55, 3, 3, 'F');
        
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 139);
        pdf.text(`${index + 1}. ${vaga.titulo}`, 15, yPos + 5);
        
        pdf.setFontSize(12);
        pdf.setTextColor(80);
        pdf.text(`Objetivo: ${vaga.descricao}`, 15, yPos + 15, { maxWidth: 120 });
        
        pdf.setTextColor(154, 205, 50);
        pdf.text("Acesse o formulário para essa vaga →", 15, yPos + 45);

        // Add QR code
        if (qrCodes[index]) {
          pdf.addImage(qrCodes[index], 'PNG', 165, yPos, 30, 30);
        }
      });

      // Sobre a MSB
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 139);
      pdf.text("Sobre a MSB", 10, 240);
      
      pdf.setFontSize(12);
      pdf.setTextColor(80);
      pdf.text("Fundada em 2010, a MSB é referência em soluções eficientes de tecnologia de informação e comunicação. Nossa equipe é capaz de atender qualquer desafio tecnológico transformador da tecnologia para todos os setores.", 10, 250, { maxWidth: 190 });

      // Rodapé
      pdf.setFillColor(173, 216, 230);
      pdf.rect(0, 277, 210, 20, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 139);
      pdf.text("www.msbtec.com.br", 10, 290);
      pdf.setFontSize(10);
      pdf.text("Entre em contato para saber mais: 11 5188 3430", 110, 290, { align: 'right' });

     
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <button 
        onClick={exportPDF} 
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Exportar PDF
      </button>
    </div>
  );
}