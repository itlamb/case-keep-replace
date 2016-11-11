'use babel';

export default class CaseKeepReplaceView {
  constructor(serializedState) {
    this.state = serializedState || {
      findText: '',
      replaceText: '',
    }

    // Binding
    this.handleFindInputChange = this.handleFindInputChange.bind(this)
    this.handleReplaceInputChange = this.handleReplaceInputChange.bind(this)
    this.setFindText = this.setFindText.bind(this)
    this.setReplaceText = this.setReplaceText.bind(this)
    this.replace = this.replace.bind(this)

    // Create root element
    this.element = document.createElement('atom-panel')
    this.element.classList.add('padded')
    this.element.classList.add('case-keep-replace')

    // Create children
    this.element.appendChild(this.createHeader())
    // this.element.appendChild(this.createDescription())
    this.element.appendChild(this.createForm())
  }

  createHeader() {
    const header = document.createElement('h3')
    header.textContent = 'Find and replace with original case'

    return header
  }

  createDescription() {
    const description = document.createElement('p')
    description.textContent = 'Package dla Mareczka'

    return description
  }

  createForm() {
    const findInput = document.createElement('input')
    findInput.id = 'input-find'
    findInput.classList.add('input-text')
    findInput.classList.add('inline-block')
    findInput.classList.add('native-key-bindings')
    findInput.addEventListener('change', this.handleFindInputChange)

    const replaceInput = document.createElement('input')
    replaceInput.id = 'input-replace'
    replaceInput.classList.add('input-text')
    replaceInput.classList.add('inline-block')
    replaceInput.classList.add('native-key-bindings')
    replaceInput.addEventListener('change', this.handleReplaceInputChange)

    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('inline-block')
    button.textContent = 'Replace'
    button.addEventListener('click', this.replace)

    const form = document.createElement('div')
    form.classList.add('block')
    form.appendChild(findInput)
    form.appendChild(replaceInput)
    form.appendChild(button)

    return form
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  setFindText(text) {
    this.state.findText = text
  }

  getFindText() {
    return this.state.findText
  }

  setReplaceText(text) {
    this.state.replaceText = text
  }

  getReplaceText() {
    return this.state.replaceText
  }

  handleFindInputChange(e) {
    this.setFindText(e.target.value)
  }

  handleReplaceInputChange(e) {
    this.setReplaceText(e.target.value)
  }

  getElement() {
    return this.element;
  }

  replaceVarsNames(buffer) {
    const findText = this.getFindText()
    const replaceText = this.getReplaceText()
    buffer.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceClassesNames(buffer) {
    const findText = this.getFindText().charAt(0).toUpperCase() + this.getFindText().slice(1)
    const replaceText = this.getReplaceText().charAt(0).toUpperCase() + this.getReplaceText().slice(1)
    buffer.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceConstantsNames(buffer) {
    const findText = this.getFindText().toUpperCase()
    const replaceText = this.getReplaceText().toUpperCase()
    buffer.replace(new RegExp(findText, 'g'), replaceText)
  }

  replace() {
    const editor = atom.workspace.getActiveTextEditor()
    const buffer = editor.getBuffer()

    // aaa -> bbb
    this.replaceVarsNames(buffer)

    // Aaa -> Bbb
    this.replaceClassesNames(buffer)

    // AAA -> BBB
    this.replaceConstantsNames(buffer)
  }
}
