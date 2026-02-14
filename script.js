// State
let cur=1, hist=[1], noC=0, yesS=1, vid=null;

// Hearts BG
(function(){const c=document.getElementById('hbg');for(let i=0;i<18;i++){const h=document.createElement('div');h.className='heart-bg';h.innerHTML='💖';h.style.left=Math.random()*100+'vw';h.style.top=Math.random()*100+'vh';h.style.animationDelay=Math.random()*5+'s';h.style.fontSize=(Math.random()*35+18)+'px';c.appendChild(h);}})();

// Navigation
function go(n){
    if(n!==hist[hist.length-1])hist.push(n);
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
    document.getElementById('p'+n).classList.add('active');
    cur=n;
    var bg=['linear-gradient(135deg,#ff6b8b,#ff8fab,#ffccd5)','linear-gradient(135deg,#ffccd5,#fff0f3)','linear-gradient(135deg,#fff0f3,#fffaf0)','linear-gradient(135deg,#fffaf0,#fffacd)','linear-gradient(135deg,#fffacd,#fff0f3)','linear-gradient(135deg,#ffccd5,#ffb3c1)'];
    document.body.style.background=bg[n-1]||bg[0];
    document.getElementById('backBtn').style.display=n>1?'flex':'none';
    document.getElementById('surpriseBtn').style.display=[3,4,5,6].indexOf(n)>=0?'flex':'none';
    document.getElementById('surpriseBtn').innerHTML=n===6?'← Back to Gifts':'✨ Surprise!';
    
    if(n===2){var cards=document.querySelectorAll('.gift-card');cards.forEach(function(c,i){setTimeout(function(){c.style.opacity='1';c.style.transform='translateY(0)';},i*200);});}
    if(n===3)setTimeout(function(){document.getElementById('letterContent').style.animation='fadeIn 2s ease forwards';},800);
    
    // Animate sticky notes when Page 4 opens
    if(n===4)document.querySelectorAll('.note').forEach(function(nt,i){setTimeout(function(){nt.classList.add('visible');},i*150);});
    
    // Pause video if we leave page 5
    if(n!==5){
        var pVid = document.getElementById('vidPreview');
        if(pVid) pVid.pause();
    }
}
function goBack(){if(hist.length>1){hist.pop();go(hist[hist.length-1]);}}
function goSurprise(){go(cur===6?2:6);}

// Page 1
function sayYes(){
    document.getElementById('envelope').classList.add('open');
    setTimeout(function(){document.getElementById('cssHeart').classList.add('show');document.getElementById('inst').style.opacity='1';},800);
}
function sayNo(){
    noC++;yesS+=0.3;
    var y=document.getElementById('yesBtn');
    y.style.transform='scale('+yesS+')';
    y.innerHTML='PLEASE SAY YES! ❤️ (x'+(noC+1)+')';
    if(noC>5){var nb=document.getElementById('noBtn');nb.style.transform='scale(0.7)';nb.style.opacity='0.4';nb.innerHTML='Okay okay! 😄';nb.disabled=true;setTimeout(sayYes,800);}
}
function heartClicked(){
    var h=document.getElementById('cssHeart');
    if(!h.classList.contains('show'))return;
    h.style.animation='none';h.style.transform='translate(-50%,-50%) scale(3)';h.style.opacity='0';
    setTimeout(function(){go(2);},700);
}
function selectGift(n){go([3,4,5][n-1]);}

// Video Fullscreen Controls
function openFs(){
    vid = document.getElementById('vidPreview');
    if(!vid||!vid.src)return;
    var ov=document.getElementById('fsOverlay'),fp=document.getElementById('fsVideo');
    fp.src=vid.src;fp.currentTime=vid.currentTime;fp.muted=vid.muted;
    if(!vid.paused)fp.play().catch(function(){});
    ov.classList.add('active');
}
function closeFs(){
    var ov=document.getElementById('fsOverlay'),fp=document.getElementById('fsVideo');
    vid = document.getElementById('vidPreview');
    if(vid){vid.currentTime=fp.currentTime;vid.muted=fp.muted;if(!fp.paused)vid.play().catch(function(){});else vid.pause();}
    fp.pause();fp.src='';ov.classList.remove('active');
}

// Init gift cards
setTimeout(function(){document.querySelectorAll('.gift-card').forEach(function(c){c.style.opacity='1';c.style.transform='translateY(0)';});},500);