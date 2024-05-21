# **Costruire, Personalizzare, Gestire e Operare i Servizi di Sistema Android**



# **Purtroppo, all'inizio del 2019 Google ha annunciato che Android Things è stato rifocalizzato su sistemi smart TV e smart speaker e che il supporto a lungo termine è giunto alla fine.**

## **Altro**

Windows CE è stato un sistema operativo embedded molto popolare come dimostrano le schermate blu di morte su tutto, dai segnali della metropolitana e del traffico, ai distributori automatici e ai chioschi dei musei. Microsoft ha recentemente introdotto un successore di CE, chiamato Windows 10 per IoT.

Nucleus RTOS, dal rivale di lunga data di Wind River, Mentor Graphics, ha trovato una casa in diversi telefoni Samsung, LG e Motorola. Anche Riot OS, Arm Mbed OS e Green Hills Integrity sono attori di rilievo.

Quasi tutti questi popolari RTOS sono proprietari e a codice chiuso. Tuttavia, esistono RTOS gratuiti e open-source—FreeRTOS, MontaVista e Contiki, per citarne alcuni—ma nessuno di loro ha la storia e il supporto che ha Android.

## **Riassunto**

Puoi trovare molte alternative ad Android. Pochi, tuttavia, hanno la raccolta di funzionalità e il supporto che lo rendono una scelta eccellente per un progetto IoT:

- È gratuito. Prendi quanto o poco vuoi; usalo come preferisci.
- È portabile. Android può essere reso funzionante su praticamente qualsiasi tipo di hardware. Far funzionare qualsiasi sistema operativo su un nuovo dispositivo può essere molto difficile. Android non fa eccezione. Tuttavia, c'è molto codice esistente e una grande comunità con molta esperienza nel portarlo.
- È adattabile. Fornire supporto per nuovi periferici nel framework Android è un compito semplice e diretto. Fare ciò è l'argomento del resto di questo libro.
- La toolchain è buona. Il codice C e C++ di basso livello utilizza strumenti standard potenziati con un sistema di build barocco ma utile. La maggior parte del codice—alto livello e scritto in Java—è supportato da Gradle, un paio di plug-in personalizzati e Android Studio. Tutti questi strumenti sono in costante miglioramento.
- Supporta UI reattive e belle. Android può gestire una varietà di media, sia audio che video. Ha potenti strumenti per l'animazione e supporta layout tridimensionali e input sia touchscreen che D-pad.

**Dentro il sistema operativo Android**



**Perché Android?**

Android è stato costruito per essere piccolo. Ha la scarsità progettata in profondità nel 
suo DNA. È stato creato nei primi anni 2000, un periodo in cui i dispositivi mobili erano 
divisi in categorie come “smartphone” e “feature phone”; quando i cicli di programma/
cancellazione della memoria Flash erano contati a decine di migliaia; e quando 64 megabyte 
erano considerati una quantità notevole di RAM. L’idea al centro di Android - che poiché non 
c’è alcuna memoria di backup a cui scambiare i programmi in esecuzione, quando la memoria 
si esaurisce il sistema operativo non ha altra scelta che terminate i programmi - è l’inevitabile 
eredità della sua fissazione per la parsimonia.

I moderni smartphone hanno tutte le capacità che i laptop avevano in quel periodo. 
Se fosse stato progettato oggi, Android sarebbe probabilmente una cosa molto diversa. 
Sebbene la durata della batteria sia ancora un argomento di grande preoccupazione, un moderno 
sistema operativo mobile potrebbe scambiare la memoria Flash con altrettanta efficacia con cui un 
moderno laptop scambia la sua SSD. Gli sviluppatori Android moderni stanno integrando - e 
persino sostituendo - le semplici e parsimoniose librerie integrate in Android con nuove e potenti 
ma molto più esigenti in termini di risorse librerie come GSON e RxAndroid.

Contestualmente, mentre i telefoni mobili - il target originario del sistema operativo Android - 
stanno superando la sua architettura, sta emergendo una nuova e forse maggiore opportunità: 
l’Internet delle Cose e i dispositivi intelligenti che lo compongono. Così come anche le piccole 
aziende hanno scoperto, intorno all’inizio del secolo, di aver bisogno di una presenza web per 
competere, molte delle stesse aziende stanno ora scoprendo che i loro prodotti necessitano di una 
presenza web per competere. Dai dispositivi medici e sistemi di bordo delle auto, a case, elettrodomestici, 
e persino abbigliamento, tutti i tipi di prodotti vengono integrati con intelligenza incorporata. 
Molti di questi dispositivi hanno notevoli vincoli sul processore che possono supportare. Prezzo, 
design e flessibilità rendono Android una scelta eccellente per alimentare questi tipi di dispositivi.

**Adottare Android**

Ci sono molte ragioni per cui Android potrebbe essere una buona scelta per un nuovo dispositivo 
intelligente.

**Full Stack**

Il sistema operativo Android affronta l'intera gamma di requisiti di prodotto. Dal hardware e il kernel
all'audio stereo e i display su più schermi, Android offre flessibilità e fornisce una ricchezza
di opzioni. Si può pensare ad Android come simile a una distribuzione di GNU/Linux come Mint o
CentOS. Trasforma un dispositivo da un pezzo caldo di silicio a un utile computer con funzionalità
di base.

**Ampia Accettazione**

Forse la ragione più ovvia per scegliere Android per un progetto hardware è che è 
onnipresente. Alcune versioni di Android funzionano subito su quasi ogni chipset comune. In 
effetti, la maggior parte dei venditori di SoC (system on a chip) forniscono kit di riferimento hardware 
con una versione di Android e un kernel Linux di supporto. Almeno altrettanto importante è il 
fatto che molti sviluppatori hanno familiarità con il sistema Android. Costruire un team, dagli esperti 
di applicazioni front-end e UI a quelli con una profonda comprensione di Android necessaria per 
modificare il suo core, non dovrebbe essere un impedimento.

**Interfaccia Utente Bellissima**

Il sistema Android è in grado di produrre interfacce utente mozzafiato, che è forse la sua
caratteristica più importante. Il supporto per la maggior parte dei media audio e video popolari è
integrato e relativamente facile da usare. Offrendo piena illuminazione e ombreggiatura, gli 
strumenti per l'animazione e il display 3D sono di prim'ordine. Basta guardare alcune delle 
applicazioni semplicemente meravigliose come Feedly o Weather View per comprendere le 
quasi illimitate potenzialità della tavolozza di progettazione Android. Quando il framework 
UI esistente di Android non è sufficiente, il sistema supporta sia OpenGL ES sia Vulkan per grafica 3D 
ad alte prestazioni e bassa latenza.

**Basato su Linux**

Il sistema operativo Android si basa sul sistema operativo Linux. Linux è uno dei
sistemi operativi più popolari e ampiamente usati in assoluto. È ovunque. Che un chip sia ARM-
based, Intel-based, o qualcosa di radicale, quasi ogni produttore di chipset fornisce una versione di
Linux che funziona sul loro dispositivo. Si tenga presente, tuttavia, che Android è ufficialmente
disponibile solo per processori basati su ARM e Intel (sia a 32 che a 64 bit). Questo significa che il progetto 
Android Open Source Project (AOSP), il sistema di build, gli strumenti precompilati, i test suite e il 
kit di sviluppo nativo (NDK) disponibile pubblicamente supportano solo queste architetture. 
Questo non significa che Android non possa funzionare su qualche altra architettura, semplicemente che 
le toolchains e i sistemi di build per quelle architetture non sono supportati.

Mentre ottenere semplicemente Linux portato e funzionante su una nuova scheda è un passo 
importante, probabilmente sarà necessario un bel po' di lavoro per rendere tutto l'hardware accessibile 
al software. Frequentemente, poiché il kernel Linux è concesso in licenza con la GNU Public License (GPL), il 
codice personalizzato necessario per supportare un particolare sensore, display o porta sarà già disponibile 
gratuitamente online. Anche se non è così, esiste una grande comunità di sviluppatori 
molto familiari con il sistema.

# **Potente Ambiente di Sviluppo**

Le	toolchain di	Android sono	piuttosto	potenti e	sono in costante miglioramento. Entrambe le toolchain, quella per la costruzione dell'infrastruttura di Android e quella per la creazione di applicazioni Java che girano sopra Android, sono	 in gran parte basate su strumenti standard commerciali. 

Il codice sorgente di Android, l'Android Open Source Project (AOSP), è ben supportato. Creare una build della versione di Android utilizzata in questo libro, API 29, è relativamente semplice su recenti piattaforme OSX e Linux. Il sistema di build con il suo meccanismo basato su directory per personalizzazioni per hardware è originariamente basato su GNU make. Con il rilascio di Nougat, il sistema di build soong ha sostituito make. Soong utilizza due strumenti aggiuntivi, kati e ninja, per rendere la build molto più veloce di quanto non fosse con make. I file make esistenti continuano a funzionare come sono affianco ai nuovi files di build soong.


La maggior parte dello sviluppo per un sistema Android, anche la maggior parte della programmazione a livello di sistema, è fatta in Java. Gli sviluppatori Java di Android utilizzeranno strumenti come Android Studio (una derivazione dell’IDEA IDE di IntelliJ) e Gradle, lo strumento di build standard per le applicazioni Android. Gradle è decisamente sufficiente per costruire, testare e package anche applicazioni di sistema con componenti nativi.


Come menzionato in precedenza, a partire dal 2014, diversi nuovi ambienti di sviluppo interessanti e potenti sono disponibili per l'uso nelle applicazioni Java Android. Sebbene alcuni siano grandi e tutti siano un compromesso in durata della batteria, strumenti come Realm DB, RxAndroid e Retrofit possono migliorare drasticamente l'efficacia di un team di sviluppo.


Uno dei progressi più importanti nello sviluppo di Android è stata l’annuncio di Kotlin come linguaggio supportato di primo livello nel maggio del 2017. Kotlin è un linguaggio chiaro, conciso e potente che si integra perfettamente con il codice Java esistente e anche nativo. Sebbene non sia ancora ampiamente utilizzato all'interno del core di AOSP, può essere utilizzato da applicazioni scritte per una piattaforma Android personalizzata.


# **Open Source**

Costruire un dispositivo embedded implica necessariamente negoziare una mina di questioni legali. Questo libro è tecnico, non legale. Non siamo avvocati e nulla in questo o nei capitoli successivi deve essere interpretato come consiglio legale. Se intendi provare a commercializzare il tuo dispositivo, avrai bisogno dell'aiuto di un avvocato qualificato. Detto questo, alcune generalizzazioni ampie potrebbero aiutare un sviluppatore di dispositivi in erba a comprendere le parti in movimento. La figura 1.1 è un modello ad alto livello della proprietà del codice nel sistema Android.

**Figura 1.1 Proprieta' del Codice Android**

Alla base dello stack c'è il codice hardware proprietario. Di solito è ottenuto dal fornitore dell’hardware, che può licenziarlo a costo zero o, forse, imporre una qualche forma di tariffa. Questo codice spesso non è open source. È essenziale, ma può essere consegnato come binari pre-compilati e possibilmente con severi ingiunzioni legali riguardanti l’ingegneria inversa. È possibile che non vedrai mai il codice sorgente e persino la documentazione potrebbe non essere molto buona. L’interfaccia principale di Android a questo codice è il Livello di Astrazione Hardware (HAL), discusso nei Capitoli 8 e 10.

Nella parte superiore dello stack ci sono le applicazioni. Queste sono come il controller per un sistema di intrattenimento domestico proprietario o le app di Facebook e Twitter. Anche le app possono essere proprietarie e, di nuovo, a meno che non siano app che sviluppi tu stesso, potresti non vedere mai il loro codice sorgente. Se la tua piattaforma necessita di applicazioni specifiche, dovrai stipulare accordi con i loro proprietari o fornire un qualche tipo di servizio (un negozio o un marketplace) dal quale un utente finale può acquisirle.

Tra questi due livelli proprietari si trova il codice base effettivo di Android, il Progetto Open Source Android (AOSP). È completamente open source. Puoi leggerlo, copiarlo, personalizzarlo e usarlo praticamente come preferisci. La quasi totalità del codice è protetta con licenze che ti permettono persino di ridistribuirlo solo come binari pre-compilati, se lo desideri. Puoi prendere quanto ti serve.

Spesso le persone sono confuse riguardo l’apertura del codice base AOSP, perché Google controlla strettamente i contributi. È vero che è improbabile che tu possa contribuire con una modifica al codice base canonico di AOSP come potresti con la maggior parte degli altri progetti open source. Quello che puoi fare, però, è creare un fork del repository di codice pertinente, modificarlo in qualsiasi modo tu scelga e usarlo ovunque tu voglia.

Sebbene il codice AOSP sia veramente open source, non è necessariamente libero da vincoli legali. Molte delle tecnologie integrate in Linux e dei servizi Android basati su di esso sono state oggetto di grandi e piccole battaglie legali. Tra le tecnologie che potresti dover considerare ci sono: Codice dell'Applicazione Proprietaria, Codice Proprietario di Google, AOSP, Codice Hardware Proprietario.

**Componenti e licenze**

Cose come il Wi-Fi, il Bluetooth, i codec multimediali e altre cose più esoteriche (come un sistema Cile!) richiedono delle licenze. Ciò che rende ancora più confusa la situazione è che l'albero AOSP include implementazioni software di alcuni di questi componenti (come codificatori e decodificatori multimediali) come segnaposto. Non vengono forniti con alcun tipo di brevetto o concessione di licenza da parte di Google o dei titolari di proprietà intellettuale (IP). Quando si costruisce un nuovo dispositivo, questi componenti di terze parti devono essere esaminati attentamente per garantire che il dispositivo sia conforme alle licenze specifiche della tecnologia.

Microsoft, in particolare, ha un portafoglio di brevetti che ha utilizzato con successo per ottenere circa 1 miliardo di dollari in commissioni di licenza da vari produttori di dispositivi Android. Il contenuto esatto di questo portafoglio è stato tenuto segreto per molti anni. Tuttavia, nel 2014, il governo cinese ha divulgato i contenuti del portafoglio e ora è facilmente reperibile online.

**AOSP e Google**

Google mantiene il suo controllo sul sistema operativo Android in due modi. Innanzitutto, la maggior parte dei sistemi Android di consumo contiene una piattaforma proprietaria ricca di funzionalità che non fa parte di AOSP. Questa piattaforma include cose come Google Play Services, Google Maps e il Play Store.

In secondo luogo, per installare una di queste servizi proprietari o anche solo per etichettare il sistema come Android e adornarlo con l'icona del robot Android, un produttore di dispositivi deve garantire che il dispositivo sia conforme con il Compatibility Definition Document (CDD) di Android e superi il Compatibility Test Suite (CTS) e il Vendor Test Suite (VTS). Dopo che un dispositivo è stato verificato come conforme, i Google Mobile Services possono essere concessi in licenza per il dispositivo, consentendo così di essere fornito con add-on proprietari di Google.

Questi vincoli—il codice proprietario di Google, l'accordo di licenza, la conformità con il CDD e il superamento del CTS e del VTS—non influenzano l'uso del codice base di AOSP. Gli sviluppatori e i creatori di dispositivi sono liberi di utilizzare e adattare il codice AOSP purché non etichettino il dispositivo risultante come "Android" o non necessitino del codice proprietario di Google e delle sue funzionalità associate (mercato, servizi cloud, ecc.).

Ci sono diversi esempi di fork del codice base AOSP. Forse il più noto è Fire OS, utilizzato sui dispositivi Amazon come il Kindle, Fire TV e Fire Phone. Molte, se non la maggior parte, delle applicazioni costruite per Android funzioneranno su Fire OS. Tuttavia, Fire OS non può essere etichettato come Android, non può includere il Google Play Store e non supporta i Google Play Services.

Sia Samsung che LineageOS (precedentemente CyanogenMod) mantengono sistemi operativi che sono versioni pesantemente modificate del codice AOSP. Entrambi questi fork, tuttavia, sono riusciti a superare il CTS e a rimanere dalla parte buona di Google. Entrambi sono etichettati come Android.

Molti altri esempi di codice AOSP in dispositivi non-Google esistono, dai telefoni e tablet popolari in Cina e India all'interfaccia per il servizio Xfinity di Comcast. Anche se ciascuno di questi dispositivi ha la propria storia legale e le proprie preoccupazioni legali, l'uso del codice AOSP non è, di per sé, un problema per nessuno di loro. A seconda del fatto che un produttore ritenga di poter...

**Offerta di un'alternativa all'etichetta Android e ai servizi proprietari Google**

Quando si offre un'alternativa all'etichetta Android e ai servizi proprietari Google, il produttore
può scegliere se invitare o meno Google nel proprio prodotto basato su AOSP. I dispositivi creati
utilizzando il codice AOSP non devono essere in alcun modo visibili a Google e non necessitano di
alcuna autorizzazione o partecipazione da parte di Google. 

Dove diventa complicato è con i dispositivi che si trovano a metà strada tra i due estremi 
appena descritti: un dispositivo che non ha bisogno o non vuole l'etichetta Android ma su cui il
produttore vuole includere app con cui gli utenti sono familiari, fornite da Google. Ad esempio, 
si consideri un chiosco per noleggiare film alimentato da Android. Il produttore potrebbe voler 
includere YouTube affinché gli utenti possano visualizzare i trailer dei video. La posizione di Google 
è che questo tipo di accordo non è supportato. Il produttore deve assicurarsi che il dispositivo sia 
compliant con CDD/CTS oppure trovare un modo alternativo per fornire la funzionalità desiderata.

**Altre Scelte**

Il numero di prodotti con sistemi embedded può essere in crescita esplosiva, ma l'idea del computing 
embedded non è affatto nuova. Sono disponibili molte alternative ad Android come intelligenza per un 
dispositivo IoT; sistemi operativi in tempo reale (RTOS), alcuni molto più vecchi di Android e alcuni 
nuovamente sviluppati.

Un'alternativa ancora migliore, tuttavia, potrebbe essere non avere alcun sistema operativo.

**Micro-Controller**

Anche con i prezzi in calo e l'aumento della potenza dei computer a scheda singola (SBC), al momento della 
scrittura di questo documento, una scheda che può eseguire Android costerà qualcosa nella gamma di 20–50 dollari. 
Occuperà anche circa 20 centimetri cubi di spazio. Questo può rappresentare un notevole ingombro per un piccolo dispositivo. 
Quando il costo e lo spazio sono di importanza fondamentale, un micro-controller come il popolarissimo Arduino 
può essere un'alternativa attraente. La maggior parte dei micro-controller non sono processori completi e non possono 
supportare processi multipli simultanei, Linux, o un'interfaccia utente accattivante, tanto meno Android.

Al momento della scrittura di questo documento, i cosiddetti "mini" micro-controller sono un ordine di grandezza 
meno costosi degli SBC e possono richiedere meno di un solo centimetro cubo di spazio. Nel tempo, sicuramente, 
la linea di demarcazione tra SBC e micro-controller si confonderà. Gli SBC diventeranno più piccoli, 
i micro-controller diventeranno più potenti, e le capacità degli RTOS scaleranno linearmente con 
l'hardware. Anche adesso, tuttavia, è possibile ottenere alcune magie molto impressionanti con uno o 
più micro-controller piccoli e semplici.

Una limitazione importante dei micro-controller, da considerare prima di sceglierne uno come il 
cervello di un progetto, è la sua capacità di aggiornamento. Sebbene sia certamente possibile aggiornare un 
sistema basato su micro-controller tramite OTA, può essere difficile e potrebbero essere necessari 
hardware specializzati aggiuntivi. Se gli aggiornamenti over-the-air (OTA) fanno parte della strategia 
del vostro dispositivo, potreste aver bisogno di un sistema operativo completo.

# **La Semplicità è una spada a doppio taglio**

Un sistema che può essere aggiornato può essere hackerato. Hackerare un micro-controllore è del tutto possibile. Pensate a Stuxnet. Tuttavia, farlo è probabilmente difficile e non interessante per un attaccante. Un semplice micro-controllore basato su memoria di sola lettura (ROM) che sia sufficiente per alimentare il vostro progetto può salvarvi da un sostanziale budget di sicurezza e tenere il vostro prodotto fuori dai titoli durante il prossimo incidente di negazione distribuita del servizio (DDoS).

# **Altri RTOS**

La lista delle alternative del sistema operativo ad Android è lunga. Ognuno di loro risolve un insieme di problemi e ne introduce altri.

### **QNX**

QNX era il sistema operativo incorporato più popolare al mondo prima dell'avvento di Android. Originariamente chiamato QUNIX, è un sistema basato su micro-nucleo ed è stato sviluppato da due studenti dell'Università di Waterloo. È stato rilasciato nel 1984 come QNX per evitare violazioni di marchi registrati. Da allora è stato riscritto diverse volte e venduto, prima a Harman International e poi a Research In Motion, ora Blackberry. Poco dopo l'acquisizione di QNX da parte di Blackberry, l'accesso al codice sorgente è stato limitato.

### **VxWorks**

Se il vostro dispositivo necessita del tipo di affidabilità e dipendenza che alimenta le sonde marziane e gli aerei militari, dovreste considerare VxWorks. VxWorks è un sistema operativo proprietario originariamente sviluppato dai pionieri di RTOS, Wind River. Wind River è ora una filiale interamente posseduta da Intel.

Il nucleo di VxWorks è monolitico (a differenza di QNX), ma il sistema è ben modularizzato e la catena di strumenti ben sviluppata. Tutto questo, naturalmente, ha un costo: VxWorks è proprietario e a codice chiuso. Wind River produce anche Wind River Linux, un kernel rinforzato con un sistema di costruzione personalizzato.

### **Android Things**

Android Things è la versione di Google di Android ridotta per l'IoT. Codenominata Brillo, questa versione ridotta di Android è stata progettata per essere utilizzata da dispositivi IoT a basso consumo con RAM significativamente inferiore (fino a 32 MB) pur includendo supporto Bluetooth Low Energy (BLE) e Wi-Fi. Android Things richiede ai produttori di utilizzare computer a scheda singola (SBC) o sistemi su moduli (SoM) supportati. Tali dispositivi riceverebbero automaticamente aggiornamenti di sistema operativo e sicurezza da Google. Inoltre, Android Things includeva un framework standard per sviluppare interfacce hardware personalizzate senza richiedere cambiamenti al kernel sottostante o al framework Android. Questo approccio permetteva ai produttori di IoT di concentrarsi sul loro scopo specifico e non preoccuparsi del sistema operativo sottostante, della sua sicurezza o degli aggiornamenti a livello di sistema.

