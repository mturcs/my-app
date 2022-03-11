const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
app.use(express.json());

const apiBaseUrl = '/api/v1/warehouse';

/* Feladat:
Szeretnék 1 endpointot, ahol megtudom nézni, hogy jelenleg hol is fut az alkalmazás. (Melyik porton) (’/api/v1/warehouse/port’)
Feladat:
Szeretnék 1 endpointot, ahol visszakapom a nem mozgó  (éppen áthelyezés alatt lévő) termékek listáját. [READ] (’ /api/v1/warehouse/items’)
Feladat:
Szeretnék 1 endpointot, ahol tudok regisztrálni új terméket a raktárba. [CREATE] (’ /api/v1/warehouse/items’)
Feladat:
Szeretnék 1 endpointot, ahol tudok módosítani egy adott árú cikk összes adatát. [UPDATE] (’ /api/v1/warehouse/items’)
Feladat:
Szeretnék 1 endpointot, ahol tudok egy adott árú cikket id alapján törölni. [DELETE] (’ /api/v1/warehouse/items’)
Feladat:
Szeretnék 1 endpointot, ahol képes vagyok visszakapni az összes olyan terméket, amelyet képes alkalmazott targonca vagy egyéb segédeszköz nélkül mozgatni. (A weight property-je nem haladja meg az 100 egységet!) (’ /api/v1/warehouse/customer’)
Feladat:
Szeretnék 1 endpointot, ahol képes vagyok egy adott vásárló pénze alapján visszaadni a termékeket, amelyet képes megvásárolni. (’ /api/v1/warehouse/items/canBuy’)
Feladat: BONUSZ!!!!!
Szeretnék 1 endpointot, ahol képes vagyok az összes termék csoportját visszakapni. (’ /api/v1/warehouse/items/groups’)

Bővített leírás:
Minden endpointra igaz:
Ha a bejövő id paraméter (már ahol kell ilyen!) által megadott árucikk nem található
404-es Not found-ot dobunk vissza a következő hiba üzenettel:
„Warehouse item with the given id was not found!
Ha az adott árucikk épp áthelyezés alatt áll akkor 
400-es Bad request:
„Warehouse item is moving to other location! please try it later!”
Ha az adott árucikk frissíteni kívánt „location” property-je nem a megengedett értékek közül van megadva.
400-as Bad request-et dobunk vissza a következő hiba üzenettel:
„The warehouse item location property can only be [level-0, level-1, level-2, level-3].”
Ha az adott árucikk súlya 0 vagy negatív szám
akkor 400-as bad request-et dobunk vissza a következő hiba üzennettel:
„The given item weight can’t be negative or zero value.” */

/**
 *
 * @type {
     * [
         * {
         *  price: number,
         *  name: string,
         *  weight: number,
         *  location: string,
         *  id: string,
         *  type: string,
         *  isItMoving: boolean
         *  },
     *  ]
 *  }
 */
const wareHouseItemsObject = 
     [
        {
            id: '6f3b77e9-0653-4a51-a42f-485b3b2a25c4',
            name: 'oralb fogkefe',
            type: 'fogkefe',
            isItMoving: true,
            price: 8000,
            weight: 130,
            location: 'level-1',
        },
        {
            id: '9b3a2b7d-75df-424c-8db7-d62f92b427dd',
            name: 'LAMBORGHINI AVENTADOR (LP700-4) ROADSTER',
            type: 'auto',
            isItMoving: false,
            price: 2360999999,
            weight: 13000000,
            location: 'level-0',
        },
        {
            id: 'b2d6dae7-6e06-4b13-90ef-2896eb639591',
            name: 'Dell Alienware Area-51 R7',
            type: 'szamitogep',
            isItMoving: false,
            price: 1399425,
            weight: 100,
            location: 'level-3'
        },
    ];
// arrayOfIndexes: [ '6f3b77e9-0653-4a51-a42f-485b3b2a25c4', '9b3a2b7d-75df-424c-8db7-d62f92b427dd', 'b2d6dae7-6e06-4b13-90ef-2896eb639591' ] 


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


/* Szeretnék 1 endpointot, ahol meg tudom nézni, hogy jelenleg hol is fut az alkalmazás. (Melyik porton) (’/api/v1/warehouse/port’) */
app.get('/api/v1/warehouse/port', (req,res) => {
    res.send(" The app is running on this port: 3000!")
});

/* Szeretnék 1 endpointot, ahol visszakapom a nem mozgó  (éppen áthelyezés alatt lévő) termékek listáját. [READ] (’ /api/v1/warehouse/items’)*/
app.get('/api/v1/warehouse/items/', (req,res) => {
        const item = wareHouseItemsObject.find((item) => item.isItMoving === true );
        console.log(item);
    res.status(200).send(`Warehouse item is moving to other location! please try it later!: ${ item.id }` );
        
});

/*4. Szeretnék 1 endpointot, ahol tudok módosítani egy adott árúcikk összes adatát. [UPDATE] (’ /api/v1/warehouse/items’) */
app.put('/api/v1/warehouse/items/:id', (req, res) => {
    const item = itemExist({id: req.params.id, res });
    const index = wareHouseItemsObject.indexOf(item);
    const elementForModification = wareHouseItemsObject.items[index];
    wareHouseItemsObject.items[index] = {
        ...elementForModification,
        ...req.body,
    };

    res.status(200).send(`update was successful ${JSON.stringify(item)}`);
});

function itemExist({ id, res }) {
    const item = wareHouseItemsObject.find((item) => item.id === parseInt(id));

    if (!item) {
        res.status(404).send('Warehouse item with the given id was not found!');
    } else if (item.isItMoving/*?*/) {
        res.status(400).send('The warehouse item location property can only be [level-0, level-1, level-2, level-3].');
    }
    return item;
}
//5.Szeretnék 1 endpointot, ahol tudok regisztrálni új terméket a raktárba. [CREATE] (’ /api/v1/warehouse/items’)
app.put('/api/v1/warehouse/items/:id', () => {
    const item = items.find((item) => item.id === parseInt(req.params.id));
    if(!item) {
        res.status(404).send('The item with the given ID was not found!');
    }
    const index= item.indexOf(item);
    items[index]= {
        ...item,
        ...req.body,
    }
    res.status(200).send('The item was updated ${item.name}');

/* 6.Szeretnék 1 endpointot, ahol tudok egy adott árúcikket id alapján törölni. [DELETE] (’ /api/v1/warehouse/items’) */
app.delete('/api/v1/warehouse/items/:id', (req, res)=> {
const item = wareHouseItemsObject.find((item) => item.id === parseInt(req.params.id));
if(!item) { 
    res.status(404).send('The item with the given ID was not found!');
}
const index = item.indexOf(item);
wareHouseItemsObject.splice(index, 1);

res.status(200).send('The delete was successful'); 
});
/* Szeretnék 1 endpointot, ahol képes vagyok visszakapni az összes olyan terméket, amelyet képes alkalmazott targonca vagy egyéb segédeszköz nélkül mozgatni. (A weight property-je nem haladja meg az 1000 egységet!) (’ /api/v1/warehouse/customer’) */
app.listen(3000, () => console.log('Listening on port 3000....') ) 