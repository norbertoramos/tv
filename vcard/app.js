let fotoBase64 = null;
let fotoMime   = 'image/jpeg';

function initCard() {
  document.title = `${CARD.nombre} ${CARD.apellido} · ${CARD.empresa}`;
  document.getElementById('card').style.background = CARD.color;
  document.getElementById('cn-name').textContent    = `${CARD.nombre} ${CARD.apellido}`;
  document.getElementById('cn-job').textContent     = CARD.cargo;
  document.getElementById('cn-company').textContent = CARD.empresa;

  if (CARD.foto) {
    document.getElementById('avatar').innerHTML =
      `<img src="${CARD.foto}" alt="${CARD.nombre}">`;
  }
}

function preloadFoto() {
  if (!CARD.foto) return;

  fetch(CARD.foto)
    .then(r => {
      fotoMime = r.headers.get('content-type') || 'image/jpeg';
      return r.blob();
    })
    .then(blob => new Promise(resolve => {
      const fr = new FileReader();
      fr.onload = e => resolve(e.target.result);
      fr.readAsDataURL(blob);
    }))
    .then(dataURL => {
      fotoBase64 = dataURL.split(',')[1];
    })
    .catch(() => { /* foto no disponible — vCard sin imagen */ });
}

function createContactRows() {
  const contactDefs = [
    {
      href: `mailto:${CARD.email}`,
      label: CARD.email,
      d: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
      show: CARD.email
    },
    {
      href: `tel:${CARD.telefono}`,
      label: CARD.telefono,
      d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.33 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      show: CARD.telefono
    },
    {
      href: CARD.web,
      label: CARD.web.replace(/^https?:\/\//, ''),
      d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
      show: CARD.web
    },
    {
      href: `https://${CARD.linkedin}`,
      label: CARD.linkedin,
      d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      show: CARD.linkedin
    },
    {
      href: `tel:${CARD.telefono2}`,
      label: `${CARD.telefono2} (trabajo)`,
      d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.33 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      show: CARD.telefono2
    },
    {
      href: `https://wa.me/${CARD.whatsapp.replace(/\D/g,'')}`,
      label: `${CARD.whatsapp} (WhatsApp)`,
      d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.523 5.857L.057 23.882l6.198-1.625A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z',
      show: CARD.whatsapp
    },
    {
      href: `https://orcid.org/${CARD.orcid}`,
      label: `ORCID: ${CARD.orcid}`,
      d: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 4.5h3v1.5h-3V6.5zm0 3h3v8h-3v-8z',
      show: CARD.orcid
    },
    {
      href: `https://europa.eu/europass/eportfolio/screen/user/${CARD.europass}`,
      label: `Europass: ${CARD.europass}`,
      d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
      show: CARD.europass
    }
  ];

  const container = document.getElementById('contacts');
  contactDefs.forEach(({ href, label, d, show }) => {
    if (!show) return;
    const a = document.createElement('a');
    a.className = 'contact-row';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `<svg viewBox="0 0 24 24"><path d="${d}"/></svg><span>${label}</span>`;
    container.appendChild(a);
  });
}

function generateQRCode() {
  new QRCode(document.getElementById('qr'), {
    text: QR.web || CARD.web,
    width: 62,
    height: 62,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

function buildVCard(ios) {
  const webUrl = CARD.web.startsWith('http') ? CARD.web : 'https://' + CARD.web;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${CARD.apellido};${CARD.nombre};;;`,
    `FN:${CARD.nombre} ${CARD.apellido}`,
    CARD.empresa  ? `ORG:${CARD.empresa}`   : '',
    CARD.cargo    ? `TITLE:${CARD.cargo}`    : '',
    CARD.email    ? (ios
        ? `EMAIL;type=INTERNET;type=WORK;type=pref:${CARD.email}`
        : `EMAIL;TYPE=INTERNET,WORK:${CARD.email}`) : '',
    CARD.telefono ? (ios
        ? `TEL;type=CELL;type=VOICE;type=pref:${CARD.telefono}`
        : `TEL;TYPE=CELL:${CARD.telefono}`) : '',
    CARD.web      ? (ios
        ? `URL;type=pref:${webUrl}`
        : `URL:${webUrl}`) : '',
    CARD.linkedin  ? `X-SOCIALPROFILE;type=linkedin:${CARD.linkedin}` : '',
    CARD.telefono2 ? (ios
        ? `TEL;type=WORK;type=VOICE:${CARD.telefono2}`
        : `TEL;TYPE=WORK,VOICE:${CARD.telefono2}`) : '',
    CARD.whatsapp  ? (ios
        ? `TEL;type=CELL;type=X-WHATSAPP:${CARD.whatsapp}`
        : `TEL;TYPE=CELL,X-WHATSAPP:${CARD.whatsapp}`) : '',
    CARD.orcid     ? `URL;type=ORCID:https://orcid.org/${CARD.orcid}` : '',
    CARD.europass  ? `URL;type=Europass:https://europa.eu/europass/eportfolio/screen/user/${CARD.europass}` : '',
    ...(fotoBase64 ? (() => {
      const type   = fotoMime === 'image/png' ? 'PNG' : 'JPEG';
      const raw    = `PHOTO;ENCODING=b;TYPE=${type}:${fotoBase64}`;
      return [raw.match(/.{1,75}/g).join('\r\n ')];
    })() : []),
    'END:VCARD'
  ];
  return lines.filter(Boolean).join('\r\n');
}

function downloadVCard(ios) {
  const vcard    = buildVCard(ios);
  const isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS) {
    window.location.href = 'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(vcard);
    return;
  }

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;

  if (isAndroid) {
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    a.download = `${CARD.nombre}_${CARD.apellido}${ios ? '_ios' : ''}.vcf`.replace(/\s+/g, '_');
    a.click();
  }

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bindButtons() {
  document.getElementById('download-android').addEventListener('click', () => downloadVCard(false));
  document.getElementById('download-ios').addEventListener('click', () => downloadVCard(true));
}

document.addEventListener('DOMContentLoaded', () => {
  initCard();
  preloadFoto();
  createContactRows();
  generateQRCode();
  bindButtons();
});
