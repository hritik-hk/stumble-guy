import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const speed=0.05;
const spikes_min_interval=500;
const spikes_max_interval=2000;
const DiffSpikesCount=3;
const worldElem=document.querySelector("[data-world]");



let nextSpikeTime;
let nextSpike;
export function setUpSpikes(){
    nextSpikeTime=spikes_min_interval;
    document.querySelectorAll("[data-spikes]").forEach(spikes=>{
        spikes.remove();
    })

}


export function updateSpikes(delta,speedScale){

    document.querySelectorAll("[data-spikes]").forEach((spikes)=>{

        incrementCustomProperty(spikes,"--left", (delta*speed*-1)*speedScale);

        if(getCustomProperty(spikes,"--left")<=-100){
            spikes.remove();
        }

    })

    if(nextSpikeTime<=0){
        createSpikes();
        //spikes appearance interval will speedup acc. to speedscale
        nextSpikeTime=randomNumBtw(spikes_min_interval,spikes_max_interval)/speedScale;

    }

    nextSpikeTime-=delta;

}

export function getSpikesRects(){
    //using spread operator so that we can use .map() method
    return [...document.querySelectorAll("[data-spikes]")].map( (spikes) => {
      return spikes.getBoundingClientRect();
    }
     )

}


function createSpikes(){
    const spikes=document.createElement("img");
    spikes.dataset.spikes=true;
    nextSpike=randomNumBtw(1,DiffSpikesCount);
    spikes.src=`./imgs/spike${nextSpike}.png`;
    spikes.classList.add("spikes-css");
    setCustomProperty(spikes,"--left",100);
    worldElem.append(spikes);
}

function randomNumBtw(min , max){
   return Math.floor(Math.random()*(max-min+1)+ min);
}