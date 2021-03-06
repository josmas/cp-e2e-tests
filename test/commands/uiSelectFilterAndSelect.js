browser.addCommand('uiSelectFilterAndSelect', function (name, filterText, selectText) {
  var baseXPath = '//*[contains(@class, "ui-select-container") and @name="' + name + '"]';

  var resultPieces = selectText.split(filterText);
  var resultXpath = baseXPath + '//div[contains(@class, "ui-select-choices-row")]//a[span';
  var resultXpathPieces = [];
  for (var i = 0; i < resultPieces.length; i++) {
    if (resultPieces[i] !== '') {
      resultXpathPieces.push('text()[contains(., "' + resultPieces[i] + '")]');
    }
  }
  if (resultXpathPieces.length > 0) {
    resultXpath += '[' + resultXpathPieces.join(' and ') + ']';
  } else {
    resultXpath += '[not(text())]';
  }
  resultXpath += ' and span/span[translate(text(), "' + filterText.toUpperCase() + '", "' + filterText.toLowerCase() + '")="' + filterText.toLowerCase() + '"]]';

  browser.click('div[name="' + name + '"]')
  browser.setValue(baseXPath + '/input[contains(@class, "ui-select-search")]', filterText)
  browser.waitForVisible(resultXpath, 5000)
  browser.click(resultXpath);
});
