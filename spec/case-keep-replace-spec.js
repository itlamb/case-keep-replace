'use babel';

import CaseKeepReplace from '../lib/case-keep-replace';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CaseKeepReplace', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('case-keep-replace');
  });

  describe('when the case-keep-replace:toggle event is triggered', () => {
    it('hides and shows the panel', () => {
      expect(workspaceElement.querySelector('.case-keep-replace')).not.toExist();

      atom.commands.dispatch(workspaceElement, 'case-keep-replace:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.case-keep-replace')).toExist();

        let caseKeepReplaceElement = workspaceElement.querySelector('.case-keep-replace');
        expect(caseKeepReplaceElement).toExist();

        let caseKeepReplacePanel = atom.workspace.panelForItem(caseKeepReplaceElement);
        expect(caseKeepReplacePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'case-keep-replace:toggle');
        expect(caseKeepReplacePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.case-keep-replace')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'case-keep-replace:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let caseKeepReplaceElement = workspaceElement.querySelector('.case-keep-replace');
        expect(caseKeepReplaceElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'case-keep-replace:toggle');
        expect(caseKeepReplaceElement).not.toBeVisible();
      });
    });
  });
});
