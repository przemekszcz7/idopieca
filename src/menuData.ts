export interface MenuItem {
  name: string;
  priceXXL: number;
  priceXL: number;
  ingredients: string;
  flag?: string;
  id: string;
}

export const polishMenu: MenuItem[] = [
  {
    id: "pl-1",
    name: "Tradycja",
    priceXXL: 25,
    priceXL: 15,
    ingredients: "Pieczarki, ser gouda, tradycyjny ketchup rzemieślniczy, szczypiorek"
  },
  {
    id: "pl-2",
    name: "Uczniowska",
    priceXXL: 27,
    priceXL: 18,
    ingredients: "Pieczarki, ser gouda, szynka konserwowa, klasyczny ketchup, aksamitny majonez"
  },
  {
    id: "pl-3",
    name: "1. Krośnieńska",
    priceXXL: 37,
    priceXL: 20,
    ingredients: "Pieczarki, ser gouda, chrupiący boczek wędzony, cebula czerwona, ogórek kiszony, domowy sos czosnkowy"
  },
  {
    id: "pl-4",
    name: "2. Pomorska",
    priceXXL: 36,
    priceXL: 19,
    ingredients: "Pieczarki, ser gouda, delikatny tuńczyk, złocista kukurydza, czerwona cebula, sos czosnkowy"
  },
  {
    id: "pl-5",
    name: "3. Mazurska",
    priceXXL: 36,
    priceXL: 19,
    ingredients: "Pieczarki, ser gouda, rzemieślnicza kiełbasa wiejska, ogórek kiszony, prażona cebulka, ketchup pomidorowy"
  },
  {
    id: "pl-6",
    name: "4. Mazowiecka",
    priceXXL: 37,
    priceXL: 20,
    ingredients: "Pieczarki, ser gouda, soczysty kurczak polędwiczki, słodka papryka czerwona, pikantny sos słodko-ostry"
  },
  {
    id: "pl-7",
    name: "5. Podlaska",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, ser gouda, pikantne polskie salami, oliwki czarne kalamata, papryczki jalapeño, sos ostry"
  },
  {
    id: "pl-8",
    name: "6. Lubelska",
    priceXXL: 36,
    priceXL: 19,
    ingredients: "Pieczarki, ser gouda, delikatna szynka, świeże pomidorki koktajlowe, aromatyczna rukola, aksamitny sos bazyliowy"
  },
  {
    id: "pl-9",
    name: "7. Kaszubska",
    priceXXL: 35,
    priceXL: 18,
    ingredients: "Pieczarki, ser gouda, grillowana w ziołach cukinia, soczysty pomidor, kukurydza, rześki sos tzatziki"
  },
  {
    id: "pl-10",
    name: "8. Wielkopolska",
    priceXXL: 37,
    priceXL: 20,
    ingredients: "Pieczarki, ser gouda, kawałki czosnkowego kurczaka, soczyste brokuły, gęsty sos serowy"
  },
  {
    id: "pl-11",
    name: "9. Śląska",
    priceXXL: 37,
    priceXL: 20,
    ingredients: "Pieczarki, ser gouda, wyborny regionalny krupniok polski, karmelizowana czerwona cebula, tradycyjna musztarda"
  },
  {
    id: "pl-12",
    name: "10. Świętokrzyska",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, ser gouda, plastry pieczonego karkowego schabu, ostry chrzan taty, świeży pomidor, szczypiorek"
  },
  {
    id: "pl-13",
    name: "11. Małopolska",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, dojrzały ser Szafir polskiego rzemiosła, szynka dojrzewająca, aromatyczne suszone pomidory, świeża rukola"
  },
  {
    id: "pl-14",
    name: "12. Góralska",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, ser gouda, leśne boczniaki smażone na maśle, wędzony oscypek z Podhala, lekko kwaskowata żurawina leśna"
  },
  {
    id: "pl-15",
    name: "13. Diabeł Łańcucki",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, ser gouda, piekielnie pikantne salami, papryczki piri-piri, czerwona cebulka, autorski sos 'ostry Carolinka'"
  },
  {
    id: "pl-16",
    name: "14. Staropolska",
    priceXXL: 40,
    priceXL: 23,
    ingredients: "Pieczarki, ser gouda, marynowana w ziołach suszona dziczyzna, leśne podgrzybki w zalewie octowej, sos musztardowo-miodowy"
  },
  {
    id: "pl-17",
    name: "Kosmos",
    priceXXL: 40,
    priceXL: 23,
    ingredients: "Kompozycja własna: ułóż swoją wymarzoną kompozycję z 4 kraftowych składników do wyboru klienta z naszej lady!"
  }
];

export const worldMenu: MenuItem[] = [
  {
    id: "world-1",
    name: "Francja",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, francuski ser brie, gruszka karmelizowana w brązowym cukrze, orzechy włoskie, złocisty miód lipowy",
    flag: "🇫🇷"
  },
  {
    id: "world-2",
    name: "2. Japonia",
    priceXXL: 36,
    priceXL: 19,
    ingredients: "Pieczarki, ser gouda, czosnkowy kurczak w sosie teriyaki, prażone ziarna sezamu, świeży szczypiorek, sos słodki sojowy",
    flag: "🇯🇵"
  },
  {
    id: "world-3",
    name: "3. Bałkany", // User wrote "Balkany" but we add flag/unicode character nicely
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, oryginalny grecki ser feta, smażone mięso wołowe, grillowana słodka papryka czerwona, rześki sos tzatziki",
    flag: "🇧🇦"
  },
  {
    id: "world-4",
    name: "4. Bułgaria",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, aromatyczna feta z ziołami, dojrzewające suszone pomidory, czarne oliwki hiszpańskie, świeży koperek ogrodowy",
    flag: "🇧🇬"
  },
  {
    id: "world-5",
    name: "5. Węgry",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, pikantne wędzone kabanosy, ostra papryka czuszka, czerwona fasola, gęsty dymny sos barbecue",
    flag: "🇭🇺"
  },
  {
    id: "world-6",
    name: "6. Słowacja",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, tradycyjna bryndza podhalańska, chrupiące skwarki ze swojskiego boczku, posiekany szczypiorek",
    flag: "🇸🇰"
  },
  {
    id: "world-7",
    name: "7. Meksyk",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, delikatna szarpana wieprzowina pulled pork, czerwona fasola kidney, kukurydza, ostre papryczki jalapeño, świeża kolendra, aromatyczny pikantny sos arabski",
    flag: "🇲🇽"
  },
  {
    id: "world-8",
    name: "8. Grecja",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, kremowy ser feta, soczyste zielone oliwki olbrzymie, chrupiący ogórek, świeże pomidorki, czerwona cebulka, suszone oregano",
    flag: "🇬🇷"
  },
  {
    id: "world-9",
    name: "9. Mołdawia",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, wędzona tradycyjna kiełbasa mołdawska, słodka pieczona papryka z pieca, czosnek przeciskany, ziołowy sos jogurtowo-śmietankowy",
    flag: "🇲🇩"
  },
  {
    id: "world-10",
    name: "10. Włochy",
    priceXXL: 38,
    priceXL: 21,
    ingredients: "Pieczarki, oryginalny włoski ser mozzarella Galbani, szlachetna szynka parmeńska prosciuto, słodkie pomidorki koktajlowe, świeża roszponka/rukola, gęsty krem balsamiczny z Modeny",
    flag: "🇮🇹"
  },
  {
    id: "world-11",
    name: "11. Hiszpania",
    priceXXL: 39,
    priceXL: 22,
    ingredients: "Pieczarki, dojrzewające pikantne chorizo hiszpańskie, czarne hiszpańskie oliwki, świeża rukola rzymska, aromatyczny zielony sos bazyliowy",
    flag: "🇪🇸"
  }
];

export const sauces = [
  "ketchup",
  "majonez",
  "czosnkowy",
  "tzatziki",
  "bazyliowy",
  "musztarda",
  "musztardowo-miodowy",
  "1000 wysp",
  "arabski-pikantny",
  "barbecue",
  "semoulnaa",
  "duński",
  "serowy",
  "„ostry Carolinka\""
];
