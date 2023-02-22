import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const guyElem=document.querySelector("[data-guy]");
const jump_speed=0.45 ;
const gravity=0.0015 ;
const guy_frame_count=4;
const frame_time=100;
 
let isJumping;
let guyFrame;
let currenFrameTime;
let yVelocity;

export function setUpGuy(){
  isJumping=true;
  guyFrame=0;
  currenFrameTime=0;
  yVelocity=0;
  setCustomProperty(guyElem, "--bottom", 0); 
  document.removeEventListener("keydown",onJump);
  document.addEventListener("keydown",onJump);
}

export function setGuyLose(){
    guyElem.src="./imgs/guy2.png";
}

export function updateGuy(delta,speedScale){
   handleRun(delta,speedScale);
   handleJump(delta);
}

export function getGuyRect(){
    return guyElem.getBoundingClientRect();
}

function handleRun(delta,speedScale){

    if(isJumping){
        guyElem.src=`./imgs/guy3.png`;
        return;
    }

    if(currenFrameTime>= frame_time){
        guyFrame=(guyFrame+1)%guy_frame_count; //similar to circular array
        guyElem.src=`./imgs/guy${guyFrame}.png`;
        currenFrameTime-=frame_time;
    }
    currenFrameTime+= delta*speedScale;

}

function handleJump(delta){
    if(!isJumping) return;

    incrementCustomProperty(guyElem,"--bottom", yVelocity*delta);

    if(getCustomProperty(guyElem,"--bottom") <=0){
        setCustomProperty(guyElem,"--bottom",0);
        isJumping=false;
    }

    yVelocity -=gravity*delta;

}

function onJump(e){
    if(e.code!=="Space" || isJumping) return;

    yVelocity=jump_speed;
    isJumping=true;
}