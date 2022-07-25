
import { mapValues } from 'MapValues'
import { content } from './Paths.js'
import { join } from 'Path'


const tracked = {
    
    distribution : 'blocks/distribution' ,
    production : 'blocks/production' ,
    liquids : 'blocks/liquids' ,
    turrets : 'blocks/turrets' ,
    effects : 'blocks/effect' ,
    drills : 'blocks/drills' ,
    units : 'blocks/units' ,
    power : 'blocks/power' ,
    walls : 'blocks/walls' ,
    items : 'items' ,
    units : 'units' ,
    zones : 'zones'
}


const complete = (path) =>
    join(content,path);


export default Object
    .entries(tracked)
    .map(([ name , path ]) =>  [ name , complete(path) ]);
