function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
};

function onInstall(e) {
  onOpen(e);
};

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('Sound Wave Player');
  SpreadsheetApp.getUi().showSidebar(ui);
};

function getActiveCell(event) {
  return JSON.stringify(SpreadsheetApp.getActiveRange().getValues());
};
