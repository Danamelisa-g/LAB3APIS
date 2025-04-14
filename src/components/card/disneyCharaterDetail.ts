export class DisneyCharacterDetail extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const id = this.getAttribute('character-id');
      if (!id) return;
  
      fetch(`https://api.disneyapi.dev/character/${id}`)
        .then(res => res.json())
        .then(data => {
          const character = data.data;
          this.shadowRoot!.innerHTML = `
            <div class="detail">
              <h2>${character.name}</h2>
              <img src="${character.imageUrl}" alt="${character.name}" width="200">
              <p><strong>Films:</strong> ${this.formatList(character.films)}</p>
              <p><strong>TV Shows:</strong> ${this.formatList(character.tvShows)}</p>
              <p><strong>Video Games:</strong> ${this.formatList(character.videoGames)}</p>
              <p><strong>Park Attractions:</strong> ${this.formatList(character.parkAttractions)}</p>
              <p><strong>Allies:</strong> ${this.formatList(character.allies)}</p>
              <p><strong>Enemies:</strong> ${this.formatList(character.enemies)}</p>
              <p><a href="${character.sourceUrl}" target="_blank">Source</a></p>
            </div>
          `;
        })
        .catch(error => {
          console.error('Error fetching Disney character:', error);
          this.shadowRoot!.innerHTML = `<p>Error loading character details</p>`;
        });
    }
  
    formatList(list: string[]): string {
      return list && list.length > 0 ? list.join(', ') : 'N/A';
    }
  }
  
  export default DisneyCharacterDetail