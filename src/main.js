import _ from 'lodash';
import "./style.css";
import "./assets/img/cursed_cat1.jpeg";
import "./assets/img/cursed_cat2.jpeg";
import "./assets/img/cursed_cat3.jpg";
import "./assets/img/cursed_cat4.jpg";
import "./assets/img/cursed_cat5.jpg";
import "./assets/img/cursed_cat6.png";

document.addEventListener('DOMContentLoaded', ()=>{
    const plateau = document.querySelector('.plateau');
    const triesCount = document.querySelector('.attempsValue');
    const foundsCount = document.querySelector('.foundsValue');
    let tries = 0;
    let founds = 0;

    triesCount.textContent = tries;
    foundsCount.textContent = founds;
  //array list des cartes
    const cardsData = () => [
        {
            name: 'cursedcat1',
            image: './assets/img/cursed_cat1.jpeg'
        },
        {
            name: 'cursedcat2',
            image: './assets/img/cursed_cat2.jpeg'
        },

        {
            name: 'cursedcat3',
            image: './assets/img/cursed_cat3.jpg'

        },
        {
            name: 'cursedcat4',
            image: './assets/img/cursed_cat4.jpg'

        },
        {
            name: 'cursedcat5',
            image: './assets/img/cursed_cat5.jpg'
        },
        {
            name: 'cursedcat6',
            image: './assets/img/cursed_cat6.png'
        },
        {
            name: 'cursedcat1',
            image: './assets/img/cursed_cat1.jpeg'
        },
        {
            name: 'cursedcat2',
            image: './assets/img/cursed_cat2.jpeg'
        },

        {
            name: 'cursedcat3',
            image: './assets/img/cursed_cat3.jpg'

        },
        {
            name: 'cursedcat4',
            image: './assets/img/cursed_cat4.jpg'

        },
        {
            name: 'cursedcat5',
            image: './assets/img/cursed_cat5.jpg'
        },
        {
            name: 'cursedcat6',
            image: './assets/img/cursed_cat6.png'
        }
    ];

    // return randomize array 
    const randomize = () => {
        const cardsList = cardsData();
        cardsList.sort(() => 0.5 - Math.random() );
        return cardsList;
    }
    
    const generateCardsList = () => {        
        const cardsList = randomize();
       
        cardsList.forEach((item)=>{
            //generer les balises html
            const card = document.createElement("div");
            card.setAttribute('draggable', false);
            const face = document.createElement("img");
            face.setAttribute('draggable', false);
            const back = document.createElement("div");
            back.setAttribute('draggable', false);

            // lister les class 
            card.classList = 'card';
            back.classList = 'back';
            face.classList = 'face';
            // attribuer les images et valeurs
            face.src = item.image;
            card.setAttribute('name', item.name);
            
            // lié les élements dans le code html
            plateau.appendChild(card);
            card.appendChild(face);
            card.appendChild(back);
            // ajouter l'evenement au click
            card.addEventListener("click", (el) =>{
                card.classList.toggle("flip");
                checkForMatch(el);
            });
        })
        console.log(cardsList);
    }

 // crée une fonction pour géré les paires 
    const checkForMatch = (el) => {
        const targetedCard = el.target;
        targetedCard.classList.add("selected")
        const selectedCards = document.querySelectorAll('.selected');
        if (selectedCards.length === 2){
            if(selectedCards[0].getAttribute('name') == selectedCards[1].getAttribute('name')){
                //incrementé le nombres de paires trouvées
                founds++;
                foundsCount.textContent = founds;

                selectedCards.forEach((card)=>{
                    card.classList.remove("selected");
                    card.style.pointerEvents = "none";
                })
                console.log('match');
            }else{
                //incrementé le nombres d'essais
                tries++;
                triesCount.textContent = tries;
               selectedCards.forEach((card)=>{
                card.classList.remove("selected");
                setTimeout(()=> card.classList.remove("flip"), 700)
               })
               
            }

            // check if all the selectedCards are matched
            if(founds === 6){
                setTimeout(() =>{
                    alert('GGs');
                }, 100)
                
            }
        }

    }

    //Restart function
    const restart = () =>{
         //reset the tries number
         tries = 0;
         triesCount.textContent = tries;
         //reset the founds number
         founds = 0;
         foundsCount.textContent = founds;
         //reset the cards
        //re melanger les cartes
        const cardsList = randomize();
        let cards = document.querySelectorAll('.card');
        let face = document.querySelectorAll('.face');
        plateau.style.pointerEvents = 'none';
     
        cardsList.forEach((item, index)=>{
            cards[index].classList.remove("flip");
            setTimeout(()=> {
                cards[index].style.pointerEvents = "auto";
                face[index].src = item.image;
                cards[index].setAttribute('name', item.name);
                plateau.style.pointerEvents = 'auto';
            }, 1000)
        })
       
    }
    // Link the button to the restart function
    var btn = document.querySelector('.restart');
    btn.addEventListener('click', restart);


    generateCardsList();
    
    
  
});