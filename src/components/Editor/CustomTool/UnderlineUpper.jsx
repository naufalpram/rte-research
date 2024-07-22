export default class UnderlineUpper {

    static get isInline() {
        return true;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }

    constructor({ api }) {
        this.api = api
        this.button = null;
        this._state = false;
        this.tag = 'u';
        this.class = 'under-upper';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = 'UU';
        this.button.classList.add(this.api.styles.inlineToolButton)

        return this.button;
    }

    surround(range) {
        console.log(range);
        console.log(this._state);
        if (this._state) {
            // If already applied, unwrap
            console.log('masuk');
            this.unwrap(range);
            return;
        }
        this.wrap(range)

    }

    wrap(range) {
        const selectedText = range.extractContents();

        const underline = document.createElement('span');
        underline.appendChild(selectedText);
        underline.style.textTransform = 'uppercase';
        underline.style.textDecoration = 'underline';
        underline.classList.add(this.class)

        range.insertNode(underline);
        this.api.selection.expandToTag(underline);
    }

    unwrap(range) {
        const underline = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();

        underline.remove();

        range.insertNode(text);
    }

   
    checkState() {
        console.log(this.api);
        const mark = this.api.selection.findParentTag(this.tag);
        console.log(mark);
        this._state = !!mark;
    }
}