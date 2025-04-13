class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `
            <h1>root</h1>
            <div>
             <header-component></header-component>
             <disney-list></disney-list>
            </div>
            `
        }
    }

}
export default Root;