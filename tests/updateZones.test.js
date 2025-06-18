const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load the script so that updateZones is available
describe('updateZones', () => {
  let window, document, updateZones;

  beforeEach(() => {
    const html = `
      <input id="heartRateInput" value="160" />
      <div id="zone1"></div>
      <div id="zone2"></div>
      <div id="zone3"></div>
      <div id="zone4"></div>
      <div id="zone5"></div>
    `;
    const js = fs.readFileSync(path.resolve(__dirname, '../javaScript/modelo.js'), 'utf8');
    const dom = new JSDOM(html, { runScripts: "outside-only" });
    window = dom.window;
    document = window.document;
    // Execute the script in the JSDOM context
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
    updateZones = window.updateZones;
  });

  test('calculates correct zones for heart rate 160', () => {
    document.getElementById('heartRateInput').value = 160;
    updateZones();
    expect(document.getElementById('zone1').textContent).toBe('Zona 1: até 131 bpm');
    expect(document.getElementById('zone2').textContent).toBe('Zona 2: 133 até 142 bpm');
    expect(document.getElementById('zone3').textContent).toBe('Zona 3: 144 até 149 bpm');
    expect(document.getElementById('zone4').textContent).toBe('Zona 4: 150 até 168 bpm');
    expect(document.getElementById('zone5').textContent).toBe('Zona 5: 170 bpm acima');
  });
  test('calculates correct zones for heart rate 200', () => {
    document.getElementById('heartRateInput').value = 200;
    updateZones();
    expect(document.getElementById('zone1').textContent).toBe('Zona 1: até 164 bpm');
    expect(document.getElementById('zone2').textContent).toBe('Zona 2: 166 até 178 bpm');
    expect(document.getElementById('zone3').textContent).toBe('Zona 3: 180 até 186 bpm');
    expect(document.getElementById('zone4').textContent).toBe('Zona 4: 188 até 210 bpm');
    expect(document.getElementById('zone5').textContent).toBe('Zona 5: 212 bpm acima');
  });
});
