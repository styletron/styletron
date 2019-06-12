/* eslint-env browser */
const {panels, inspectedWindow} = window.chrome.devtools;
const elementsPanel = panels.elements;

elementsPanel.createSidebarPane("Styletron", sidebar => {
  elementsPanel.onSelectionChanged.addListener(() => {
    inspectedWindow.eval(
      "__STYLETRON_DEVTOOLS__.getStyles($0.className)",
      (res, err) => {
        if (err && err.isError) {
          throw new Error(`Styletron devtools: ${err.description}`);
        }
        if (res) {
          sidebar.setObject(res, "Styletron Styles");
        } else {
          sidebar.setObject(null, "Not a styledddd element");
        }
      },
    );
  });
});
