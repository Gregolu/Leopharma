import { Injectable, inject } from '@angular/core';
import { PatientStateService } from './patient-state.service';
import { QUESTIONNAIRES } from './questionnaire-data';
// @ts-ignore
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  patientStateService = inject(PatientStateService);

  private getKeyword(text: string): string {
    if (!text) return text;
    let s = text.toLowerCase();
    s = s.replace(/^(avez-vous|au cours des|quelle est|quel est|comment|dans quelle mesure|diriez-vous que|êtes-vous) (des|de la|du|les|votre|vos|d\'|l\'|à)? /i, '');
    s = s.replace(/\?$/, '');
    s = s.replace(/^avez-vous déjà eu /, 'Antécédents de ');
    s = s.replace(/^ressentez-vous /, 'Sensation de ');
    s = s.charAt(0).toUpperCase() + s.slice(1);
    if (s.length > 55) {
      s = s.substring(0, 52) + '...';
    }
    return s;
  }

  private getIcon(key: string): string {
    const icons: Record<string, string> = {
      'photo': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
      'scan': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 3h4M20 3h-4M4 21h4M20 21h-4M4 8v8M20 8v8M9 8v8M15 8v8"></path></svg>',
      'anamnese': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
      'exposition': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      'symptomes': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
      'impact': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path><path d="M14 4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v4"></path><path d="M10 4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6"></path><path d="M6 8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10a6 6 0 0 0 12 0v-5a2 2 0 0 0-2-2h-2"></path></svg>',
      'qvt': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
      'stigmatisation': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      'traitement': '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.5 20.5l-6-6a4.5 4.5 0 1 1 6.36-6.36l6 6a4.5 4.5 0 1 1-6.36 6.36z"></path><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"></line></svg>'
    };
    return icons[key] || icons['symptomes'];
  }

  generatePdf() {
    const state = this.patientStateService.stateSubject.getValue();
    const dateStr = new Date().toLocaleDateString('fr-FR');
    
    // Calculate if they have answers
    const categories = [
      { key: 'photo', title: 'Analyse par photo' },
      { key: 'scan', title: 'Scan Produit' },
      { key: 'anamnese', title: 'Anamnèse et histoire' },
      { key: 'exposition', title: 'Facteurs aggravants' },
      { key: 'symptomes', title: 'Symptômes actuels' },
      { key: 'impact', title: 'Impact fonctionnel' },
      { key: 'qvt', title: 'Qualité de vie émotionnelle' },
      { key: 'stigmatisation', title: 'Stigmatisation' },
      { key: 'traitement', title: 'Traitement et prise en charge' }
    ];

    let categoriesHTML = '';

    categories.forEach(cat => {
      const instances = state.questionnaires[cat.key] || [];
      const latest = instances.length > 0 ? instances[0] : null;

      if (latest && latest.answers && Object.keys(latest.answers).length > 0) {
        const definition = (QUESTIONNAIRES as any)[cat.key] || [];
        const answeredIds = Object.keys(latest.answers)
            .map(id => Number(id))
            .filter(id => {
                const val = latest.answers[id];
                return val !== null && val !== undefined && val !== '';
            });

        if (answeredIds.length > 0) {
            let rowsHtml = '';
            
            answeredIds.forEach(id => {
                let qDefText = '';
                
                // Specific search for nested questions format if necessary
                if (Array.isArray(definition)) {
                    const qDef = definition.find((d: any) => d.id === id);
                    if (qDef) qDefText = qDef.text;
                } else if (definition.groups) {
                    for (const g of definition.groups) {
                        const qDef = g.questions.find((d:any) => d.id === id);
                        if (qDef) { qDefText = qDef.text; break; }
                    }
                }

                if (!qDefText) {
                    qDefText = 'Question ' + id; 
                }

                const keyword = this.getKeyword(qDefText);

                const ans = latest.answers[id];
                let textAns = '';
                if (ans === true) textAns = 'Oui';
                else if (ans === false) textAns = 'Non';
                else if (Array.isArray(ans)) textAns = ans.join(', ');
                else textAns = String(ans);

                rowsHtml += `
                <div style="display: flex; align-items: baseline; padding: 6px 0; font-size: 13px; page-break-inside: avoid; line-height: 1.4;">
                  <div style="color: #64748b; font-weight: 500;">${keyword}</div>
                  <div style="flex: 1; margin: 0 12px;"></div>
                  <div style="color: #1e293b; font-weight: 700;">${textAns}</div>
                </div>`;
            });

            const iconSvg = this.getIcon(cat.key);

            categoriesHTML += `
            <div style="margin-bottom: 36px; page-break-inside: avoid; font-family: 'Rethink Sans', sans-serif;">
              
              <!-- Black Banner Header -->
              <div style="display: flex; align-items: center; background: #111111; color: white; padding: 8px 16px; border-radius: 6px; margin-bottom: 12px; width: 100%; box-sizing: border-box;">
                 <div style="margin-right: 12px; display: flex; align-items: center; color: white;">${iconSvg}</div>
                 <h2 style="margin: 0; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">${cat.title}</h2>
              </div>
              
              <!-- Question items (clean bubbles) -->
              <div style="padding-left: 0;">
                ${rowsHtml}
              </div>
            </div>`;
        }
      }
    });

    if(!categoriesHTML) {
      categoriesHTML = '<p style="color:#718096; font-size: 14px; font-family:sans-serif; text-align: center; padding: 40px 0; background: white; border-radius: 12px; border: 1px dashed #e2e8f0;">Aucun questionnaire n\'a encore été complété.</p>';
    }

    // Predisposition Color & Percentage
    let preScore = state.predispositionScore || Math.floor(Math.random() * 100);
    let preGaugeFill = (preScore / 100) * 100;

    // Eczema Score for Circular Gauge
    let eczScore = state.eczemaScore || Math.floor(Math.random() * 100);
    // Inverse proportion for dashoffset (339.29 = full circle)
    let circDashOffset = 339.29 - (339.29 * (eczScore / 100));

        const patientProfile = {
      nom: 'Dupont',
      prenom: 'Jean',
      sexe: 'Homme',
      age: '35 ans (12/04/1989)',
      email: 'jean.dupont@email.com'
    };

    let htmlTemplate = `
    <div id="pdf-content" style="width: 800px; margin: 0 auto; background: #ffffff; color: #1e293b; font-family: 'Rethink Sans', sans-serif; position: relative;">
      
      <!-- HEADER Fin et élégant -->
      <div style="background-color: #00af6c; color: white; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 15px;">
           <img src="https://manuderm.fr/wp-content/uploads/2021/04/Logo-Manuderm-Blanc.png" alt="Manuderm Logo" style="height: 30px; width: auto;" onerror="this.onerror=null; this.src='https://via.placeholder.com/120x30/2c5e53/ffffff?text=MANUDERM'" />
           <div style="border-left: 1px solid rgba(255,255,255,0.3); height: 30px; margin: 0 5px;"></div>
           <h1 style="margin: 0; font-size: 20px; font-weight: 400; letter-spacing: 0.5px;">Dossier Patient</h1>
        </div>
        <div style="text-align: right; font-size: 12px; opacity: 0.9; line-height: 1.4;">
          <strong>${dateStr}</strong><br/>
          Réf : ${Math.floor(Math.random()*100000) + 10000}
        </div>
      </div>

      <div style="padding: 30px 40px;">

        <!-- PROFIL ET SCORES EN 3 COLONNES -->
        <div style="display: flex; gap: 24px; margin-bottom: 40px; align-items: stretch;">
          
          <!-- COLONNE GAUCHE: AVATAR -->
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 110px; flex-shrink: 0;">
             <div style="width: 80px; height: 80px; border-radius: 50%; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid #edf2f7;">
                <svg width="40" height="40" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             </div>
             <div style="margin-top: 10px; font-size: 11px; color: #a0aec0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Patient</div>
          </div>

          <!-- COLONNE CENTRALE: PROFIL PATIENT -->
          <div style="flex: 1.5; display: flex; flex-direction: column;">
            <div style="background: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 20px; height: 100%; box-sizing: border-box;">
              <h2 style="font-size: 12px; color: #a0aec0; margin-top: 0; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Informations</h2>
              <div style="display: grid; grid-template-columns: 80px 1fr; gap: 10px 8px; font-size: 13px;">
                <div style="color: #94a3b8; font-weight: 500;">Nom</div><div style="font-weight: 600; color: #1e293b;">${patientProfile.nom}</div>
                <div style="color: #94a3b8; font-weight: 500;">Prénom</div><div style="font-weight: 600; color: #1e293b;">${patientProfile.prenom}</div>
                <div style="color: #94a3b8; font-weight: 500;">Sexe</div><div style="font-weight: 600; color: #1e293b;">${patientProfile.sexe}</div>
                <div style="color: #94a3b8; font-weight: 500;">Âge</div><div style="font-weight: 600; color: #1e293b;">${patientProfile.age}</div>
                <div style="color: #94a3b8; font-weight: 500;">Email</div><div style="font-weight: 600; color: #1e293b; word-break: break-all;">${patientProfile.email}</div>
              </div>
            </div>
          </div>

          <!-- COLONNE DROITE: SCORES -->
          <div style="flex: 2; display: flex; flex-direction: column;">
             <div style="background: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 20px; height: 100%; box-sizing: border-box;">
                <h2 style="font-size: 14px; color: #1e293b; margin-top: 0; margin-bottom: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Scores cliniques</h2>
                
                <div style="display: flex; flex-direction: column; gap: 30px;">
                  
                  <!-- Predisposition Match Dashboard Slider -->
                  <div>
                    <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 15px;">
                        <span style="font-size: 15px; font-weight: 700; color: #1e293b;">Prédisposition</span>
                        <span style="font-size: 20px; font-weight: 800; color: #1e293b;">${preGaugeFill}%</span>
                    </div>
                    
                    <div style="background: #EAEAEA; display: flex; height: 12px; border-radius: 6px; position: relative; margin-bottom: 8px;">
                      <div style="flex: 1; background: #68D391; border-top-left-radius: 6px; border-bottom-left-radius: 6px;"></div>
                      <div style="flex: 1; background: #F6AD55;"></div>
                      <div style="flex: 1; background: #FC8181; border-top-right-radius: 6px; border-bottom-right-radius: 6px;"></div>
                      
                      <div style="width: 24px; height: 24px; background: white; border: 4px solid; border-color: ${preGaugeFill > 66 ? '#E53E3E' : (preGaugeFill > 33 ? '#DD6B20' : '#68D391')}; border-radius: 50%; position: absolute; top: -6px; left: ${preGaugeFill}%; transform: translateX(-50%); box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; font-size: 10px; text-transform: uppercase; font-weight: 700;">
                      <span style="flex:1; text-align: left; color:#68D391;">Faible</span>
                      <span style="flex:1; text-align: center; color:#DD6B20;">Possible</span>
                      <span style="flex:1; text-align: right; color:#E53E3E;">Forte</span>
                    </div>
                  </div>

                  <!-- Divider limit -->
                  <div style="width: 100%; height: 1px; background: #f1f5f9;"></div>

                  <!-- Severity Circle Match Dashboard -->
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                     <div style="flex: 1;">
                       <div style="font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Sévérité</div>
                       <div style="font-size: 11px; color: #64748b;">Évaluation de la crise</div>
                     </div>
                     
                     <div style="position: relative; width: 70px; height: 70px;">
                        <svg viewBox="0 0 36 36" style="display: block; width: 100%; height: 100%;">
                          <path style="fill: none; stroke: #FFE8E8; stroke-width: 3.5;"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path style="fill: none; stroke: ${eczScore > 66 ? '#E53E3E' : (eczScore > 33 ? '#DD6B20' : '#00af6c')}; stroke-width: 3.5; stroke-linecap: round;"
                            stroke-dasharray="${eczScore}, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 16px; font-weight: 800; color: #1e293b;">
                          ${eczScore}
                        </div>
                     </div>
                  </div>

                </div>
             </div>
          </div>
        </div>

        <h2 style="font-size: 14px; color: #1e293b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid #edf2f7; display: flex; align-items: center; gap: 10px;">
           <svg width="18" height="18" fill="none" stroke="#00af6c" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
           Questionnaires remplis
        </h2>

        ${categoriesHTML}

      </div>
    </div>`;

    const container = document.createElement('div');
    container.innerHTML = htmlTemplate;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    const targetElement = container.firstElementChild as HTMLElement;

    const opt = {
      margin:       [0, 0, 0, 0],
      filename:     'Dossier_Patient_Manuderma.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // @ts-ignore
    html2pdf().set(opt).from(targetElement).save().then(() => {
        document.body.removeChild(container);
    }).catch((err: any) => {
        console.error('PDF Generation Error:', err);
        document.body.removeChild(container);
    });
  }
}
