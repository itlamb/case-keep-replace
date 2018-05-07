'use babel'
/* global atom */

export default class CaseKeepReplaceView {
  constructor (serializedState) {
    this.state = serializedState || {}

    // Binding
    this.updatePreview = this.updatePreview.bind(this)
    this.replace = this.replace.bind(this)
    this.replaceInBuffer = this.replaceInBuffer.bind(this)
    this.replaceInSelection = this.replaceInSelection.bind(this)

    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('case-keep-replace')

    // Create children
    this.element.appendChild(this.createHeader())
    this.element.appendChild(this.createForm())
    this.element.appendChild(this.createPreview())
  }

  createHeader () {
    const header = document.createElement('h6')
    header.textContent = 'Find and replace with original case'

    return header
  }

  createForm () {
    const findInput = document.createElement('atom-text-editor')
    findInput.id = 'input-find'
    findInput.setAttribute('mini', true)
    findInput.classList.add('input-text')
    findInput.getModel().setPlaceholderText('Find ... (camelCase)')
    findInput.tabIndex = '1'
    this.findInput = findInput.getModel()
    this.findInput.onDidChange(this.updatePreview)

    const replaceInput = document.createElement('atom-text-editor')
    replaceInput.id = 'input-replace'
    replaceInput.setAttribute('mini', true)
    replaceInput.classList.add('input-text')
    replaceInput.getModel().setPlaceholderText('Replace to ... (camelCase)')
    replaceInput.tabIndex = '2'
    this.replaceInput = replaceInput.getModel()
    this.replaceInput.onDidChange(this.updatePreview)

    const form = document.createElement('div')
    form.classList.add('block', 'form')
    form.appendChild(findInput)
    form.appendChild(replaceInput)

    return form
  }

  createPreview () {
    const previewVar = document.createElement('button')
    previewVar.id = 'preview-var'
    previewVar.classList.add('btn', 'selected', 'disabled')

    const previewClass = document.createElement('button')
    previewClass.id = 'preview-class'
    previewClass.classList.add('btn', 'selected', 'disabled')

    const previewConst = document.createElement('button')
    previewConst.id = 'preview-const'
    previewConst.classList.add('btn', 'selected', 'disabled')

    const previewUnderscoredConst = document.createElement('button')
    previewUnderscoredConst.id = 'preview-underscored-const'
    previewUnderscoredConst.classList.add('btn', 'selected', 'disabled')

    const preview = document.createElement('div')
    preview.id = 'preview'
    preview.classList.add('preview', 'btn-group')
    preview.appendChild(previewVar)
    preview.appendChild(previewClass)
    preview.appendChild(previewConst)
    preview.appendChild(previewUnderscoredConst)

    return preview
  }

  focusOnFind () {
    document.getElementById('input-find').focus()
  }

  serialize () {}

  destroy () {
    this.element.remove()
  }

  getFindText () {
    return this.findInput.getText()
  }

  getReplaceText () {
    return this.replaceInput.getText()
  }

  getOldVarName () {
    return this.getFindText()
  }

  getNewVarName () {
    return this.getReplaceText()
  }

  getOldClassName () {
    return this.getFindText().charAt(0).toUpperCase() + this.getFindText().slice(1)
  }

  getNewClassName () {
    return this.getReplaceText().charAt(0).toUpperCase() + this.getReplaceText().slice(1)
  }

  getOldConstName () {
    return this.getFindText().toUpperCase()
  }

  getNewConstName () {
    return this.getReplaceText().toUpperCase()
  }

  getOldUnderscoredConstName () {
    return this.getFindText().split(new RegExp('(?=[A-Z][a-z])', 'g')).join('_').toUpperCase()
  }

  getNewUnderscoredConstName () {
    return this.getReplaceText().split(new RegExp('(?=[A-Z][a-z])', 'g')).join('_').toUpperCase()
  }

  getElement () {
    return this.element
  }

  getPreviewElement () {
    return document.getElementById('preview')
  }

  getPreviewVarElement () {
    return document.getElementById('preview-var')
  }

  getPreviewClassElement () {
    return document.getElementById('preview-class')
  }

  getPreviewConstElement () {
    return document.getElementById('preview-const')
  }

  getPreviewUnderscoredConstElement () {
    return document.getElementById('preview-underscored-const')
  }

  updatePreview () {
    const oldVarName = this.getOldVarName() || 'oldName'
    const oldClassName = this.getOldClassName() || 'OldName'
    const oldConstName = this.getOldConstName() || 'OLDNAME'
    const oldUnderscoredConstName = this.getOldUnderscoredConstName() || 'OLD_NAME'

    const newVarName = this.getNewVarName() || 'newName'
    const newClassName = this.getNewClassName() || 'NewName'
    const newConstName = this.getNewConstName() || 'NEWNAME'
    const newUnderscoredConstName = this.getNewUnderscoredConstName() || 'NEW_NAME'

    const varReplacePreview = oldVarName + ' -> ' + newVarName
    const classReplacePreview = oldClassName + ' -> ' + newClassName
    const constReplacePreview = oldConstName + ' -> ' + newConstName
    const underscoredConstReplacePreview = oldUnderscoredConstName + ' -> ' + newUnderscoredConstName

    this.getPreviewVarElement().textContent = varReplacePreview
    this.getPreviewClassElement().textContent = classReplacePreview
    this.getPreviewConstElement().textContent = constReplacePreview
    this.getPreviewUnderscoredConstElement().textContent = underscoredConstReplacePreview
  }

  replaceVarsNames (text) {
    const findText = this.getOldVarName()
    const replaceText = this.getNewVarName()

    return text.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceClassesNames (text) {
    const findText = this.getOldClassName()
    const replaceText = this.getNewClassName()

    return text.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceConstantsNames (text) {
    const findText = this.getOldConstName()
    const replaceText = this.getNewConstName()

    return text.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceUnderscoredConstantsNames (text) {
    const findText = this.getOldUnderscoredConstName()
    const replaceText = this.getNewUnderscoredConstName()

    return text.replace(new RegExp(findText, 'g'), replaceText)
  }

  replaceInSelection () {
    const editor = atom.workspace.getActiveTextEditor()
    let selection = editor.getSelectedText()

    // aaa -> bbb
    selection = this.replaceVarsNames(selection)

    // Aaa -> Bbb
    selection = this.replaceClassesNames(selection)

    // AAA -> BBB
    selection = this.replaceConstantsNames(selection)

    // A_A -> B_B
    selection = this.replaceUnderscoredConstantsNames(selection)

    editor.insertText(selection)
  }

  replaceInBuffer () {
    const editor = atom.workspace.getActiveTextEditor()
    const buffer = editor.getBuffer()

    // aaa -> bbb
    this.replaceVarsNames(buffer)

    // Aaa -> Bbb
    this.replaceClassesNames(buffer)

    // AAA -> BBB
    this.replaceConstantsNames(buffer)

    // A_A -> B_B
    this.replaceUnderscoredConstantsNames(buffer)
  }

  replace () {
    const editor = atom.workspace.getActiveTextEditor()

    if (editor.getSelectedText().length > 0) {
      editor.transact(this.replaceInSelection)
    } else {
      editor.transact(this.replaceInBuffer)
    }
  }
}
