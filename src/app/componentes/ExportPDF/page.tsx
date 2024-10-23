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

export default function SobrePage() {
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
        QRCode.toDataURL(`${(window.location.origin)}/vagas/${vaga.id}`)
      ));
      setQrCodes(codes);
    });
  }, []);

  const exportPDF = () => {
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
  
      // Sobre a MSB (ajuste a posição conforme necessário)
        
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
  
      pdf.save("MSB_Vagas.pdf");
    };

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-500">
      <h1 className="text-3xl font-bold mb-4 text-white">Vagas MSB</h1>
      <button 
        onClick={exportPDF} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Exportar Vagas como PDF
      </button>
    </div>
  );
}


//${encodeURIComponent