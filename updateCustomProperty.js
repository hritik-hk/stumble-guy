//some helper functions

export function getCustomProperty(elem,prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem,prop,value){ 
    elem.style.setProperty(prop,value);

}

export function incrementCustomProperty(elem, prop, inc){

    const curr=getCustomProperty(elem,prop);

    setCustomProperty(elem,prop,curr+inc);

}