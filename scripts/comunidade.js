document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    var name = document.getElementById('nameInput').value;
    var action = document.getElementById('actionInput').value;
    var type = document.getElementById('typeSelect').value;


    var activityRecord = document.createElement('div');
    activityRecord.innerHTML = '<strong>Nome:</strong> ' + name + '<br>' +
                              '<strong>Ação:</strong> ' + action + '<br>' +
                              '<strong>Tipo de Atividade:</strong> ' + type + '<br><br>';
    document.getElementById('activityRecords').appendChild(activityRecord);

    
    document.getElementById('nameInput').value = '';
    document.getElementById('actionInput').value = '';
    document.getElementById('typeSelect').value = '';


    updatePoints(type);
  });

  function updatePoints(type) {
    //TODO: LOGICA DE PONTOS 

    var pointsDisplay = document.createElement('div');
    pointsDisplay.innerHTML = 'Tipo de Atividade: ' + type + '<br>' +
                              'Pontos Virtuais: 100'; 


    document.getElementById('activityRecords').appendChild(pointsDisplay);
  }