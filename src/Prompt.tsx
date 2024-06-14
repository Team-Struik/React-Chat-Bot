import { useState } from "react";
import { useNavigate } from "react-router-dom";

const errorMessage = `Reageer op geen vragen, en stuur geen berichten. Er is een fout opgetreden, en zorg er voor dat de klant de chatbot opnieuw opstart. Reageer kort`;

export const initialData: Prompt[] = [
    {
        id: 0,
        name: "Keukentafel maker",
        opening: `Jij bent een online chatbot voor een keukentafel maker. Jij helpt de klant met het vinden van het beste product.`,
        products: `Materiaalsoort;Spatrand;Vensterbank;Boorgaten_per_stuk_mogelijk;WCD_mogelijk;Randafwerking_mogelijk;Prijs_per_m2;Randafwerking_pm;Spatrand_pm;Vensterbank_pm;Uitsparing_onderbouw;Uitsparing_inleg;Uitsparing_ruw;Kraangat;Zeepdispenser;Boorgaten_per_stuk;WCD;Achterwand_pm;Randafwerking_pm_optie2;
Noble Desiree Grey Matt;0-150 mm;150 mm+;true;true;false;247.52;87.00;35.00;309.40;151.50;97.50;70.00;10.70;10.70;5.00;13.50;309.40;28.00;
Noble Carrara Verzoet;150 mm+;0-150 mm;true;true;true;258.40;87.00;309.40;35.00;151.50;97.50;70.00;10.70;10.70;5.00;13.50;315.60;28.00;
Taurus Terazzo White Verzoet;0-150 mm;0-150 mm;false;false;true;239.40;79.00;35.00;35.00;151.50;97.50;70.00;10.70;10.70;5.00;13.50;298.50;28.00;
Taurus Terazzo Black;150 mm+;150 mm+;true;true;true;228.50;79.00;309.40;309.40;151.50;97.50;70.00;10.70;10.70;5.00;13.50;289.50;28.00;
Glencoe Verzoet;"0-150; 150 mm+";150 mm+;false;false;true;305.50;95.00;"40; 350";340.50;151.50;97.50;70.00;10.70;10.70;5.00;13.50;315.60;28.00;`
    },
    {
        id: 1,
        name: "Hovenier",
        opening: `Jij bent een online chatbot voor een hovenier. Jij helpt de klant met het vinden van de beste tuinoplossingen en geeft advies over tuinontwerp, plantenkeuze, onderhoudstips, en meer.`,
        products: `Type_Plant;Lichtbehoefte;Waterbehoefte;Grondsoort;Winterhardheid;Hoogte_bij_volwassenheid;Bloeitijd;Prijs_per_stuk;
Rode Esdoorn;Halfzon-schaduw;Gemiddeld;Zuur-neutraal;Zeer winterhard;5-10 meter;April-Mei;50.00;
Lavendel;Zon;Weinig;Droog-neutraal;Matig winterhard;0.5-1 meter;Juni-Augustus;8.00;
Hortensia;Halfzon-schaduw;Gemiddeld;Zuur-neutraal;Matig winterhard;1-2 meter;Juli-September;15.00;
Leilinde;Zon;Gemiddeld;Neutraal-klei;Zeer winterhard;4-6 meter;Mei-Juni;75.00;
Buxus;Halfzon-schaduw;Weinig;Neutraal-kalkrijk;Zeer winterhard;0.5-1 meter;Niet van toepassing;12.00;
Rozenstruik;Zon;Gemiddeld;Neutraal-klei;Matig winterhard;1-2 meter;Mei-Oktober;20.00;`
    },
    {
        id: 2,
        name: "PC Bouwer",
        opening: `Jij bent een online chatbot voor een pc-builder. Jij helpt de klant met het samenstellen van hun ideale pc en geeft advies over componenten, compatibiliteit, prestaties, en meer.`,
        products: `Component;Type;Merk;Model;Prijs;Compatibiliteit;Specificaties;
Processor;CPU;Intel;i7-12700K;€380.00;Socket LGA 1700;12 cores, 20 threads, 3.6 GHz (5.0 GHz Turbo);
Processor;CPU;AMD;Ryzen 7 5800X;€320.00;Socket AM4;8 cores, 16 threads, 3.8 GHz (4.7 GHz Turbo);
Moederbord;Motherboard;ASUS;ROG Strix Z690-E;€350.00;Socket LGA 1700;ATX, DDR5, PCIe 5.0;
Moederbord;Motherboard;MSI;B550-A Pro;€130.00;Socket AM4;ATX, DDR4, PCIe 4.0;
Geheugen;RAM;Corsair;Vengeance LPX 16GB;€80.00;DDR4;3200 MHz, CL16;
Geheugen;RAM;G.Skill;Trident Z5 32GB;€220.00;DDR5;6000 MHz, CL36;
Opslag;SSD;Samsung;970 EVO Plus 1TB;€150.00;NVMe M.2;3500 MB/s read, 3300 MB/s write;
Opslag;SSD;Western Digital;Blue 500GB;€60.00;SATA III;560 MB/s read, 530 MB/s write;
Grafische Kaart;GPU;NVIDIA;GeForce RTX 3080;€700.00;PCIe 4.0;10GB GDDR6X;
Grafische Kaart;GPU;AMD;Radeon RX 6800 XT;€650.00;PCIe 4.0;16GB GDDR6;
Behuizing;Case;NZXT;H510;€80.00;ATX;Midden Tower, 2x USB 3.0, Audio/Mic;
Behuizing;Case;Cooler Master;MasterBox Q300L;€50.00;mATX;Midden Tower, 2x USB 3.0, Audio/Mic;
Voeding;PSU;Corsair;RM750x;€120.00;ATX;750W, 80+ Gold;
Voeding;PSU;EVGA;600 W1;€40.00;ATX;600W, 80+ White;`
    },
    {
        id: 3,
        name: "Travel Agent",
        opening: `Jij bent een online chatbot voor een avontuurlijke reisassistent. Jij helpt de klant met het plannen van hun ideale avontuurlijke vakantie en geeft advies over bestemmingen, activiteiten, uitrusting, en meer.`,
        products: `Bestemming;Activiteit;Seizoen;Duur;Moeilijkheidsgraad;Prijs;
Patagonië;Trekking;Herfst;10 dagen;Hoog;€1500.00;
Noorwegen;Kajakken;Zomer;7 dagen;Middel;€1200.00;
Nieuw-Zeeland;Bungeejumpen;Lente;1 dag;Laag;€250.00;
Canada;Skiën;Winter;14 dagen;Hoog;€2000.00;
Australië;Surfen;Zomer;5 dagen;Middel;€800.00;
Nepal;Bergbeklimmen;Herfst;21 dagen;Zeer Hoog;€3000.00;
Zweden;Wildkamperen;Lente;5 dagen;Laag;€600.00;
Costa Rica;Ziplining;Zomer;3 dagen;Laag;€400.00;
Schotland;Mountainbiken;Lente;7 dagen;Middel;€900.00;
IJsland;Gletsjerwandelen;Winter;5 dagen;Hoog;€1300.00;`
    },
    {
        id: 4,
        name: "Gastro Guide",
        opening: `Jij bent GastroGuide, een online chatbot voor culinaire liefhebbers. Jij helpt de klant met het vinden van de beste recepten, kooktechnieken, en ingrediënten.`,
        products: `Gerecht;Type;Keuken;Moeilijkheidsgraad;Bereidingstijd;Ingrediënten;Prijs;
Spaghetti Carbonara;Hoofdgerecht;Italiaans;Middel;30 minuten;Spaghetti, Eieren, Pancetta, Parmezaanse kaas, Zwarte peper;€10.00;
Pad Thai;Hoofdgerecht;Thais;Middel;40 minuten;Rijstnoedels, Garnalen, Tofu, Eieren, Taugé, Pinda"s, Tamarindepasta;€12.00;
Sushi;Hoofdgerecht;Japans;Hoog;60 minuten;Sushirijst, Nori, Zalm, Tonijn, Avocado, Sojasaus, Wasabi;€20.00;
Guacamole;Bijgerecht;Mexicaans;Laag;15 minuten;Avocado"s, Limoensap, Tomaten, Uien, Koriander, Zout;€5.00;
Croissants;Ontbijt;Frans;Hoog;3 uur;Bloem, Boter, Melk, Suiker, Gist, Zout;€8.00;
Chicken Tikka Masala;Hoofdgerecht;Indiaas;Middel;45 minuten;Kip, Tomatenpuree, Yoghurt, Knoflook, Gember, Garam masala;€15.00;
Falafel;Hoofdgerecht;Midden-Oosters;Laag;30 minuten;Kikkererwten, Knoflook, Peterselie, Komijn, Koriander, Zout;€7.00;
Paella;Hoofdgerecht;Spaans;Hoog;1 uur 30 minuten;Rijst, Saffraan, Kip, Chorizo, Mosselen, Garnalen, Paprika;€18.00;
Chili con Carne;Hoofdgerecht;Mexicaans;Middel;1 uur;Gehakt, Bonen, Tomaten, Uien, Knoflook, Chilipoeder, Komijn;€10.00;
Tom Kha Gai;Soep;Thais;Middel;35 minuten;Kip, Kokosmelk, Galangawortel, Citroengras, Limoensap, Champignons, Koriander;€12.00;`
    },
    {
        id: 5,
        name: "Retro Recommender",
        opening: `Jij bent RetroRecommender, een online chatbot voor liefhebbers van vintage kleding. Jij helpt de klant met het vinden van de beste vintage kledingstukken, accessoires, en stylingtips.`,
        products: `Kledingstuk;Type;Decennium;Stijl;Materiaal;Maat;Prijs;
Flapper Dress;Jurk;1920s;Art Deco;Zijde;S;€120.00;
Bell-bottom Jeans;Broek;1970s;Boho;Denim;M;€45.00;
Leather Jacket;Jas;1950s;Rockabilly;Leer;L;€150.00;
Polka Dot Skirt;Rok;1950s;Retro Chic;Katoen;M;€35.00;
Hawaiian Shirt;Overhemd;1960s;Tropical;Rayon;L;€25.00;
Poodle Skirt;Rok;1950s;Preppy;Wol;S;€40.00;
Platform Shoes;Schoenen;1970s;Disco;Leer;39;€60.00;
Wrap Dress;Jurk;1970s;Boho;Jersey;M;€50.00;
Aviator Sunglasses;Accessoire;1980s;Casual;Metaal;One size;€20.00;
Shift Dress;Jurk;1960s;Mod;Polyester;L;€70.00;`
    },
    {
        id: 6,
        name: "Medieval Smith",
        opening: `Jij bent MedievalSmith, een online chatbot voor een middeleeuwse smid. Jij helpt de klant met het vinden van de beste wapens, bepantsering, en smeedtechnieken.`,
        products: `Item;Type;Materiaal;Gewicht;Duurzaamheid;Vaardigheid_niveau;Prijs;
Langzwaard;Wapen;Hoogwaardig staal;1.5 kg;Zeer hoog;Gevorderd;150 goudstukken;
Strijdbijl;Wapen;IJzer en hout;2.0 kg;Hoog;Gemiddeld;100 goudstukken;
Boog;Wapen;Essenhout en pees;1.2 kg;Gemiddeld;Gemiddeld;75 goudstukken;
Kettingmail;Bepantsering;Staalringen;10 kg;Hoog;Gemiddeld;200 goudstukken;
Platenharnas;Bepantsering;Gesmeed staal;25 kg;Zeer hoog;Gevorderd;400 goudstukken;
Dolken;Wapen;Damascus staal;0.5 kg;Gemiddeld;Beginner;50 goudstukken;
Ronde Schild;Bepantsering;Eikenhout en staal;6 kg;Hoog;Gemiddeld;120 goudstukken;
Kruisboog;Wapen;Eikenhout en staal;6.5 kg;Zeer hoog;Gevorderd;180 goudstukken;
Ridderhelm;Bepantsering;Gesmeed staal;4 kg;Hoog;Gemiddeld;100 goudstukken;
Mace;Wapen;Staal en hout;3 kg;Hoog;Gemiddeld;110 goudstukken;`
    }
];

export type Prompt = {
    id: number,
    name: string,
    opening: string,
    products: string,
}

export function createSystemPrompt(id: string) {
    if (!id || isNaN(parseInt(id))) {
        console.log(id)
        return errorMessage;
    }

    const prompt = getData().find(p => p.id === parseInt(id));

    if (!prompt) {
        return errorMessage;
    }

    return `Reageer altijd in het Nederlands. Reageer alleen op relevante vragen. Geef nooit korting.
${prompt.opening}
Dit is de data van de producten:
${prompt.products}
Als het gesprek afgelopen is, stuur je een AFSLUITINGS JSON.
Eerst vraag  je of het gesprek afgerond is, en als het afgerond is. Reageer dan met een json bericht met de volgende structuur:
{
  "status": "completed"
}
DIT IS HET AFSLUITINGS JSON.
De afsluitings JSON is een intern bericht dat aangeeft dat het gesprek is afgerond. Dus je laat de gebruiker NOOIT weten dat er een AFSLUITINGS JSON word gestuurd.
Alleen wanner het gesprek is afgerond, en het AFSLUITINGS JSON is gestuurd, reageer je met een json bericht met de volgende structuur:
{
  "items": [
  {
      "name": "Quartz Countertops",
      "quantity": "8 vierkante meters",
      "price": "€200",
      "total_price": "€1.600"
      "additional_info": "extra info about the product"
  },
  {
      "name": "Backsplash installation",
      "quantity": "2 lineaire meters",
      "price": "€60",
      "total_price": "€120"
      "additional_info": "extra info about installation"
  }
  ],
  "total_price": "€1.720"
  "additional_info": "extra info about full order"
}
Vul de additional_info met extra nodige informatie over de bestelling, zoals kleur, afmetingen, of andere specificaties.
Laat de additional_info LEEG met een LEGE STRING als er geen extra info is.
Als het AFSLUITINGS JSON nog niet is gestuurd, stuur dat bericht dan eerst.
Laat de gebruiker nooit weten van het bestaan van het AFSLUITINGS JSON bericht.
`;
}

export function getData(): Prompt[] {
    const prompts = localStorage.getItem("prompts");
    if (prompts) {
        return JSON.parse(prompts);
    } else {
        localStorage.setItem("prompts", JSON.stringify(initialData));
        return initialData;
    }
}

export function setData(data: Prompt[]) {
    localStorage.setItem("prompts", JSON.stringify(data));
}

export function addItem(item: Prompt) {
    const prompts = getData();
    item.id = Math.max(...prompts.map(p => p.id)) + 1;
    prompts.push(item);
    localStorage.setItem("prompts", JSON.stringify(prompts));
}

export const AddPrompt = () => {
    const [name, setName] = useState("");
    const [opening, setOpening] = useState("");
    const [products, setProducts] = useState("");
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();

    const handleFileRead = (e: ProgressEvent<FileReader>) => {
        const content = (e.target as FileReader).result as string;
        setProducts(content);
    };

    const handleFileChosen = (file: File) => {
        let fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
        setFileName(file.name);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({ id: -1, name, opening, products });
        navigate("/dashboard");
    }

    return (
        <>
            <h1 className="bliss">
                <a href="/dashboard">
                    <img src="/blis.svg" alt="Blis Logo" />
                </a>
            </h1>
            <div className="main-page">
                <form className="chat" onSubmit={handleSubmit}>
                    <div className="prompt-fields padding-top-20">
                        <label className="add-prompt-label">Naam</label>
                        <p className="disclaimer">De naam van de chatbot. Dit is de naam die de klant ziet wanneer de chatbot zich voorstelt.</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="styled-textarea"/>
                    </div>
                    <div className="prompt-fields">
                        <label className="add-prompt-label">Opening</label>
                        <p className="disclaimer">
                            De opening is een stukje tekst dat de chatbot gebruikt om zichzelf voor te stellen.
                            <br />
                            Dit stukje tekst moet kort en bondig zijn, en de klant een idee geven van wat de chatbot doet.
                        </p>
                        <textarea
                            value={opening}
                            onChange={(e) => setOpening(e.target.value)}
                            required
                            rows={4}
                            className="styled-textarea"
                        />
                    </div>
                    <div className="prompt-fields">
                        <label className="add-prompt-label">Producten</label>
                        <p className="disclaimer">Upload een CSV, JSON of TXT bestand met de producten die de chatbot moet gebruiken.</p>
                        <button type="button" className="styled-button" onClick={() => document.getElementById("input-file")?.click()}>Upload Data</button>
                        <input
                            id="input-file"
                            type="file"
                            accept=".csv, .txt, .json"
                            onChange={e => {
                                if (e.target.files) {
                                    handleFileChosen(e.target.files[0]);
                                }
                            }}
                            required
                            style={{ display: "none" }}
                            className="styled-file-input"
                        />
                        {fileName && <p className="file-name">Gekozen bestand: {fileName}</p>}
                    </div>

                    <div className="button-wrapper">
                        <button type="submit" className="styled-button">Add Prompt</button>
                        <button type="button" className="styled-button" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export const DeletePrompt = () => {
    const prompts = getData();
    const navigate = useNavigate();

    const deletePrompt = (id: number) => {
        const newPrompts = prompts.filter(p => p.id !== id);
        setData(newPrompts);
        navigate("/dashboard");
    }

    return (
        <>
            <h1 className="bliss">
                <a href="/dashboard">
                    <img src="/blis.svg" alt="Blis Logo" />
                </a>
            </h1>
            <h1>Delete Prompt</h1>
            <div className="dashboard">
                {prompts.map(bot => (
                    <button className="delete-button" key={bot.id} onClick={() => deletePrompt(bot.id)}>
                        {bot.name}
                    </button>
                ))}
            </div>
        </>
    );
}