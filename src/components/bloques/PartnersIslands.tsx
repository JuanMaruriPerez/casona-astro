import { useMemo, useState } from "react";
import { X, MapPin, Mail, Phone, Globe, User, Share2 } from "lucide-react";
import { HiLink } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";


type Partner = {
  slug: string;
  titolo: string;
  alt: string;
  img: string;
  categoria: string;
  categorieExtra?: string[];
  text: string;
  web?: string;
  rrss?: string;
  mail?: string;
  tel?: string;
  location?: string;
  contact?: string;
};

export default function PartnersIsland() {
  const [categoria, setCategoria] = useState("Tutto");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const categorie = [
    "Tutto",
    "Agenzia Communicazione",
    "Grafica",
    "Agenzia Viaggi",
    "Cake Design",
    "Flower Design",
    "Foto e Video",
    "Intrattenimento",
    "Location",
    "Luci e Impianti Audio",
  ];

  const categoriaMap: Record<string, string> = {
    tutto: "Tutto",
    "agenzia-comunicazione": "Agenzia Communicazione",
    "grafica": "Grafica",
    "agenzia-viaggi": "Agenzia Viaggi",
    "cake-design": "Cake Design",
    "flower-design": "Flower Design",
    "foto-video": "Foto e Video",
    intrattenimento: "Intrattenimento",
    location: "Location",
    "luci-audio": "Luci e Impianti Audio",
  };

  const slugMap = Object.fromEntries(
    Object.entries(categoriaMap).map(([k, v]) => [v, k])
  );


  const partners = [
    { slug:"luca-porreto",titolo: "Luca Porreto",alt:"Team di pasticceria artigianale del laboratorio Luca Porretto.", img: "/assets/fotos/Eventi/luca.webp", categoria: "Cake Design", text:"Realizzare **il dolce perfetto è il risultato di un impegno costante** e di un lavoro intenso, guidato dalla volontà di superare ogni ostacolo trasformandolo in un’opportunità di crescita. Innovazione creativa e rispetto per la tradizione sono il suo marchio di fabbrica, con una cifra stilistica che combina sperimentazione e ricerca.", web:"https://www.lucaporretto.it/", rrss:"https://www.instagram.com/lucaporrettopasticcere/", mail:"wedding@lucaporretto.it", tel:"+39 3275499400", location:"Cadriano di Granarolo dell’Emilia (BO), Via Don Minzoni, 46", contact:"Luca" },
    { slug:"tenuta-bonzara",titolo: "Tenuta Bonzara",alt:"Panorama di Tenuta Bonzara tra vigneti e colline, location per eventi enogastronomici", img: "/assets/fotos/Eventi/Tenuta-bonzara.webp", categoria: "Location", text:"Azienda vitivinicola tra le più importanti dei Colli Bolognesi, a due passi da Bologna. \n\nAl centro della Tenuta Bonzara sorge un piccolo centro ristrutturato, il borgo di San Chierlo. Grazie alla sua posizione, posto su di un poggio a circa 500 metri sul livello del mare, offre un panorama suggestivo, caratterizzato da un’ampia vista sui Colli Bolognesi e da una distensiva atmosfera. \n\nCompongono il nucleo abitativo la cantina, che ospita la barricaia, e, grazie ad i recenti lavori di ampliamento e di ristrutturazione, anche la grande sala in cui si organizzano cerimonie, meeting ed incontri con una capacità fino a 200 persone", web:"https://www.bonzara.it/", rrss:"https://www.facebook.com/tenutabonzara/", mail:"eventi@bonzara.it", tel:"+39 328 08 15 765", location:"Via San Chierlo, 37/A | Monte San Pietro (BO)", contact:"Silvia Lambertini"  },
        
    { slug:"mm-social-strategy",titolo: "MM Social Strategy",alt:"MM Social Strategy — Agenzia di comunicazione, trasformazione digitale e creazione di contenuti per eventi", img: "/assets/fotos/Eventi/mm.webp", categoria: "Agenzia Communicazione", categorieExtra: ["Grafica", "Foto e Video"], text:"MM Social Strategy è uno **studio di comunicazione e trasformazione digitale** che accompagna brand e realtà del settore eventi nella costruzione di un’identità forte, coerente e riconoscibile. **Uniamo strategia, creatività e tecnologia** per dare vita a contenuti che raccontano storie, emozioni e momenti indimenticabili.\n\nPer La Casona Group **ci occupiamo di tutta la produzione audiovisiva**, dalla direzione artistica agli shooting foto e video, curando ogni dettaglio dell'immagine e dello storytelling. Gestiamo inoltre la comunicazione digitale e i canali social, creando contenuti dedicati e un piano editoriale in linea con i valori del brand e con l’esperienza che La Casona offre ai propri clienti.\n\n**Abbiamo progettato e sviluppato questo sito web ufficiale**, integrando design, performance e identità visiva per offrire un’esperienza elegante e intuitiva. Il nostro obiettivo è valorizzare ogni location, ogni servizio e ogni evento, trasformandoli in narrazioni visive che parlano alle persone e costruiscono relazioni autentiche.\n\n**Comunicazione. Creatività. Innovazione.**", web:"https://mmsocialstrategy.com", rrss:"https://www.instagram.com/mmsocialstrategy/", mail:"contact@mmsocialstrategy.com", tel:"+39 320 09 98 177", location:"Crevalcore, Bologna", contact:"Elena Monaco"  },

    { slug:"rocca-isolani-e-villa-carlo-v",titolo: "Rocca Isolani e Villa Carlo V",alt:"La torre storica di Rocca Isolani, location ideale per cerimonie e ricevimenti", img: "/assets/fotos/Eventi/villa-carlo-v.webp", categoria: "Location", text:"Rocca Isolani dal 1300. Ripercorri le tracce della storia con eventi unici. \n\nLa Rocca, con i suoi vari e straordinari scenari, è location raffinata e appropriata per importanti eventi sia privati che aziendali: convention, congressi, concerti, conferenze, matrimoni e ricevimenti privati, anche di grandi dimensioni.", web:"https://www.isolani.it/", rrss:"https://www.facebook.com/isolaniworld/", mail:"villa@isolani.it", tel:"+39 3357184450", location:"Via G. Garibaldi, 12C | Minerbio (BO)", contact:"Caterina Zanetti"  },
    { slug:"palazzo-isolani",titolo: "Palazzo Isolani",alt:"Sala storica di Palazzo Isolani con architettura monumentale, location per eventi esclusivi", img: "/assets/fotos/Eventi/palazzo-isolani.webp", categoria: "Location", text:"Palazzo Isolani una grande storia nel cuore della città di Bologna. \n\nNel cuore del centro storico bolognese, si affaccia sulla splendida Piazza delle Sette Chiese a pochi passi dalle celebri Due Torri. Le sale settecentesche, riccamente affrescate e decorate con tappezzerie damascate, dalla speciale atmosfera di residenza privata sono l’ambiente ideale per ricevimenti, matrimoni, cocktail, pranzi di gala, cene congressuali ma anche sede ottimale per convegni, convention, meeting ed altri eventi aziendali.", web:"https://www.isolani.it/", rrss:"https://www.facebook.com/isolaniworld/", mail:"villa@isolani.it", tel:"+39 3357184450", location:"Via Santo Stefano, 16 | Bologna", contact:"Caterina Zanetti"  },
    { slug:"fotojet-studio-fotografico",titolo: "Fotojet Studio Fotografico",alt:"Scatto in bianco e nero di Fotojet Studio durante servizio fotografico di matrimonio", img: "/assets/fotos/Eventi/fotojet.webp", categoria: "Foto e Video", text:"**I servizi fotografici di matrimonio sono curati nei minimi dettagli** facendo tesoro di un’esperienza pluridecennale e materiali di pregio. \n\n**I momenti più emozionanti** del vostro giorno di nozze verranno ricordati per sempre grazie al racconto fotografico di Fotojet. \n\nUn team di professionisti seguirà in prima persona il vostro grande evento fornendovi **scatti spontanei, dinamici e in alta definizione.**", web:"https://fotojetbologna.it/", rrss:"https://www.facebook.com/fotojet.studio.fotografico/", mail:"info@fotojetbologna.it", tel:"+39 3516528007", location:"Via Lame, 29/e | Bologna", contact:"Andrea" },
    { slug:"1piu1wedding",titolo: "1più1wedding",alt:"Dettaglio di sposi mano nella mano durante il servizio fotografico di 1più1Wedding", img: "/assets/fotos/Eventi/piu-wedding.webp", categoria: "Foto e Video", text:"Immagini per un giorno indimenticabile, eseguite con attenzione ai dettagli. 1più1Wedding fotografa il giorno del vostro matrimonio in modo originale, dinamico, vero, catturando gli attimi, i sentimenti, le sensazioni e fissandole dentro uno scatto che non è solo una fotografia, ma l’essenza di un momento. La luce negli occhi, l’emozione, la gioia si materializzano e si svelano visibili per sempre, L’unico obiettivo, dietro l’obbiettivo, è rendere indimenticabile il ricordo della vostra promessa d’amore.", web:"http://www.1piu1wedding.it/", rrss:"https://www.facebook.com/1piu1wedding/", mail:"ciao@1piu1wedding.it", tel:"+39 3391392142", location:"", contact:"Simone e Roberto"  },
    //{ titolo: "Valerio Lelli Fotografo",alt:"Coppia di sposi con bolle di sapone fotografata da Valerio Dall’Olio", img: "/assets/fotos/Eventi/valerio.webp", categoria: "Foto e Video", text:"**VOI GODETEVI LA VOSTRA GIORNATA, ALLE FOTO CI PENSIAMO NOI!** \n\nQuello che avete appena letto può sembrare un’ovvietà, e lo dico dall’alto dei parecchi matrimoni vissuti sia da operatore che da semplice avventore, ma non lo è affatto. \n\nIl nostro unico obiettivo dichiarato è quello di voler “raccontare” la vostra giornata nel modo meno invasivo possibile. \n\nAmiamo mettere insieme la storia del vostro giorno più bello attraverso immagini semplici e d autentiche, sfruttando al meglio i colori e i contrasti forniti da quella che in gergo tecnico viene definita “luce disponibile“. \n\nVi forniremo una presenza discreta, ma costante, durante tutta la durata dell’evento, in modo che non dobbiate preoccuparvi di tediose sessioni posate e dei fotografi.", web:"https://www.valeriolelli.it/", rrss:"https://www.facebook.com/valeriolellifotografia/", mail:"info@valeriolelli.it", tel:"+39 3343234495", location:"Via VIII Marzo 32 | Minerbio (BO)", contact:"Valerio"  },
    { slug:"villa-isolani",titolo: "Villa Isolani",alt:"Vista serale di Villa Isolani illuminata per evento speciale", img: "/assets/fotos/Eventi/villa-isolani.webp", categoria: "Location", text:"Villa Isolani: Infinite emozioni. \n\nLa villa in stile neoclassico bolognese di 260 metri quadrati, può ospitare fino a 200 persone e 400 metri quadrati di tensostruttura. Sarete avvolti dalle dolci atmosfere del passato di una villa dell‘800, immersa nel verde di uno splendido parco, è la scenografia perfetta per matrimoni all’aperto, ricevimenti di nozze e cene di gala nella verde campagna bolognese.", web:"https://www.isolani.it/", rrss:"https://www.facebook.com/isolaniworld/", mail:"villa@isolani.it", tel:"+39 3357184450", location:"Via Molino, 6 | Ozzano dell ‘Emilia (BO)", contact:"Caterina Zanetti"  },
    { slug:"cartorange",titolo: "CartOrange",alt:"Tavolo da viaggio con mappe e accessori, servizio consulenza viaggi a cura di CartOrange", img: "/assets/fotos/Eventi/cart-orange.webp", categoria: "Agenzia Viaggi", text:"**Simona Rimondi** \n\nViaggiare e creare itinerari personalizzati è per me, da sempre, fonte di grande piacere e divertimento. \nScoprire culture diverse, immergersi nella natura, rilassarsi su una spiaggia paradisiaca, visitare piccole e grandi città e entrare in contatto con le popolazioni locali arricchisce cuore e mente. \nQuesto è quello che possiamo creare insieme: un’esperienza di viaggio indimenticabile! \n\nContattami per una consulenza online o al telefono, gratuita e senza impegno.", web:"https://www.cartorange.com/simonarimondi/", rrss:"", mail:"si_rimondi@cartorange.com", tel:"+39 3388440098", location:"", contact:"Simona"  },
    { slug:"trentakarte-showband", titolo: "Trentakarte Showband",alt:"Esibizione live con band musicale Tretatelier & Shawband per intrattenimento durante eventi", img: "/assets/fotos/Eventi/trentakarte.webp", categoria: "Intrattenimento", text:"Siamo una band bolognese attiva da 12 anni e.. adoriamo la musica e l’allegria! Offriamo uno spettacolo di intrattenimento musicale a livello professionale, con scherzi, gag, giochi e tantissimo contatto con il pubblico, nonchè una capacità di improvvisazione ed adattamento che ci distinguono da tutti. Accompagniamo le serate con un vasto repertorio di musica italiana e non, anni ’60-’70-80′-’90 tutta riadattata in forma “medley” e assolutamente ballabile. Un rock “dolce” e scanzonato, adatto a tutte le età, a tutti le occasioni e tutti i gusti. Hai una richiesta particolare? vuoi sentire un pezzo che ti sta a cuore? nessun problema ma… lo canti anche tu con noi!!! benvenuto nei “TrentaKarte”!!", web:"http://showband.trentakarte.com/", rrss:"https://www.instagram.com/trentakarte_showband/", mail:"info@trentakarte.com", tel:"+39 3472606949", location:"", contact:"Valerio Parenti"  },   
    //{ titolo: "Cristian Cordisco DJ",alt:"Cristian Cordisco DJ in consolle durante evento con musica live", img: "/assets/fotos/Eventi/cristian.webp", categoria: "Intrattenimento", text:"Cristian Cordisco accompagnerà ogni momento del vostro matrimonio con una colonna sonora versatile, sempre in sintonia con il contesto, capace di coinvolgere e appassionare ospiti di ogni età.", web:"", rrss:"https://www.facebook.com/cristian.cordisco", mail:"cristiancordisco@gmail.com", tel:"+39 3389452023", location:"", contact:"Cristian"  },   
    { slug:"fiori-decori",titolo: "Fiori Decori",alt:"Allestimento floreale elegante curato da Fiore Décor per cerimonia all’aperto", img: "/assets/fotos/Eventi/fioridecori.webp", categoria: "Flower Design", text:"Composizioni floreali. Colori, fantasia, gentilezza e profumi si uniscono per creare nuove emozioni", web:"https://www.fioridecori.com/", rrss:"https://www.facebook.com/Fiori-Decori-di-Daniela-Facchini-142928837444/", mail:"fioridecori.df@gmail.com", tel:"+39 3480669926", location:"Via Gramsci, 139 | Sala Bolognese (BO)", contact:"Daniela"  },
    { slug:"ali-di-zucchero",titolo: "Ali di Zucchero",alt:"Torta nuziale a più piani decorata con fiori freschi realizzata da Ali di Zucchero", img: "/assets/fotos/Eventi/ali.webp", categoria: "Cake Design", text:"Tutto parte da una fantasia … \n\nAd accogliervi saranno Marina e Mauro, per tramutare in realtà tutte le vostre idee. Troverete nel nostro showroom un ambiente intimo e accogliente, per progettare assieme a noi la torta che renderà il vostro evento un momento davvero speciale. \n\nAli di Zucchero, laboratorio sartoriale di pasticceria artistica, dopo anni di attività e studio dell’arte dolciaria, si è specializzato in Wedding Cakes e torte monumentali, ben consapevole di aver raggiunto la preparazione tecnica e la professionalità richieste in un settore così particolare. \n\nDopo le grandi soddisfazioni incontrate nelle fiere di settore, abbiamo deciso di investire ancora di più , proponendoci in modo diretto al mondo Wedding, ai Wedding & Event Planner e agli eventi speciali. \n\nCi piace definirci un laboratorio sartoriale perché curiamo il cliente dal primo incontro conoscitivo al giorno del matrimonio, accontentandolo in ogni esigenza e guidandolo nella scelta. Siamo sempre presenti in prima persona sino al momento del taglio della torta per garantire ai nostri sposi un servizio ineccepibile. I loro sorrisi sono per noi la conferma e soprattutto la soddisfazione. \n\nIl nostro punto di forza è saper coniugare l’eccellenza della pasticceria classica italiana con la scenograficità e la personalizzazione sempre più richieste oggi. Per noi l’elemento gustativo e l’elemento decorativo hanno entrambi un’importanza fondamentale. Per questo ci piace costruire insieme al cliente un progetto ad hoc che porti alla realizzazione di una Wedding Cake deliziosa all’assaggio e splendida a vedersi. \n\nChi si affida a noi troverà un servizio curato e preciso, un prodotto eccellente e il grande entusiasmo di chi vola…con le Ali di Zucchero. \n\nChiamateci per un appuntamento e venite a trovarci nel nostro showroom.", web:"https://www.alidizucchero.it/", rrss:"https://www.facebook.com/Ali-Di-Zucchero-471897482947472/", mail:"info@alidizucchero.it", tel:"+39 340 5116625", location:"Via Mazzini, 23 | Bazzano – Valsamoggia (BO)", contact:"Mauro e Marina"  },
    { slug:"il-gelato-di-fini",titolo: "Il Gelato di Fini",alt:"Torta gelato artigianale con frutta fresca e topper Love di Il Gelato di Fini", img: "/assets/fotos/Eventi/gelateria-fini.webp", categoria: "Cake Design", text:"Da due generazioni, Fini produce gelati che esaltano la qualità di una lavorazione accurata e ricca di esperienza, con solo ingredienti selezionati e una carta di gusti straordinari. \n\nIl nostro impegno è quello di darvi tutti i giorni un gelato fresco, artigianale dal sapore unico.", web:"http://www.gelateriafini.it/", rrss:"https://www.facebook.com/gelateria.fini.bologna", mail:"gelateria.fini@gmail.com", tel:"+39 051531126", location:"Via Massarenti, 219/2 | Bologna", contact:""  },
    { slug:"villa-contessa-massari",titolo: "Villa Contessa Massari",alt:"Facciata storica di Villa Contessa Massari, location per matrimoni ed eventi eleganti", img: "/assets/fotos/Eventi/villa-contessa-massari.webp", categoria: "Location", text:"Villa Contessa Massari è una location esclusiva per matrimoni ed eventi, ideale per chi cerca un’atmosfera elegante e romantica immersa nella storia e nella natura. \n\nQuesta affascinante villa settecentesca, circondata da un parco privato di 26.000 mq, offre una cornice unica per matrimoni all’aperto, cene di gala, ricevimenti e cerimonie civili. Le sale interne, curate nei minimi dettagli per conservare il fascino originario, sono perfette per eventi culturali, mostre e ricevimenti in un ambiente esclusivo e raffinato. \n\nVilla Contessa Massari è anche sede ufficiale per matrimoni civili, grazie alla recente apertura delle scuderie come casa comunale.", web:"https://www.villacontessamassari.it/", rrss:"https://www.instagram.com/Villacontessamassari/?hl=it", mail:"info@villacontessamassari.it", tel:"+39 3683357613", location:"Via Massarenti, 1/A | Gualdo (FE)", contact:"Manuele Ferrari" },
    { slug:"ab-service",titolo: "AB Service",alt:"Servizio di illuminotecnica e audio curato da AB Service per eventi serali", img: "/assets/fotos/Eventi/ab-service.webp", categoria: "Luci e Impianti Audio", text:"**AB Service** è un’azienda di **service** specializzata nel **noleggio e nella installazione** di luci, audio, video, strutture e tutto il materiale a supporto di eventi, spettacoli e concerti. \n\nNata a Bologna, oggi AB Service lavora in tutta Italia, specializzandosi nel settore **matrimoni**, negli **eventi aziendali, fieristici e musicali**. Grazie alla passione per gli eventi, la ricerca continua e l’investimento in tecnologie all’avanguardia, AB Service è l’azienda di scelta di un sempre più vasto numero di organizzatori di eventi, aziende e wedding planner. Fra i marchi utilizzati: Drum Workshop, Christie, L-Acoustics, Sennheiser.", web:"https://www.audiobologna.it/", rrss:"https://www.facebook.com/ABserviceitalia/", mail:"info@audiobologna.it", tel:"+39 3487928801", location:"", contact:"Stefano Roberto"  },
    { slug:"villa-ca-bianca",titolo: "Villa Cà Bianca",alt:"Allestimento all’aperto presso Villa Cà Bianca con tavoli in legno e fiori freschi", img: "/assets/fotos/Eventi/villa-cabianca.webp", categoria: "Location", text:"A pochi chilometri da Bologna troverete la location perfetta per le vostre nozze. Dotata di ampie sale e bellissimi giardini, attrezzata specialmente per queste occasioni, Villa Cà Bianca saprà dare a voi ed ai vostri invitati la miglior accoglienza e professionalità, potrete, così, vivere una giornata speciale dedicata solo a voi.", web:"https://www.villacabianca.com/", rrss:"https://www.facebook.com/Villa-Ca-Bianca-102068053236811/", mail:"info@villacabianca.com", tel:"+39 347 5172471", location:"Via Montanara, 5B | San Lazzaro di Savena (BO)", contact:"Matteo Pizzoli"  },
 
    { slug:"il-mago-delle-torte",titolo: "Il Mago delle Torte",alt:"Sposi con torta nuziale scenografica realizzata da Il Mago delle Torte durante evento serale",img:"/assets/fotos/Eventi/mago.webp", categoria: "Cake Design",  text:"La **Pasticceria Beverara** nasce a Bologna nel 2003 da un’idea di **Vincenzo Porretto**, pasticcere di professione con oltre quarant’anni di esperienza nel settore. \n\nSiamo un punto di riferimento per la pasticceria di alta qualità che unisce al rispetto per la tradizione l’attenzione alla genuinità e freschezza dei prodotti e delle materie prime. \n\nFiore all’occhiello della nostra pasticceria, e specialità di Vincenzo, sono le brioche dolci e salate la cui preparazione si avvale della lievitazione naturale e della crema pasticceria realizzata seguendo l’antica ricetta della tradizione.", web:"http://www.magodelletorte.it/", rrss:"https://www.facebook.com//ilmagodelletortebologna/", mail:"info@pasticceriabeverara.it", tel:"+39 0516345354", location:"Via Giacomo Matteotti, 183 e 185 | Sabbiuno, Castel Maggiore (BO)", contact:"Luca Porretto" },
    { slug:"gspot-labs",titolo: "G+Spot Labs",alt:"Allestimento luci ed effetti speciali per eventi curato da G+Spot Labs", img: "/assets/fotos/Eventi/gspot.webp", categoria: "Grafica", text:"OGNI NOSTRO PROGETTO INIZIA CON UN RACCONTO. IL VOSTRO. \n\nSi dice che la via del cuore passi per lo stomaco. Forse sì, ma passa anche per gli occhi. \n\n**G+Spot** è un laboratorio grafico e creativo in cui le idee degli sposi prendono vita: **vuoi che il tuo matrimonio sia unico e che rimanga per sempre nel cuore di tutti?** \n\nNoi realizziamo per te il **coordinato grafico** e gli angoli più belli del tuo matrimonio, a partire delle tue idee. \n\n**Partecipazioni, menu, tableau mariage, guestbook, bomboniere e tanto altro.**", web:"http://www.gspotlabs.it/", rrss:"https://www.facebook.com/GSpotLabs/", mail:"info.gspotlabs@gmail.com", tel:"+39 0514124902", location:"Via Arturo Solari 19 | Bologna", contact:"Barbara e Monica"  },

    { slug:"love-paper-co",titolo: "Love, Paper & CO.",alt:"Invito di matrimonio artigianale con stampa a rilievo e dettagli dorati personalizzati.", img: "/assets/fotos/Eventi/lovepaperco.webp", categoria: "Grafica", text:"Love, Paper & Co. nasce dall’unione di tre professioniste del wedding design con oltre dieci anni di esperienza nel settore. Monica, Barbara e Giulia: tre creative, tre percorsi diversi, un’unica visione.\n\nDalla concorrenza alla collaborazione, la nostra storia è iniziata come tante: tra portfolio, partecipazioni matrimonio e sogni su carta. Poi un incontro fortuito ci ha fatto capire che insieme potevamo offrire qualcosa di diverso: un progetto che unisse **grafica, artigianato e design personalizzato**, capace di parlare davvero alle coppie che vogliono distinguersi.", web:"https://www.lovepaperandco.it/", rrss:"https://www.instagram.com/lovepaperandcowedding/", mail:"lovepaperandco@gmail.com", tel:"+39 3534670723", location:"", contact:"Monica" },
    { slug:"pasticceria-mimosa",titolo: "Pasticceria Mimosa",alt:"Torta nuziale artigianale decorata con frutti di bosco freschi", img: "/assets/fotos/Eventi/mimosa.webp", categoria: "Cake Design", text:"La nostra è un’azienda a conduzione familiare, che da anni lavora con amore e passione nel settore della pasticceria artigianale. Mettiamo il cuore in tutto quello che facciamo e serviamo ai nostri clienti prodotti di altissima qualità. Abbiamo aperto La Mimosa nel 1996. Nel nostro locale si preparano dolcissime colazioni, ottimi pranzi e aperitivi ed è possibile ordinare torte personalizzate per matrimoni ed eventi speciali.\n\nIl nostro personale è altamente qualificato e cortese, sempre pronto a soddisfare i desideri dei nostri clienti.", web:"https://www.pasticceria-mimosabologna.com/", rrss:"https://www.instagram.com/mimosadolcietantoaltro/?__d=1%2F", mail:"griggiocarla@libero.it", tel:"+39 3487440430", location:"Piazza 8 Marzo, 14 - 40054 Budrio (BO)", contact:"" },
    { slug:"massimo-fuligini",titolo: "Massimo Fuligini",alt:"Gli sposi camminano sorridenti lungo un viale notturno mentre amici e familiari, disposti ai lati, tengono in mano stelline luminose creando un corridoio di luce.", img: "/assets/fotos/Eventi/fuligni.webp", categoria: "Foto e Video", text:"**Ciao e benvenuti!**\n\nSono fotografo, sono grafico, sono un ariete, sono nato nel ’76 dello scorso secolo. Per divagare un po’ sono papà e sono marito e penso che sposarsi equivalga da un certo punto di vista all’avere un figlio: prima che succeda non puoi assolutamente immaginarti cosa significhi.\n\nLe mie foto vogliono seguire questo, vogliono essere l’emozionata testimonianza di uno dei più bei giorni della vostra vita, nelle foto ritroverete i dettagli con tanta cura preparati, i sorrisi di bimbi le lacrime dei genitori gli scherzi degli amici e naturalmente, voi due, semplicemente voi due.\n\nIl mio stile è il reportage del matrimonio.\n\nNon sarò al vostro matrimonio per dirigerlo o controllarlo, lavorerò con discrezione, per catturare le magia e la spontaneità delle emozioni.Voi dovrete solo godervi la giornata! e lasciare che io documenti quello che succede, senza forzature o finzioni.\n\nVi consegnerò una serie di scatti che racconteranno la storia del vostro matrimonio, dai preparativi alla festa.\nNaturalmente ci sarà anche posto per le foto di gruppo, tutti insieme, con i parenti e con gli amici. Faremo poi (di solito tra la fine della cerimonia e gli aperitivi) una piccola sessione di “foto a due”, sempre in modo tranquillo divertente e rilassato.\n\nAccetto solo un limitato numero di matrimoni all’anno.\nPerchè? Per dedicare ad ogni lavoro il massimo di passione e accuratezza in fase di lavorazione delle immagini e di impaginazione del libro. Per questo accetto solo 30 matrimoni all’anno.", web:"https://www.massimofuligni.it/", rrss:"https://www.instagram.com/massimofuligni/", mail:"massimo.fuligni@gmail.com", tel:"+39 3204185912", location:"Via Signorini 12/2, Bologna", contact:"Massimo" },
    { slug:"o2-farm",titolo: "O2 Farm",alt:"Evento elegante in una grande tensostruttura decorata con piante sospese, luci calde e ospiti che conversano attorno ai tavoli.", img: "/assets/fotos/Eventi/o2farm.webp", categoria: "Location", text:"**UN'ESPERIENZA IMMERSIVA TRA NATURA E INNOVAZIONE**\n\nO2 Farm è molto più di una location: è un'esperienza. Un luogo unico a Bologna dove natura, innovazione e design si fondono per dare vita a eventi esclusivi, sostenibili e dal forte impatto visivo ed emozionale.\n\nConcepita secondo una visione rivoluzionaria della sostenibilità, O2 integra perfettamente l’ambiente naturale con soluzioni architettoniche eleganti e allestimenti su misura. Ogni spazio è pensato per valorizzare il tuo evento, creando atmosfere suggestive e coinvolgenti.", web:"https://o2farm.it/", rrss:"https://www.instagram.com/o2_farm", mail:"eventi@o2farm.it", tel:"+39 3927599759", location:"Via Confortino, 3340053, Crespellano (BO)", contact:"Chiara" },
    { slug:"colpo-sicuro-partyband",titolo: "Colpo Sicuro Partyband",alt:"Colpo Sicuro Partyband durante performance live in un matrimonio all’aperto", img: "/assets/fotos/Eventi/colpo.webp", categoria: "Intrattenimento", text:"Siamo la macchina del tempo che vi farà ripercorrere i momenti musicali migliori dagli anni 60 fino ai giorni nostri. Oltre 2 ore di spettacolo, più di 100 grandi successi suonati in medley mozzafiato tutti da ballare e cantare. Il nostro show è dinamico, senza pause e ascolterete generi come Funky, Rock, Pop, Latino, Rock’n’Roll, Hit commerciali moderne e i Revival italiani che hanno fatto la storia! n\…e se vi sposate ?!? …CHIAMATE NOI !!! I matrimoni sono la nostra specialità! Tutto sarà curato nei minimi dettagli con esperienza e professionalità, garantendovi una festa divertente, carica e perfettamente costruita sulle vostre esigenze! verificate con i vostri occhi!", web:"https://www.colposicuroband.com/", rrss:"https://www.facebook.com/pg/colposicuroband", mail:"colposicuroband@gmail.com", tel:"+39 3397560140", location:"", contact:"Gabriele"  },
    { slug:"dumbo",titolo: "DumBo",alt:"Collage di fotografie degli spazi e degli eventi di DumBO a Bologna, con capannoni industriali rigenerati, pubblico, performance artistiche e momenti di comunità all’interno del distretto urbano multifunzionale.", img: "/assets/fotos/Eventi/dumbo.webp", categoria: "Location", text:"DumBO (Distretto urbano multifunzionale di Bologna) è uno spazio di rigenerazione urbana temporanea in cui imprese, associazioni, istituzioni e cittadini convivono, collaborano e si contaminano. A Bologna, quasi 40mila metri quadrati a poche centinaia di metri dal centro e dalla Stazione Centrale tornano a disposizione della città. Capannoni e aree aperte destinati a cultura, arte, innovazione sociale, lavoro, musica e sport per attività trasversali e sempre diverse, in stretta relazione con il territorio.\n\nDumBO propone l’affitto dei singoli spazi, adatti a infinite destinazioni. Spazi da reinventare, disponibili ad interpretare bisogni differenti.", web:"https://dumbospace.it/", rrss:"https://www.instagram.com/dumbo.space/?hl=it", mail:"info@dumbospace.it", tel:"+39 0510493742", location:"Via Camillo Casarini, 19, 40131 Bologna BO", contact:"" },
];

    useEffect(() => {
        const onPopState = () => {
          const params = new URLSearchParams(window.location.search);
          const partnerSlug = params.get("partner");

          if (!partnerSlug) {
            setSelectedPartner(null);
            return;
          }

          const found = partners.find((p) => p.slug === partnerSlug);
          setSelectedPartner(found ?? null);
        };

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
      }, []);

   const filtrati = useMemo(() => {
      if (categoria === "Tutto") return partners;

      return partners.filter((p) => {
        if (p.categoria === categoria) return true;
        if (p.categorieExtra?.includes(categoria)) return true;
        return false;
      });
    }, [categoria, partners]);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const partnerSlug = params.get("partner");
      const categorySlug = params.get("category");

       if (partnerSlug) {
          const found = partners.find((p) => p.slug === partnerSlug);
          if (found) {
            setSelectedPartner(found);
          }
          return;
        }

        // 2️⃣ Si viene category → filtrar
        if (categorySlug) {
          const categoriaUI = categoriaMap[categorySlug];
          if (categoriaUI) {
            setCategoria(categoriaUI);
          }
        }
      }, []);

    const closeModal = () => {
      setSelectedPartner(null);

      const url = new URL(window.location.href);
      url.searchParams.delete("partner");
      window.history.replaceState({}, "", url);
    };


  return (
    <>
      {/* === Filtro === */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categorie.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                        setCategoria(cat);

                        const slug = slugMap[cat];
                        const url = new URL(window.location.href);

                        if (slug === "tutto") {
                          url.searchParams.delete("category");
                        } else {
                          url.searchParams.set("category", slug);
                        }

                        window.history.replaceState({}, "", url);
                      }}
                    className={`px-3 py-1 text-sm rounded-sm border border-amarilloPastel font-normal
                      ${categoria === cat ? "bg-amarilloPastel text-burdeaux" : "bg-white text-burdeaux border-amarillo"}
                      hover:bg-amarilloPastel hover:text-burdeaux transition-all`}
                      aria-label="Categorie filtra partner"
                  >
                    {cat}
                  </button>
                ))}
              </div>
      
              {/* === Griglia === */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrati.map((p, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedPartner(p);

                    const url = new URL(window.location.href);
                    url.searchParams.set("partner", p.slug);
                    window.history.pushState({}, "", url);
                  }}
                  className="relative group overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  {/* Imagen */}
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-64 object-cover sm:group-hover:scale-105 transition-transform duration-700"
                  />
      
                  {/* Overlay blanco + icono */}
                  <div className="
                    absolute inset-0 flex items-center justify-center
                    bg-gradient-to-t from-white/60 to-white/5
                    sm:group-hover:bg-white/60
                    transition-colors duration-500
                  ">
                    <HiLink
                      className="
                        text-burdeaux text-7xl
                        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                        transition-opacity duration-500
                      "
                    />
                  </div>
      
                  {/* Gradiente inferior + texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center pointer-events-none">
                    <h2 className="text-burdeaux text-2xl lg:text-lg font-normal drop-shadow-lg text-center">
                      {p.titolo}
                    </h2>
                    <p className="text-amarillo text-green-900 text-sm font-medium">{p.categoria}</p>
                  </div>
                </div>
              ))}
      
            </div>
      
            {selectedPartner && (
              <div
                onClick={() => closeModal()}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
              >
                <div
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  className="bg-white rounded-md shadow-xl h-[80vh] w-[90vw] sm:w-[70vh] sm:h-[85vh] overflow-hidden relative animate-fadeIn flex flex-col"
                >
                  {/* Botón cerrar */}
                  <button
                    onClick={() => closeModal()}
                    className="absolute top-3 right-3 text-burdeaux hover:text-black z-10"
                    aria-label="Chiudi"
                  >
                    <X className="w-12 h-12 hover:text-amarillo" strokeWidth={2} />
                  </button>
      
                  {/* Imagen */}
                  <div className="h-1/3 md:h-1/2 w-full overflow-hidden">
                    <img
                      src={selectedPartner.img}
                      alt={selectedPartner.titolo}
                      className="w-full h-full object-cover"
                    />
                  </div>
      
                  {/* Contenido scrolleable */}
                  <div className="flex-1 overflow-y-auto p-6 text-left flex flex-col justify-between">
                    <h3 className="text-2xl font-bold text-burdeaux mb-4">
                      {selectedPartner.titolo}
                    </h3>
      
                    <p className="whitespace-pre-line text-justify sm:text-left text-gray-700 flex-1 mb-6">
                      <ReactMarkdown>{selectedPartner.text}</ReactMarkdown>
                    </p>
      
                    {/* Enlaces */}
                    <div className="flex flex-row gap-6 mt-auto pt-4 border-t border-amarillo/50 border-t-2 sm:px-2">
                      {/* Columna izquierda */}
                      <div className="flex flex-col flex-1 space-y-2 justify-evenly text-xs">
                        
                        <div className="flex items-center gap-2 text-burdeaux">
                          <User className="w-5 h-5 flex-shrink-0" />
                          <span>{selectedPartner.contact}</span>
                        </div>
      
                        <a
                          href={`tel:${selectedPartner.tel}`}
                          className="flex items-center gap-2 text-burdeaux hover:text-amarilloPastel transition-colors"
                        >
                          <Phone className="w-5 h-5 flex-shrink-0" />
                          <span>{selectedPartner.tel}</span>
                        </a>
      
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-2 text-burdeaux "
                        >
                          <MapPin className="w-5 h-5 flex-shrink-0" />
                          <span>{selectedPartner.location}</span>
                        </a>
      
      
                      </div>
      
                      {/* Columna derecha */}
                      <div className="flex flex-col flex-1 space-y-2 justify-evenly text-xs">
      
                        <a
                          href={`mailto:${selectedPartner.mail}`}
                          className="flex items-center gap-2 text-burdeaux hover:text-amarilloPastel transition-colors"
                        >
                          <Mail className="w-5 h-5 flex-shrink-0" />
                          <span>Mail</span>
                        </a>
      
                        <a
                          href={selectedPartner.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-burdeaux hover:text-amarilloPastel transition-colors"
                        >
                          <Globe className="w-5 h-5 flex-shrink-0" />
                          <span>Sito Web</span>
                        </a>
      
                        <a
                          href={selectedPartner.rrss}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-burdeaux hover:text-amarilloPastel transition-colors"
                        >
                          <Share2 className="w-5 h-5 flex-shrink-0" />
                          <span>Social</span>
                        </a>
      
                      </div>
      
                    </div>
                  </div>
                </div>
              </div>
            )}
    </>
  );
}
