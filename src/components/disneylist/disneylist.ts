import getCharacterFromDisneyApi from "../../services/disneyservice";
type Character ={
    id:number;
    films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[]; 
  enemies: string[]; 
  sourceUrl: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string; 
  url: string;
  __v: number;
}
export class Disneylist extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }
    
    async connectedCallback(){
        try {
            if(this.shadowRoot){
                this.shadowRoot.innerHTML = `<p>Loading Disney characters...</p>`;
                
            }
            const response = await getCharacterFromDisneyApi();
            if(this.shadowRoot){
                this.shadowRoot.innerHTML=`
                <style>
            {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
                    
            .container {
                padding: 20px;
                background-color:rgb(0, 166, 255);
                min-height: 100vh;
                font-family: 'Montserrat', sans-serif;
            }
                    
             .characters-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 25px;
                padding: 20px 0;
            }
                    
            .character-card {
                background: linear-gradient(145deg,rgb(214, 152, 240));
                border-radius: 16px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                position: relative;
                border: none;
            }
                    
            .character-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 30px rgba(224, 0, 157, 0.15);
             }
           .character-image {
              width: 100%;
              height: 200px;
              object-fit: cover;
              border-radius: 4px;
            }
            
            h2 {
              color:rgb(224, 0, 157);
              text-align: center;
              font-family: 'Arial', sans-serif;
            }
            .view-button{
            color:rgb(194, 0, 224);
            color:black;
            border-radius:4px
            padding 8px 12px
            margin-top:10px
            cursor:pointer
            font-weight:bold
            transiton:background color 0.3s;
            }
            .view-button:hover{
            color:#ffff
            }
            .button
            
            
            
          </style>
          
          <h2>DISNEY</h2>
          
          <div class="characters-grid">
            ${response.data.map((character: Character) => `
              <div class="character-card" data-id="${character.id}">
                <img class="character-image" src="${character.imageUrl || '/placeholder.png'}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p>Films: ${character.films.length}</p>
                <p>TV Shows: ${character.tvShows.length}</p>
                <div class="button-container">
                <button class="view-button" data-id="${character.id}">Ver detalles</button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
        const cards = this.shadowRoot.querySelectorAll('.character-card');
        cards.forEach(card => {
          card.addEventListener('click', () => {
            const characterId = card.getAttribute('data-id');
           
            this.dispatchEvent(new CustomEvent('character-selected', {
              detail: { id: characterId },
              bubbles: true,
              composed: true
            }));
          });
        });
      }
    } catch (error) {
      console.error('Error loading Disney characters:', error);
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = `<p>Error loading Disney characters. Please try again later.</p>`;
        
      }
    }
  }
}

export default Disneylist
                
    
    


  
  
  
  
      
      
      
      
        
        
       