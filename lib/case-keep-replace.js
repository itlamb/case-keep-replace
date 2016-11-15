'use babel';

import CaseKeepReplaceView from './case-keep-replace-view';
import { CompositeDisposable } from 'atom';

export default {

  caseKeepReplaceView: null,
  subscriptions: null,

  activate(state) {
    this.caseKeepReplaceView = new CaseKeepReplaceView(state.caseKeepReplaceViewState);
    this.bottomPanel = atom.workspace.addBottomPanel({
      item: this.caseKeepReplaceView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'case-keep-replace:toggle': () => this.toggle(),
      'core:cancel': () => this.close()
    }));
  },

  deactivate() {
    this.bottomPanel.destroy();
    this.subscriptions.dispose();
    this.caseKeepReplaceView.destroy();
  },

  serialize() {
    return {
      caseKeepReplaceViewState: this.caseKeepReplaceView.serialize()
    };
  },

  toggle() {
    return (
      this.bottomPanel.isVisible()
        ? this.bottomPanel.hide()
        : this.bottomPanel.show()
    );
  },

  close() {
    return this.bottomPanel.hide()
  }

};
