
/*
 *  Move to documentation / credits section
 *
 *  'Thanks for ThePythonGuy3 for making and NiChrosia for finishing this script up!! Greatly appreciated!'
 */


const outpost = extend(StorageBlock,'outpost',{});

outpost.buildType = () => extend(StorageBlock.StorageBuild,outpost,{
    
    displayReact(table){
        this.super$displayReact(table); },

    craft(a,b){},

    acceptItem(source,item){
        
        const { items , team } = this;
        
        const { building : core } = team.core();
        
        return (core)
            ? acceptItem(source,item) 
            : items.get(item) < this.getMaximumAccepted(item) ;
    },

    removeStack(item,amount){
        
        const { team } = this;
        
        const core = team.core();
        const result = this.super$removeStack(item,amount);

        if(core == null)
            return;
        
        const { state } = Vars; 
        const { defaultTeam , sector } = state.rules;
            
        if(
            core && 
            team == defaultTeam &&
            state.isCampaign()
        ) sector.info.handleCoreItem(item,-result);

        return result;
    },

    handleItem(source,item){
        
        const core = this.team.core();
        
        if(core){
            
            const { items , storageCapacity } = core;
            
            if(items.get(item) >= storageCapacity)
                this.block.incinerateEffect(this,source);
            
            core.handleItem(source, item);
        
            return;
        }
        
        this.super$handleItem(source,item);
    },

    itemTaken(item){
        
        const core = this.team.core();
        
        if(core)
            core.itemTaken(item);
    }
});
