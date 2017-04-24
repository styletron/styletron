export default generateHtmlString;

function generateHtmlString(sheets, className) {
  let html = '';
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const mediaAttr = sheet.media ? ` media="${sheet.media}"` : '';
    html += `<style class="${className}"${mediaAttr}>${sheet.css}</style>`;
  }
  return html;
}
