
import { countFiles } from './Folder.js'
import { stringify } from 'YAML'
import { record } from './Paths.js'
import Tracked from './Tracked.js'

const { writeTextFile } = Deno;
const { log } = console;


try {
    
    const data = {};
    

    for(const [ type , path ] of Tracked){
        
        const count = await countFiles(path);
        
        data[type] = count;
    }


    const yaml = stringify(data);

    await writeTextFile(record,yaml);

} catch (error) {
    console.error(error);
}
