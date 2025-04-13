class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML= `
            <h1>Mi header</h1>
            `
        }
    }

}
export default Header;