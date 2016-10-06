module.exports = generateHtmlString;

function generateHtmlString(sheets) {
  let html = '';
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const mediaAttr = sheet.media ? ` media="${sheet.media}"` : '';
    html += `<style class="styletron"${mediaAttr}>${sheet.css}</style>`;
  }
  return html;
}
