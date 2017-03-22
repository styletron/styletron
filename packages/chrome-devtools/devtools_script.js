const {panels, inspectedWindow} = window.chrome.devtools;
const elementsPanel = panels.elements; 

elementsPanel.createSidebarPane('Styletron', (sidebar) => {
  elementsPanel.onSelectionChanged.addListener(() => {
    inspectedWindow.eval("__STYLETRON_DEVTOOLS__.getStyles($0)", (res, err) => {
      if (res) {
        sidebar.setObject(res, 'Styletron Styles')
      } else {
        sidebar.setObject(null, 'Not a styled element');
      }
    });
  });
});
