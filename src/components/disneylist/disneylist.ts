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
                
            }
            const response = await getCharacterFromDisneyApi();
            if(this.shadowRoot){
                this.shadowRoot.innerHTML=`
                <style>
            .characters-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 20px;
            }
            
            .character-card {
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
              cursor: pointer;
              transition: transform 0.2s;
            }
            
            .character-card:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
        
      }
    }
  }
}

export default Disneylist
                
    
    


  
  
  
  
      
      
      
      
        
        
       