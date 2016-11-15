'use babel';

const previewPlaceholder = 'Insert text to see preview'

export default class CaseKeepReplaceView {
  constructor(serializedState) {
    this.state = serializedState || {
      findText: '',
      replaceText: '',
    }

    // Binding
    this.handleFindInputChange = this.handleFindInputChange.bind(this)
    this.handleReplaceInputChange = this.handleReplaceInputChange.bind(this)
    this.updatePreview = this.updatePreview.bind(this)
    this.setFindText = this.setFindText.bind(this)
    this.setReplaceText = this.setReplaceText.bind(this)
    this.replace = this.replace.bind(this)

    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('case-keep-replace')

    // Create children
    this.element.appendChild(this.createHeader())
    this.element.appendChild(this.createForm())
    this.element.appendChild(this.createPreview())
  }

  createHeader() {
    const header = document.createElement('h4')
    header.textContent = 'Find and replace with original case'

    return header
  }

  createForm() {
    const findInput = document.createElement('input')
    findInput.id = 'input-find'
    findInput.classList.add('input-text', 'inline-block', 'native-key-bindings')
    findInput.placeholder = "Find ..."
    findInput.tabIndex = "1"
    findInput.addEventListener('input', this.handleFindInputChange)

    const replaceInput = document.createElement('input')
    replaceInput.id = 'input-replace'
    replaceInput.classList.add('input-text', 'inline-block', 'native-key-bindings')
    replaceInput.placeholder = "Replace to ..."
    replaceInput.tabIndex = "2"
    replaceInput.addEventListener('input', this.handleReplaceInputChange)

    const button = document.createElement('button')
    button.classList.add('btn', 'inline-block')
    button.textContent = 'Replace'
    button.tabIndex = "3"
    button.addEventListener('click', this.replace)

    const form = document.createElement('div')
    form.classList.add('block', 'form')
    form.appendChild(findInput)
    form.appendChild(replaceInput)
    form.appendChild(button)

    return form
  }

  createPreview() {
    const preview = document.createElement('div')
    preview.id = 'preview'
    preview.classList.add('preview', 'block')
    preview.textContent = previewPlaceholder

    return preview
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

  getOldVarName() {
    return this.getFindText()
  }

  getNewVarName() {
    return this.getReplaceText()
  }

  getOldClassName() {
    return this.getFindText().charAt(0).toUpperCase() + this.getFindText().slice(1)
  }

  getNewClassName() {
    return this.getReplaceText().charAt(0).toUpperCase() + this.getReplaceText().slice(1)
  }

  getOldConstName() {
    return this.getFindText().toUpperCase()
  }

  getNewConstName() {
    return this.getReplaceText().toUpperCase()
  }

  handleFindInputChange(e) {
    this.setFindText(e.target.value)
    this.updatePreview()
  }

  handleReplaceInputChange(e) {
    this.setReplaceText(e.target.value)
    this.updatePreview()
  }

  getElement() {
    return this.element
  }

  getPreviewElement() {
    return document.getElementById('preview')
  }

  updatePreview() {
    const oldVarName = this.getOldVarName()
    const oldClassName = this.getOldClassName()
    const oldConstName = this.getOldConstName()

    const newVarName = this.getNewVarName()
    const newClassName = this.getNewClassName()
    const newConstName = this.getNewConstName()

    const previewText = this.getFindText() && this.getReplaceText()
      ? `Will change ${oldVarName} to ${newVarName}, ${oldClassName} to ${newClassName} and ${oldConstName} to ${newConstName}.`
      : previewPlaceholder

    this.getPreviewElement().textContent = previewText
  }

  replaceVarsNames(buffer) {
    const findText = this.getOldVarName()
    const replaceText = this.getNewVarName()
    buffer.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceClassesNames(buffer) {
    const findText = this.getOldClassName()
    const replaceText = this.getNewClassName()
    buffer.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceConstantsNames(buffer) {
    const findText = this.getOldConstName()
    const replaceText = this.getNewConstName()
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
