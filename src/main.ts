import './style.css'
import { setupCounter } from './counter.ts'
import { obtenerDatosSmae, buscarPorCategoria, buscarAlimento } from './promesaSmae.ts'

function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

/**
 * Crea el contenido pricipal.
 */
  const container = document.createElement('div');
  container.classList.add('container');

  /**
 * Crea el titulo de la pagina.
 */
  const title = document.createElement('h1');
  title.textContent = 'Consulta de Alimentos';
  container.appendChild(title);

  /**
 * Crea el campo para la busqueda.
 */
  const searchBox = document.createElement('div');
  searchBox.classList.add('search-box');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Ingrese lo que busca..';
  input.id = 'search-input';

  const boton = document.createElement('button');
  boton.textContent = 'Buscar';
  boton.id = 'search-button';

  searchBox.appendChild(input);
  searchBox.appendChild(boton);
  container.appendChild(searchBox);

  /**
 * Aqui se ve crear los radiobuttons para seleccionar el tipo de busqueda.
 */
  const optionsBox = document.createElement('div');
  optionsBox.classList.add('options-box');

  const optionsLabel = document.createElement('p');
  optionsLabel.textContent = 'Busqueda por tipo:';
  optionsBox.appendChild(optionsLabel);

  /**
 * Aqui todo los tipos de radiobuttons para la busqued ade 
 * todo los datos, categorias y nombre de alimento.
 * 
 */
  const buscOpc = [
    { id: 'todos', label: 'Todos los alimentos', value: 'todos' },
    { id: 'categoria', label: 'Por categoria', value: 'categoria' },
    { id: 'nombre', label: 'Por nombre', value: 'nombre' }
  ];

  buscOpc.forEach((option, index) => {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('option');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'search-type';
    radio.id = option.id;
    radio.value = option.value;
    if (index === 0) radio.checked = true;

    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.textContent = option.label;

    optionContainer.appendChild(radio);
    optionContainer.appendChild(label);
    optionsBox.appendChild(optionContainer);
  });

  container.appendChild(optionsBox);

  /**
 * Aqui se ve crear los resultados de las consultas
 */
  const resultsBox = document.createElement('div');
  resultsBox.classList.add('results-box');
  resultsBox.id = 'results';
  
  const resultsHeader = document.createElement('div');
  resultsHeader.classList.add('results-header');
  
  const resultsTitle = document.createElement('h2');
  resultsTitle.textContent = 'Resultados';
  
  /**
 * El boton para limpiar la area de los resultados y que se mantendra oculto hasta
 * que se haga una consulta se vera.
 */
  const limBoton = document.createElement('button');
  limBoton.textContent = 'Limpiar';
  limBoton.id = 'clear-button';
  limBoton.style.display = 'none';
  
  resultsHeader.appendChild(resultsTitle);
  resultsHeader.appendChild(limBoton);
  
  resultsBox.appendChild(resultsHeader);

  const resultsList = document.createElement('div');
  resultsList.id = 'results-list';
  resultsBox.appendChild(resultsList);

  container.appendChild(resultsBox);

  app.innerHTML = ''; 
  app.appendChild(container);

  /**
 * Aqui se encarga de limpiar los resultados en caso que se quiera quitar los 
 * datos que ya se consultaron.......
 */
  const clearResults = () => {
    resultsList.innerHTML = '';
    limBoton.style.display = 'none';
    input.value = '';
    input.focus();
  };
  
  
  limBoton.addEventListener('click', clearResults);


  boton.addEventListener('click', async () => {
  /**
 * Aqui se ve a configurar la busqueda y asi.
 */
    const buscInput = input.value.trim();
  /**
 * Aqui el tipo de busqueda donde ira a un try catch que tiene un switch case 
 * para la seleccion de que se va a buscar.
 */
    const tipoBusc = document.querySelector<HTMLInputElement>('input[name="search-type"]:checked')?.value;
    
    resultsList.innerHTML = '<p>CARGANDO DATOS...</p>';
    
    try {
      let results: { Alimento: string }[] = [];
    
      switch (tipoBusc) {
        case 'todos':
          results = await obtenerDatosSmae();
          break;
        case 'categoria':
          results = await buscarPorCategoria(buscInput);
          break;
        case 'nombre':
          results = await buscarAlimento(buscInput);
          break;
        default:
          results = [];
      }
      
  /**
 * Muestra los resultados.
 */
      displayResults(resultsList, results);
      
      limBoton.style.display = 'block';
    } catch (error) {
      resultsList.innerHTML = `<p class="error">Error al buscar: ${error}</p>`;
      limBoton.style.display = 'block';
    }
  });
/**
 * La funcion del boton.
 */
  const counterButton = document.querySelector<HTMLButtonElement>('#counter');
  if (counterButton) {
    setupCounter(counterButton);
  }
}

/**
 * Función para mostrar los resultados
 */
function displayResults(container: HTMLElement, results: { Alimento: string }[]) {
  container.innerHTML = '';
  
  if (results.length === 0) {
    container.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }
  
  const list = document.createElement('ul');
  
  results.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.Alimento;
    list.appendChild(listItem);
  });
  
  container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', initApp);