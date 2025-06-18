function updateZones() {
    const input = document.getElementById('heartRateInput');
    const heartRate = parseInt(input.value, 10);
    const warning = document.getElementById('warning');

    if (isNaN(heartRate) || heartRate < 1) {
        warning.textContent = 'Por favor, insira um valor válido.';
        document.getElementById('zone1').innerText = 'Zona 1: -';
        document.getElementById('zone2').innerText = 'Zona 2: -';
        document.getElementById('zone3').innerText = 'Zona 3: -';
        document.getElementById('zone4').innerText = 'Zona 4: -';
        document.getElementById('zone5').innerText = 'Zona 5: -';
        return;
    }

    warning.textContent = '';

    // Cálculos baseados na porcentagem da média de batimentos cardíacos
    const zone1Max = Math.round(heartRate * 0.82);
    const zone2Min = Math.round(heartRate * 0.83);
    const zone2Max = Math.round(heartRate * 0.89);
    const zone3Min = Math.round(heartRate * 0.90);
    const zone3Max = Math.round(heartRate * 0.93);
    const zone4Min = Math.round(heartRate * 0.94);
    const zone4Max = Math.round(heartRate * 1.05);
    const zone5Min = Math.round(heartRate * 1.06);

    // Atualizando os valores das zonas
    document.getElementById('zone1').innerText = `Zona 1: até ${zone1Max} bpm`;
    document.getElementById('zone2').innerText = `Zona 2: ${zone2Min} até ${zone2Max} bpm`;
    document.getElementById('zone3').innerText = `Zona 3: ${zone3Min} até ${zone3Max} bpm`;
    document.getElementById('zone4').innerText = `Zona 4: ${zone4Min} até ${zone4Max} bpm`;
    document.getElementById('zone5').innerText = `Zona 5: ${zone5Min} bpm acima`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateZones();
});

function handleHeartRateChange() {
    const input = document.getElementById('heartRateInput');
    const value = parseInt(input.value, 10);
    if (isNaN(value) || value < 1) {
        input.value = '';
    }
    updateZones();
}
