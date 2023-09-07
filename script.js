const section=document.querySelector("section");
const PlayersLivescount=document.querySelector("span");
var Playerlive=8;

//link PlayersLivesCount with Playerlive

PlayersLivescount.textContent=Playerlive;

// now the 4*4 matrix with sixteen cards of  8 pairs data set
const getData=() =>[
    {imgSrc:"./images/beatles.jpeg",name:"beatles"},
    {imgSrc:"./images/blink182.jpeg",name:"blink182"},
    {imgSrc:"./images/fkatwigs.jpeg",name:'fkatwigs'},
    {imgSrc:"./images/fleetwood.jpeg",name:"fleetwood"},
    {imgSrc:"./images/joy-division.jpeg",name:"joy-division"},
    {imgSrc:"./images/ledzep.jpeg",name:"ledzep.jpeg"},
    {imgSrc:"./images/metallica.jpeg",name:"metallica"},
    {imgSrc:"./images/pinkfloyd.jpeg",name:"pinkfloyd"},
    {imgSrc:"./images/beatles.jpeg",name:"beatles"},
    {imgSrc:"./images/blink182.jpeg",name:"blink182"},
    {imgSrc:"./images/fkatwigs.jpeg",name:'fkatwigs'},
    {imgSrc:"./images/fleetwood.jpeg",name:"fleetwood"},
    {imgSrc:"./images/joy-division.jpeg",name:"joy-division"},
    {imgSrc:"./images/ledzep.jpeg",name:"ledzep.jpeg"},
    {imgSrc:"./images/metallica.jpeg",name:"metallica"},
    {imgSrc:"./images/pinkfloyd.jpeg",name:"pinkfloyd"}
];

//Maybe lvl 1
//const randomize=()=>{
//    const carddata=getData();
//    carddata.sort(() => Math.random() - 0.5);
//    console.log(carddata);
//}

//now function to randomize the cards
const randomize = () => {
    const carddata = getData();
    for (let i = carddata.length - 1; i > 0; i--) {            // i iterates in reverse order of cardData
        const j = Math.floor(Math.random() * (i + 1));        // j generates from 0 to i, using Math.random index 'j' is used to swap.
        [carddata[i], carddata[j]] = [carddata[j], carddata[i]]; // Swap elements
    }
    return carddata;
};
//This is also known as Fisher-Yates shuffle algorithm 
const CardGenerator = () => {
    const cardData = randomize(); 
    cardData.forEach((item) => {   //for 16cards
    //generate HTML for the cards
    const card=document.createElement("div");
    const face=document.createElement("img");  //face of the card
    const back=document.createElement("div");  //back of the card
    //add class to the elements
    card.classList="card";
    face.classList="face";
    back.classList="back";
    //Attach image to the face of the cards and get names of card to match
    face.src=item.imgSrc;
    card.setAttribute('name',item.name);
    //Attach cards to the section with face and back 
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click',(e) =>{
        card.classList.toggle('togglecard');  //toggle card for animation
        Checkcards(e);
    });
    });
};

//Check the cards
const Checkcards = (e) =>{
    console.log(e);
    const clickedcard=e.target;
    clickedcard.classList.add("flipped");   // fipped card is to check the matching cards
    const flippedcards=document.querySelectorAll(".flipped");
    const togglecard=document.querySelectorAll('.togglecard');
    //LOGIC TO CHECK
    if (flippedcards.length===2){
        if(flippedcards[0].getAttribute('name')===flippedcards[1].getAttribute('name')){
            console.log("match");
            flippedcards.forEach((card) =>{
                card.classList.remove("flipped");
                card.style.pointerEvents='none'; // we are making it unclickable once it is matched
            });
        }
        else{
            console.log("wrong");
            flippedcards.forEach((card) =>{
                card.classList.remove("flipped");
                setTimeout(()=> card.classList.remove("togglecard"),1000);
            });
            Playerlive--;
            PlayersLivescount.textContent=Playerlive;
            if (Playerlive===0){
                restart("TRY AGAIN");
            }
        }
    }
    if(togglecard.length===16){
        restart("YOU WON")
    }

};
//restart
const restart = (text)=>{
    let cardData = randomize();
    let faces=document.querySelectorAll(".face");
    let cards=document.querySelectorAll(".card");
    section.style.pointerEvents='none';  // thus usr can't click anything until everything is flipped(restarted)
    cardData.forEach((item,index) =>{
        cards[index].classList.remove('togglecard');
        //Randomize
        setTimeout(()=>{                                // to minimize the delay . 
            cards[index].style.pointerEvents="all";
            faces[index].src=item.imgSrc;
            cards[index].setAttribute("name",item.name);
            section.style.pointerEvents='all';  
        },1000);

        
    });
    Playerlive=8;
    PlayersLivescount.textContent=Playerlive;
    setTimeout(() =>window.alert(text),100);
}

CardGenerator();
//randomize();




