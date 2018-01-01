export default generateHtmlString;

function generateHtmlString(sheets, className) {
  let html = '';
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    const classAttr = className ? ` class="${className}"` : '';
    const mediaAttr = sheet.media ? ` media="${sheet.media}"` : '';
    html += `<style${classAttr}${mediaAttr}>${sheet.css}</style>`;
  }
  return html;
}
