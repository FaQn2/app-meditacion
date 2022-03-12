

const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function() {
  checkPlaying(song);
});

replay.addEventListener("click", function() {
    restartSong(song);
    
  });


const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;

}

timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
//SONIDO DE PAUSA Y PLAY
const tuck = new Audio()
tuck.src = "./sounds/TUCK.mp3"
//PAUSAR PRESIONANDO LA TECLA "SPACE"
addEventListener('keypress', function (e) {
  e.preventDefault();
  if(e.code == "Space") {
    if (song.paused) {
      song.play();
      video.play();
      tuck.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      tuck.play();
      play.src = "./svg/play.svg";
    }
  }
});
// MOSTRAR UNA FRASE CADA X TIEMPO
 let timerId = setInterval(() => (randomFrases()), 11400);

function randomFrases(){
  const frase = ["Debes sentarte sin juzgar, observando los pensamientos que fluyen a través de ti. Sin interferir. Si juzgas, si dices “esto es bueno” o “esto es malo”, has perdido la pura observación.",
  "Respira y mantente presente", 
  "Meditar es cultivar nuevas cualidades y cultivar nuevas formas de ser.",
   "La gratitud es la llave hacia la abundancia",
    "Inhala aceptacion exhala tension",
     "La paz viene del interior. Buscarla fuera no permite obtener resultados.", 
     "La vida no es tan seria como la mente pretende hacernos creer. ",
     "Si te preocupas por un árbol, no verás el bosque.",
     "El secreto de la meditación consiste en desarrollar, concentrar y dirigir tu consciencia.",
     "La respiración atenta es una especie de puente que conecta el cuerpo con la mente.",
     "La falta de tiempo no es una excusa para no meditar.",
     " La verdad en sí misma solo puede ser alcanzada dentro de uno mediante la más profunda meditación y conciencia.",
     "La mente por sí misma puede hacer un paraíso del infierno o un infierno del paraíso.",
     "Busca paz para tu mente y obtendrás salud para tu cuerpo.",
     "Tu vida no es como la pintan, es como tú la coloreas.",
     "Haz que tu bienestar mental no dependa de algo o de alguien más, solo de ti.",
     "La paz eterna es vivir con amor el presente",
     "Confía en tu intuición, en ella está tu sabiduría. No te engañes con tu mente ordinaria, en ella está tu ego"
];
  const aleatorio = frase[Math.floor(Math.random() * frase.length)];
  var imprimirfrase = document.getElementById("frase").innerHTML = aleatorio;
}

//CONTROL DE VOLUMEN
let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
song.volume = e.currentTarget.value / 100;
})


 

