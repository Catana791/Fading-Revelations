
import { walk } from 'FileSystem'


const discoverOptions = {
    includeFiles : true ,
    includeDirs : false ,
    followSymlinks : false ,
    exts : [ 'hjson' , 'json' ]
}


export async function countFiles(path){
    
    let count = 0;
    
    for await (const entry of walk(path,discoverOptions))
        count++;
        
    return count;
}
