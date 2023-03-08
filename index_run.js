
import {updateGround, setUpGround} from './ground.js';
import { updateGuy, setUpGuy, getGuyRect,setGuyLose } from './guy.js';
import { setUpSpikes, updateSpikes, getSpikesRects } from './spikes.js';

const world_width=100;
const world_height=30;
const speed_scale_increase=0.00001;
const obstacle_stike_shift_factor=40/1536;
let shift;

const worldElem=document.querySelector("[data-world]");
const scoreElem=document.querySelector("[data-score]");
const startScreenElem=document.querySelector("[data-start-screen]");



setPixelToWorldScale();

function setPixelToWorldScale() {
  shift=window.innerWidth*obstacle_stike_shift_factor;

    let worldToPixelScale;
    if (window.innerWidth/window.innerHeight < world_width / world_height){
        worldToPixelScale = window.innerWidth / world_width;
        // console.log("ratio is "+ `${worldToPixelScale}`);
    }
    else {
        worldToPixelScale = window.innerHeight / world_height;
    }

    worldElem.style.width=`${world_width * worldToPixelScale}px`;
    worldElem.style.height=  `${world_height * worldToPixelScale}px`;

    // console.log(` world div's width: ${worldElem.style.width} and height: ${worldElem.style.height}`);
        
}

window.addEventListener("resize",setPixelToWorldScale);

document.addEventListener("keydown", handleStart);
document.addEventListener("touchstart", handleStart);

let lastTime;
let speedScale;
let score;
let HighScore=0;
let screen;


function handleStart(e){
    screen=e;
    if(e.code!=="Space" && e.type!=="touchstart") return;
    else{
        document.removeEventListener("keydown", handleStart);
        document.removeEventListener("touchstart", handleStart);
    }


    worldElem.classList.remove("game-over");
    scoreElem.classList.remove("hide");
   lastTime= null;
   speedScale=1;
   score=0;
   startScreenElem.classList.add("hide");
   setUpGround();
   setUpGuy();
   setUpSpikes();
    window.requestAnimationFrame(update);
}

function update(time){
    if(lastTime==null){
        lastTime=time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta=time-lastTime;
    lastTime=time;
    updateGround(delta,speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    updateGuy(delta,speedScale);
    updateSpikes(delta,speedScale);

    if(checkLose()){
        return handleLose();
    }

    window.requestAnimationFrame(update);

}

function checkLose(){
    const guyRect=getGuyRect();
    return getSpikesRects().some(rect=> isCollision(guyRect,rect));
}

function isCollision(guy,spike){
    return (
        spike.left+shift<guy.right &&
        spike.top+shift<guy.bottom &&
        guy.left+shift< spike.right &&
        spike.bottom> guy.top
    )
}



function handleLose(){
    setGuyLose();
    worldElem.classList.add("game-over");
    startScreenElem.classList.remove("hide");
    startScreenElem.textContent="YOU DIED!";
    if(Math.floor(score)>Math.floor(HighScore)){

        HighScore=score;
        scoreElem.innerHTML=`<span data-hi>HI:${Math.floor(HighScore)} </span> <span>SCORE:${Math.floor(score)}</span>`;
        document.querySelector("[data-hi]").classList.add("blink_me");
      
    }
    setTimeout(()=>{
        document.querySelector("[data-hi]").classList.remove("blink_me");
        document.addEventListener("keydown",handleStart);
        document.addEventListener("touchstart",handleStart);
        startScreenElem.textContent=`Tap or Press Space To Restart!`;
    },2000);
  
}

function updateScore(delta){
        score+=delta*0.01;
        scoreElem.innerHTML=`<span data-hi>HI:${Math.floor(HighScore)} </span> <span>SCORE:${Math.floor(score)}</span>`;
      
    }

function updateSpeedScale(delta){
    speedScale+=delta*speed_scale_increase;
}









