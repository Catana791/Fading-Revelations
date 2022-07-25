
import { fromFileUrl , dirname , join } from 'Path'

const 
    self = dirname(fromFileUrl(import.meta.url)),
    github = join(self,'..','..');


export const content = 
    join(github,'..','content');
    
export const record =
    join(github,'Statistics.yaml');
