import  getCharecterFromDisneyApi from "../../services/disneyservice"
type personaje ={
    id: number;
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
  __v: number
}
class DisneyList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"})
    }
    
    async connectedCallback(){
        if(this.shadowRoot){
            const respondApi =await getCharecterFromDisneyApi();
            console.log(respondApi);
            this.shadowRoot.innerHTML= `
            <h2>DINEY LIST</h2>
            <div>
            ${respondApi.data.map((personaje:personaje) =>{
                return`<p>${personaje}</p>`
            }).join("")}
            
            </div>
            `
        }
    }
}
export default DisneyList;