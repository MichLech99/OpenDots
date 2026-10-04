# OpenDots su Railway, anche da iPhone

Configurazione preparata; pubblicazione e servizi AI non ancora attivati.

1. Crea un fork di CopilotKit/OpenDots nel tuo account GitHub e includi i file di questa configurazione (`railway.json` e `Dockerfile.railway`).
2. In Railway crea un progetto dal tuo repository GitHub. La configurazione usa il container dell’app, senza avviare il servizio browser opzionale.
3. Aggiungi un volume persistente montato su `/data`. Mantieni una sola replica dell’app per il database SQLite.
4. Nelle variabili del servizio imposta `HOST=0.0.0.0`, `DATABASE_PATH=/data/opendots.sqlite`, `OWNER_ID=opendots-owner` e `OWNER_TOKEN` a un segreto casuale di almeno 24 caratteri. Conserva il token: serve per accedere all’app. Se il volume non è scrivibile dall’utente `node`, correggi i permessi prima dell’avvio.
5. Genera il dominio HTTPS del servizio e imposta `APP_ORIGIN` al suo indirizzo esatto, senza slash finale (ad esempio `https://nome.up.railway.app`). Railway assegna `PORT` automaticamente.
6. Per la chat aggiungi `INTELLIGENCE_API_KEY` dal tuo progetto CopilotKit Intelligence, `OPENAI_API_KEY` e `OPENAI_MODEL` con un modello disponibile al tuo account. Se usi un provider compatibile configura anche `OPENAI_BASE_URL`. Inserisci le chiavi nelle variabili protette di Railway, mai nel repository o in chat.
7. Completa il deploy, apri l’URL in Safari, accedi con il token, crea una pagina e verifica che resti disponibile dopo un riavvio. Poi prova una conversazione reale.

Senza chiavi puoi usare pagine e configurazione dei Dots; la chat mostra lo stato di setup. ChatGPT/Codex e le API del modello hanno credenziali e fatturazione separate. Controlla i prezzi correnti di Railway, CopilotKit e del modello prima di attivarli.

I computer persistenti dei Dots richiedono servizi OpenBot separati: questa configurazione iniziale non li include. Anche voce e Slack richiedono configurazioni aggiuntive. Il volume salva pagine e impostazioni, mentre lo storico chat risiede nel progetto Intelligence: prevedi il backup di entrambi.
