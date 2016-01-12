var SAMPLE_SPREADSHEET_ID = "1HDhnWcvu9TtGVaaxLb__tGRQIhmNEDDww9IvICYISr8";

var sampleSpreadSheet;
var sampleSpreadSheetName;
var rootFolder;

function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Show Sidebar', 'showSidebar').addToUi();
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

function getRootFolder() {
  if(rootFolder) {
    return rootFolder;
  }
  rootFolder = DriveApp.getRootFolder();
  return rootFolder;
}

function getSampleSpreadSheet() {
  if(sampleSpreadSheet) {
    return sampleSpreadSheet;
  }
  sampleSpreadSheet = DriveApp.getFileById(SAMPLE_SPREADSHEET_ID);
  return sampleSpreadSheet;
}

function getSampleSpreadSheetName() {
  if(sampleSpreadSheetName) {
    return sampleSpreadSheetName;
  }
  sampleSpreadSheet = getSampleSpreadSheet();
  sampleSpreadName = sampleSpreadSheet.getName();
  return sampleSpreadName;
}

function getSampleSpreadSheetInfo() {
  var json = [
               {"isExists":isSampleSpreadSheetExistsInRootFolder(),
                "isIn":isInSampleSpreadSheet()}
             ]
  return JSON.stringify(json);
}

function isInSampleSpreadSheet() {
  return (getSampleSpreadSheetName() == SpreadsheetApp.getActiveSpreadsheet().getName());
}

function isSampleSpreadSheetExistsInRootFolder() {
  var sheetName = getSampleSpreadSheetName();
  var folder = getRootFolder();
  if(folder.getFilesByName(sheetName).hasNext()) { // check if already exists
    return folder.getFilesByName(sheetName).next().getUrl();
  }
  return false;
}

function loadSampleSheet() {
  var url = isSampleSpreadSheetExistsInRootFolder();
  if(url) {
    return url;
  }
  var sheet = getSampleSpreadSheet();
  var sheetName = getSampleSpreadSheetName();
  var folder = getRootFolder();
  return sheet.makeCopy(sheetName, folder).getUrl();
}
