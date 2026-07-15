# Gestionale P.IVA — Niccolò Busato

Gestionale personale per Partita IVA in regime forfettario: clienti, preventivi, progetti, fatture, scadenzario e previsione tasse. Un solo file HTML, nessun backend, dati salvati nel browser (localStorage). Funziona su computer e telefono, installabile come app (PWA), con tema chiaro/scuro.

## Struttura della cartella

```
gestionale-piva/
├── index.html            ← l'app completa (HTML + CSS + JS)
├── manifest.json         ← rende l'app installabile (PWA)
├── sw.js                 ← service worker: fa funzionare l'app anche offline
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── README.md
```

---

## Pubblicare su GitHub Pages (per averlo sempre online, anche da telefono)

### 1. Crea il repository

1. Vai su [github.com](https://github.com) e accedi (o crea un account gratuito).
2. Clicca **+** in alto a destra → **New repository**.
3. Nome: `gestionale-piva` (o quello che preferisci).
4. Visibilità: **Public** (necessario per GitHub Pages gratuito — vedi nota privacy sotto).
5. Clicca **Create repository**.

### 2. Carica i file (via browser, senza installare niente)

1. Nel repository appena creato, clicca **uploading an existing file** (o `Add file → Upload files`).
2. Trascina dentro **tutto il contenuto** di questa cartella: `index.html`, `manifest.json`, `sw.js`, `README.md` e la cartella `icons` (trascina la cartella intera: GitHub mantiene la struttura).
3. Clicca **Commit changes**.

> In alternativa, da terminale:
> ```bash
> cd gestionale-piva
> git init
> git add .
> git commit -m "Primo caricamento gestionale"
> git branch -M main
> git remote add origin https://github.com/TUO-USERNAME/gestionale-piva.git
> git push -u origin main
> ```

### 3. Attiva GitHub Pages

1. Nel repository: **Settings** → **Pages** (menu a sinistra).
2. Sotto "Build and deployment" → Source: **Deploy from a branch**.
3. Branch: **main**, cartella **/ (root)** → **Save**.
4. Dopo 1-2 minuti il sito è online su:
   **`https://TUO-USERNAME.github.io/gestionale-piva/`**

### 4. Aggiungilo alla home del telefono (come una vera app)

**iPhone (Safari):** apri l'URL → tasto **Condividi** (quadrato con freccia) → **Aggiungi a Home**. Avrai l'icona NB arancione e l'app si apre a schermo intero, anche offline.

**Android (Chrome):** apri l'URL → menu **⋮** → **Aggiungi a schermata Home** (o banner "Installa app").

---

## Cose importanti da sapere

### 🔒 Privacy
- **I tuoi dati NON vengono caricati su GitHub.** Clienti, preventivi e fatture vivono solo nel localStorage del browser che usi. Su GitHub c'è solo il "guscio" dell'app.
- Però: il file `index.html` contiene i **dati di esempio precaricati** (ACCA, OM Consulting, Donne che parlano di soldi con importo 1.095€). Con repository pubblico chiunque può vederli nel codice. Se ti dà fastidio, dimmelo e li rimuovo lasciando l'app vuota al primo avvio.

### 📱 Sincronizzazione tra dispositivi
- localStorage è **per dispositivo**: il telefono e il computer hanno ciascuno i propri dati.
- Per passare i dati da uno all'altro: **Esporta** (icona freccia giù, scarica un JSON) → mandatelo (AirDrop, mail, Drive) → **Importa** sull'altro dispositivo.
- Buona abitudine: esporta un backup JSON una volta a settimana. Se pulisci i dati di navigazione del browser, il localStorage si cancella.

### 🔄 Aggiornare l'app
Quando ti consegno una nuova versione di `index.html`: nel repository apri il file → icona matita (o `Add file → Upload files` sovrascrivendo) → commit. Dopo 1-2 minuti l'URL serve la versione nuova. I dati non si toccano: stanno nel browser, non nel file.

### 🖱️ Uso
- **Desktop:** trascina le card tra le colonne kanban (drag & drop).
- **Telefono:** usa le frecce **‹ ›** su ogni card per cambiare stato (il drag & drop classico non esiste su touch — nessuna funzione persa).
- **Tema:** pulsante ◐ in alto per chiaro/scuro (segue di default le impostazioni di sistema).

### ⚠️ Tasse
La stima "da accantonare" (≈23,22% di ogni incasso: coefficiente 78%, imposta sostitutiva 5%, INPS ~26%) è indicativa per pianificare i versamenti, non un calcolo ufficiale: conferma aliquote e INPS con il commercialista.
