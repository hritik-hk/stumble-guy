import { getCustomProperty, incrementCustomProperty ,setCustomProperty} from "./updateCustomProperty.js";

const groundElem=document.querySelectorAll("[data-ground]");
const speed=0.05;


export function setUpGround(){
    setCustomProperty(groundElem[0],"--left",0);
    setCustomProperty(groundElem[1],"--left",300);

}

export function updateGround(delta, speedScale){

    groundElem.forEach(ground=>{
        incrementCustomProperty(ground,"--left", (delta*speed*-1)*speedScale);
        if(getCustomProperty(ground,"--left")<=-300){
            incrementCustomProperty(ground,"--left",600);
        }
    });

}