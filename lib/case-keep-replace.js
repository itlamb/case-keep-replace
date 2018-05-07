'use babel'
/* global atom */

import CaseKeepReplaceView from './case-keep-replace-view'
import { CompositeDisposable } from 'atom'

export default {

  caseKeepReplaceView: null,
  subscriptions: null,

  activate (state) {
    this.caseKeepReplaceView = new CaseKeepReplaceView(state.caseKeepReplaceViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.caseKeepReplaceView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'case-keep-replace:toggle': () => this.toggle(),
      'core:cancel': () => this.hide()
    }))

    this.subscriptions.add(atom.commands.add('.case-keep-replace', {
      'core:confirm': () => this.replace()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.caseKeepReplaceView.destroy()
  },

  serialize () {
    return {
      caseKeepReplaceViewState: this.caseKeepReplaceView.serialize()
    }
  },

  toggle () {
    return (
      this.modalPanel.isVisible()
        ? this.hide()
        : this.show()
    )
  },

  show () {
    this.modalPanel.show()
    this.caseKeepReplaceView.focusOnFind()
    this.caseKeepReplaceView.updatePreview()
  },

  hide () {
    this.modalPanel.hide()
  },

  replace () {
    this.caseKeepReplaceView.replace()
    this.hide()
  }
}
