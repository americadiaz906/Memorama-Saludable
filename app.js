/**
 * ==========================================================================
 * LÓGICA DEL JUEGO: MEMORAMA DE ALIMENTOS SALUDABLES
 * Con audio interactivo (Web Audio API) y voz educativa (SpeechSynthesis)
 * ==========================================================================
 */

// Base de Datos de Alimentos Saludables
const FOODS_DATABASE = [
  {
    id: 'manzana',
    name: 'Manzana',
    benefit: 'Cuida tus dientes y te da mucha energía.',
    tip: '¡Manzana! Cuida tus dientes y es muy crujiente y deliciosa.',
    bgColor: '#FFF0F0',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M50 25 C50 15, 60 10, 65 15 C65 20, 55 25, 50 25" fill="#4CD137" />
      <path d="M50 28 L50 20" stroke="#8B5A2B" stroke-width="4" stroke-linecap="round" />
      <path d="M50 30 C30 30, 20 40, 20 58 C20 75, 38 88, 50 85 C62 88, 80 75, 80 58 C80 40, 70 30, 50 30 Z" fill="#FF4757" />
      <circle cx="40" cy="55" r="4" fill="#2F3542" />
      <circle cx="60" cy="55" r="4" fill="#2F3542" />
      <circle cx="38.5" cy="53.5" r="1.2" fill="#FFFFFF" />
      <circle cx="58.5" cy="53.5" r="1.2" fill="#FFFFFF" />
      <ellipse cx="33" cy="61" rx="4.5" ry="2.5" fill="#FF8A9A" />
      <ellipse cx="67" cy="61" rx="4.5" ry="2.5" fill="#FF8A9A" />
      <path d="M 47 62 Q 50 67 53 62" fill="none" stroke="#2F3542" stroke-width="2.5" stroke-linecap="round" />
      <ellipse cx="30" cy="42" rx="4" ry="8" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 30 42)" />
    </svg>`
  },
  {
    id: 'platano',
    name: 'Plátano',
    benefit: 'Tiene potasio y te da súper fuerza para correr.',
    tip: '¡Plátano! Tiene potasio y te da súper fuerza para jugar.',
    bgColor: '#FFFFE5',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M25 35 C45 30, 75 45, 75 75 C60 75, 40 65, 25 35" fill="#FFEB3B" />
      <path d="M24 33 C45 28, 77 43, 77 75" fill="none" stroke="#FBC02D" stroke-width="2" stroke-linecap="round" />
      <path d="M25 35 L22 30" stroke="#795548" stroke-width="4" stroke-linecap="round" />
      <path d="M75 75 L78 79" stroke="#795548" stroke-width="5" stroke-linecap="round" />
      <circle cx="45" cy="53" r="3.5" fill="#2F3542" />
      <circle cx="59" cy="57" r="3.5" fill="#2F3542" />
      <circle cx="43.5" cy="51.5" r="1" fill="#FFFFFF" />
      <circle cx="57.5" cy="55.5" r="1" fill="#FFFFFF" />
      <ellipse cx="40" cy="58" rx="4" ry="2.5" fill="#FF8080" opacity="0.8" />
      <ellipse cx="63" cy="62" rx="4" ry="2.5" fill="#FF8080" opacity="0.8" />
      <path d="M 50 60 Q 52 64 54 60" fill="none" stroke="#2F3542" stroke-width="2.5" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'zanahoria',
    name: 'Zanahoria',
    benefit: 'Es muy buena para que tus ojos vean muy bien.',
    tip: '¡Zanahoria! Es fantástica para que tus ojos tengan súper vista.',
    bgColor: '#FFF5EC',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M50 25 C50 10, 42 10, 42 25 Z" fill="#4CD137" />
      <path d="M50 25 C55 10, 58 12, 53 25 Z" fill="#4CD137" />
      <path d="M50 25 C45 12, 35 15, 46 25 Z" fill="#4CD137" />
      <path d="M35 30 C42 30, 58 30, 65 30 C60 55, 53 85, 50 90 C47 85, 40 55, 35 30 Z" fill="#FF9F43" />
      <line x1="39" y1="42" x2="45" y2="42" stroke="#E67E22" stroke-width="2" stroke-linecap="round" />
      <line x1="57" y1="55" x2="62" y2="55" stroke="#E67E22" stroke-width="2" stroke-linecap="round" />
      <line x1="42" y1="68" x2="47" y2="68" stroke="#E67E22" stroke-width="2" stroke-linecap="round" />
      <circle cx="44" cy="46" r="3.5" fill="#2F3542" />
      <circle cx="56" cy="46" r="3.5" fill="#2F3542" />
      <circle cx="42.5" cy="44.5" r="1.1" fill="#FFFFFF" />
      <circle cx="54.5" cy="44.5" r="1.1" fill="#FFFFFF" />
      <ellipse cx="38" cy="51" rx="4" ry="2" fill="#FF8080" opacity="0.8" />
      <ellipse cx="62" cy="51" rx="4" ry="2" fill="#FF8080" opacity="0.8" />
      <path d="M 48 51 Q 50 55 52 51" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'brocoli',
    name: 'Brócoli',
    benefit: 'Es como un arbolito que te hace crecer fuerte.',
    tip: '¡Brócoli! Es un arbolito mágico lleno de vitaminas para crecer fuerte.',
    bgColor: '#EAF7EA',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M42 60 L42 85 C42 88, 58 88, 58 85 L58 60 Z" fill="#78E08F" />
      <path d="M50 20 C35 20, 25 30, 28 45 C18 48, 18 62, 30 65 C35 65, 65 65, 70 65 C82 62, 82 48, 72 45 C75 30, 65 20, 50 20 Z" fill="#2ED573" />
      <circle cx="42" cy="35" r="6" fill="#26AF5F" opacity="0.4" />
      <circle cx="58" cy="35" r="6" fill="#26AF5F" opacity="0.4" />
      <circle cx="65" cy="48" r="5" fill="#26AF5F" opacity="0.4" />
      <circle cx="35" cy="48" r="5" fill="#26AF5F" opacity="0.4" />
      <circle cx="43" cy="48" r="3.5" fill="#2F3542" />
      <circle cx="57" cy="48" r="3.5" fill="#2F3542" />
      <circle cx="41.5" cy="46.5" r="1" fill="#FFFFFF" />
      <circle cx="55.5" cy="46.5" r="1" fill="#FFFFFF" />
      <ellipse cx="37" cy="53" rx="4" ry="2" fill="#FF8080" opacity="0.8" />
      <ellipse cx="63" cy="53" rx="4" ry="2" fill="#FF8080" opacity="0.8" />
      <path d="M 48 53 Q 50 57 52 53" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'fresa',
    name: 'Fresa',
    benefit: 'Tiene mucha vitamina C y es dulce y deliciosa.',
    tip: '¡Fresa! Es dulce, deliciosa y protege tu cuerpo de las gripes.',
    bgColor: '#FFF0F3',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M50 28 C45 28, 30 20, 32 12 C35 12, 45 22, 50 26 C55 22, 65 12, 68 12 C70 20, 55 28, 50 28 Z" fill="#2ED573" />
      <path d="M50 28 C50 18, 50 10, 50 10" stroke="#2ED573" stroke-width="3" stroke-linecap="round" />
      <path d="M50 26 C30 26, 22 42, 25 60 C28 78, 45 92, 50 92 C55 92, 72 78, 75 60 C78 42, 70 26, 50 26 Z" fill="#FF4757" />
      <circle cx="32" cy="45" r="1.5" fill="#FED330" />
      <circle cx="68" cy="45" r="1.5" fill="#FED330" />
      <circle cx="40" cy="65" r="1.5" fill="#FED330" />
      <circle cx="60" cy="65" r="1.5" fill="#FED330" />
      <circle cx="50" cy="78" r="1.5" fill="#FED330" />
      <circle cx="34" cy="60" r="1.5" fill="#FED330" />
      <circle cx="66" cy="60" r="1.5" fill="#FED330" />
      <circle cx="43" cy="50" r="3.5" fill="#2F3542" />
      <circle cx="57" cy="50" r="3.5" fill="#2F3542" />
      <circle cx="41.5" cy="48.5" r="1.1" fill="#FFFFFF" />
      <circle cx="55.5" cy="48.5" r="1.1" fill="#FFFFFF" />
      <ellipse cx="37" cy="55" rx="4" ry="2" fill="#FF7080" opacity="0.8" />
      <ellipse cx="63" cy="55" rx="4" ry="2" fill="#FF7080" opacity="0.8" />
      <path d="M 48 55 Q 50 59 52 55" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'pescado',
    name: 'Pescado',
    benefit: 'Ayuda a tu cerebro a pensar rápido e inteligente.',
    tip: '¡Pescado! Tiene omega tres y ayuda a tu cerebro a pensar rápido.',
    bgColor: '#F0F8FF',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M70 50 L85 35 C88 38, 88 62, 85 65 Z" fill="#70A1FF" />
      <path d="M15 50 C25 30, 65 30, 75 50 C65 70, 25 70, 15 50 Z" fill="#1E90FF" />
      <path d="M45 60 C48 68, 55 68, 52 60" fill="#70A1FF" />
      <path d="M50 38 C52 30, 58 30, 56 38" fill="#70A1FF" />
      <circle cx="30" cy="48" r="4.5" fill="#2F3542" />
      <circle cx="28.5" cy="46" r="1.3" fill="#FFFFFF" />
      <ellipse cx="30" cy="55" rx="4" ry="2.2" fill="#FF8080" opacity="0.8" />
      <path d="M 22 53 Q 24 57 26 53" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'leche',
    name: 'Leche',
    benefit: 'Tiene mucho calcio para que tus huesos sean muy fuertes.',
    tip: '¡Leche! Tiene calcio para fortalecer tus huesos y dientes.',
    bgColor: '#F5F6FA',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M30 35 L50 20 L70 35 Z" fill="#A4B0BE" />
      <path d="M50 20 L50 35" stroke="#747D8C" stroke-width="2" />
      <rect x="30" y="35" width="40" height="48" rx="2" fill="#F1F2F6" stroke="#A4B0BE" stroke-width="3" />
      <rect x="30" y="48" width="40" height="12" fill="#70A1FF" />
      <path d="M50 50 C48 50, 46 54, 50 58 C54 54, 52 50, 50 50" fill="#FFFFFF" />
      <circle cx="43" cy="68" r="3.5" fill="#2F3542" />
      <circle cx="57" cy="68" r="3.5" fill="#2F3542" />
      <circle cx="41.5" cy="66.2" r="1" fill="#FFFFFF" />
      <circle cx="55.5" cy="66.2" r="1" fill="#FFFFFF" />
      <ellipse cx="37" cy="73" rx="3.5" ry="1.8" fill="#FF8080" opacity="0.8" />
      <ellipse cx="63" cy="73" rx="3.5" ry="1.8" fill="#FF8080" opacity="0.8" />
      <path d="M 48 73 Q 50 77 52 73" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  },
  {
    id: 'huevo',
    name: 'Huevo',
    benefit: 'Te da proteínas para tener músculos súper fuertes.',
    tip: '¡Huevo! Contiene súper proteínas para que tus músculos crezcan sanos.',
    bgColor: '#FFFBF0',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M50 15 C72 15, 85 28, 85 50 C85 72, 68 85, 50 85 C28 85, 15 68, 15 50 C15 28, 28 15, 50 15 Z" fill="#F1F2F6" stroke="#CED6E0" stroke-width="3" />
      <circle cx="50" cy="50" r="22" fill="#FFA502" />
      <circle cx="44" cy="40" r="3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="44" cy="50" r="3.5" fill="#2F3542" />
      <circle cx="56" cy="50" r="3.5" fill="#2F3542" />
      <circle cx="42.5" cy="48" r="1" fill="#FFFFFF" />
      <circle cx="54.5" cy="48" r="1" fill="#FFFFFF" />
      <ellipse cx="38" cy="55" rx="3.5" ry="1.8" fill="#FF4757" opacity="0.8" />
      <ellipse cx="62" cy="55" rx="3.5" ry="1.8" fill="#FF4757" opacity="0.8" />
      <path d="M 48 55 Q 50 59 52 55" fill="none" stroke="#2F3542" stroke-width="2.2" stroke-linecap="round" />
    </svg>`
  }
];

// Configuración y Estados del Juego
let currentDifficulty = 'easy'; // 'easy', 'medium', 'hard'
let gameCards = [];
let flippedCards = [];
let movesCount = 0;
let matchesCount = 0;
let totalPairs = 0;
let isChecking = false;
let isSoundEnabled = true;
let isVoiceEnabled = true;

// Contexto de Audio (Web Audio API)
let audioCtx = null;

// Inicialización de Voces para Text-to-Speech
let spanishVoice = null;
function initVoices() {
  if ('speechSynthesis' in window) {
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Buscar una voz en español, preferiblemente mexicana o española
      spanishVoice = voices.find(voice => voice.lang.startsWith('es-MX')) ||
                     voices.find(voice => voice.lang.startsWith('es-ES')) ||
                     voices.find(voice => voice.lang.startsWith('es')) ||
                     voices[0];
    };
    
    setVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
  }
}

// Iniciar Sintetizador de Efectos de Sonido
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Reproductor de Tonos Sintéticos (Web Audio)
function playTone(freqs, duration, type = 'sine', delay = 0) {
  if (!isSoundEnabled) return;
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime + delay;
  
  if (Array.isArray(freqs)) {
    // Si es un arpeggio/secuencia
    freqs.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, now + (idx * (duration / freqs.length)));
    });
  } else {
    osc.frequency.setValueAtTime(freqs, now);
  }
  
  gain.gain.setValueAtTime(0.15, now);
  // Fade out suave
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  
  osc.start(now);
  osc.stop(now + duration);
}

// Biblioteca de Sonidos
const SoundEffects = {
  flip: () => playTone(300, 0.15, 'triangle'),
  match: () => {
    // Arpegio alegre ascendente C5 - E5 - G5 - C6
    playTone([523.25, 659.25, 783.99, 1046.50], 0.4, 'sine');
  },
  error: () => {
    // Sonido triste descendente
    playTone([220, 165], 0.3, 'sawtooth');
  },
  victory: () => {
    // Fanfarria triunfal
    const now = 0;
    playTone([523.25, 659.25, 783.99], 0.3, 'sine', now);
    playTone([783.99, 1046.50, 1318.51], 0.4, 'sine', now + 0.3);
    playTone([1046.50, 1318.51, 1567.98, 2093.00], 0.8, 'sine', now + 0.7);
  }
};

// Función para Narrar con Voz Educativa (Text to Speech)
function speakTip(text) {
  if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
  
  // Cancelar narraciones anteriores para evitar encimamiento
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.lang = 'es-ES';
  utterance.rate = 0.95; // Un poco más lento para preescolar
  utterance.pitch = 1.1; // Tono ligeramente más agudo/infantil
  window.speechSynthesis.speak(utterance);
}

// Mezclador Fisher-Yates
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Iniciar Juego con Dificultad
function startNewGame(difficulty = currentDifficulty) {
  currentDifficulty = difficulty;
  flippedCards = [];
  movesCount = 0;
  matchesCount = 0;
  isChecking = false;
  
  // Actualizar UI de botones
  document.querySelectorAll('.btn-diff').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${difficulty}`).classList.add('active');
  
  // Ocultar modal de victoria
  document.getElementById('victory-modal').classList.remove('active');
  
  // Determinar cantidad de parejas
  if (difficulty === 'easy') {
    totalPairs = 4;
  } else if (difficulty === 'medium') {
    totalPairs = 6;
  } else {
    totalPairs = 8;
  }
  
  // Elegir alimentos aleatorios de la base de datos
  const shuffledDb = shuffle([...FOODS_DATABASE]);
  const selectedFoods = shuffledDb.slice(0, totalPairs);
  
  // Duplicar alimentos para hacer parejas y mezclarlos
  const deck = [...selectedFoods, ...selectedFoods].map((food, idx) => ({
    ...food,
    uniqueId: idx
  }));
  gameCards = shuffle(deck);
  
  // Actualizar Marcadores
  updateStats();
  
  // Renderizar Tablero
  renderBoard();
}

// Actualizar Estadísticas e Indicador de Estrellas
function updateStats() {
  document.getElementById('matches-counter').textContent = `${matchesCount} / ${totalPairs}`;
  document.getElementById('moves-counter').textContent = movesCount;
  
  // Cálculo de estrellas
  const starsContainer = document.getElementById('stars-container');
  starsContainer.innerHTML = '';
  
  const stars = calculateStars();
  for (let i = 0; i < 3; i++) {
    const starSpan = document.createElement('span');
    starSpan.className = `star ${i < stars ? 'active' : ''}`;
    starSpan.textContent = '★';
    starsContainer.appendChild(starSpan);
  }
}

// Calcular Estrellas según Intentos
function calculateStars() {
  const minPossibleMoves = totalPairs;
  if (movesCount <= minPossibleMoves + 1) return 3;
  if (movesCount <= minPossibleMoves + Math.ceil(totalPairs * 0.8)) return 2;
  return 1;
}

// Renderizar el Tablero de Cartas
function renderBoard() {
  const board = document.getElementById('game-board');
  board.className = `game-board ${currentDifficulty}`;
  board.innerHTML = '';
  
  gameCards.forEach(cardData => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-item';
    cardElement.setAttribute('tabindex', '0');
    cardElement.setAttribute('role', 'button');
    cardElement.dataset.food = cardData.id;
    cardElement.dataset.uniqueId = cardData.uniqueId;
    cardElement.setAttribute('aria-label', 'Carta tapada');
    
    // Front face (Frente: Imagen y Nombre del Alimento)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-face card-front';
    cardFront.style.backgroundColor = cardData.bgColor;
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image-container';
    imageContainer.innerHTML = cardData.svg;
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = cardData.name;
    
    cardFront.appendChild(imageContainer);
    cardFront.appendChild(title);
    
    // Back face (Dorso)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-face card-back';
    
    const designDiv = document.createElement('div');
    designDiv.className = 'card-back-design';
    
    const pattern = document.createElement('span');
    pattern.className = 'card-back-pattern';
    pattern.textContent = '⭐';
    
    const hint = document.createElement('span');
    hint.className = 'card-back-hint';
    hint.textContent = '?';
    
    designDiv.appendChild(pattern);
    designDiv.appendChild(hint);
    cardBack.appendChild(designDiv);
    
    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);
    
    // Evento Click
    cardElement.addEventListener('click', () => handleCardClick(cardElement, cardData));
    
    // Evento Teclado para accesibilidad
    cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(cardElement, cardData);
      }
    });
    
    board.appendChild(cardElement);
  });
}

// Manejo del Clic en una Carta
function handleCardClick(cardElement, cardData) {
  // Ignorar si está bloqueado, si ya se volteó la misma carta, o si ya está emparejada
  if (isChecking || 
      cardElement.classList.contains('flipped') || 
      cardElement.classList.contains('matched')) {
    return;
  }
  
  // Activar audio al voltear
  SoundEffects.flip();
  
  // Voltear carta
  cardElement.classList.add('flipped');
  cardElement.setAttribute('aria-label', `Alimento saludable: ${cardData.name}`);
  flippedCards.push({ element: cardElement, data: cardData });
  
  if (flippedCards.length === 2) {
    isChecking = true;
    movesCount++;
    
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    if (card1.data.id === card2.data.id) {
      // ¡ES UNA PAREJA!
      matchesCount++;
      updateStats();
      
      // Marcar como resueltas
      card1.element.classList.add('matched');
      card2.element.classList.add('matched');
      
      // Anunciar acierto de sonido
      setTimeout(() => {
        SoundEffects.match();
        speakTip(card1.data.tip);
      }, 300);
      
      // Vaciar array
      flippedCards = [];
      isChecking = false;
      
      // Verificar Victoria
      if (matchesCount === totalPairs) {
        setTimeout(celebrateVictory, 1200);
      }
    } else {
      // NO ES PAREJA
      card1.element.classList.add('mismatched');
      card2.element.classList.add('mismatched');
      
      setTimeout(() => {
        SoundEffects.error();
      }, 300);
      
      // Voltear de vuelta tras retraso
      setTimeout(() => {
        card1.element.classList.remove('flipped', 'mismatched');
        card2.element.classList.remove('flipped', 'mismatched');
        card1.element.setAttribute('aria-label', 'Carta tapada');
        card2.element.setAttribute('aria-label', 'Carta tapada');
        
        flippedCards = [];
        isChecking = false;
      }, 1300);
    }
  }
}

// Celebración de Victoria
function celebrateVictory() {
  SoundEffects.victory();
  
  const modal = document.getElementById('victory-modal');
  modal.classList.add('active');
  
  // Cargar estrellas ganadas
  const victoryStars = document.getElementById('victory-stars');
  victoryStars.innerHTML = '';
  const stars = calculateStars();
  
  for (let i = 0; i < 3; i++) {
    const starSpan = document.createElement('span');
    starSpan.className = `star ${i < stars ? 'active' : ''}`;
    starSpan.textContent = '★';
    // Animación de entrada escalonada para las estrellas del modal
    starSpan.style.animation = `cardScaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both ${i * 0.2}s`;
    victoryStars.appendChild(starSpan);
  }
  
  // Personalizar el mensaje según estrellas
  const victoryMsg = document.getElementById('victory-message');
  if (stars === 3) {
    victoryMsg.textContent = '¡FANTÁSTICO! Tienes súper memoria y sabes mucho de comida sana. 🌟🥦';
  } else if (stars === 2) {
    victoryMsg.textContent = '¡MUY BIEN! Eres muy inteligente. ¡Sigue comiendo frutas y verduras! 🍇🥕';
  } else {
    victoryMsg.textContent = '¡EXCELENTE TRABAJO! ¡Lo lograste! Intenta de nuevo para ganar más estrellas. 💪🍳';
  }
  
  // Lanzar confeti virtual
  triggerConfetti();
  
  // Narrar victoria
  setTimeout(() => {
    speakTip(`¡Felicidades! Lograste encontrar todas las parejas en ${movesCount} intentos.`);
  }, 500);
}

// Sistema de Confeti Virtual
function triggerConfetti() {
  const container = document.body;
  const colors = ['#FF6B81', '#4CD137', '#FFC312', '#1E90FF', '#FF8C00', '#D2527F'];
  
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    
    // Posición y tamaño aleatorios
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.width = `${Math.random() * 8 + 8}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Animación personalizada
    const duration = Math.random() * 2 + 2;
    confetti.style.animation = `fallDown ${duration}s linear forwards`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(confetti);
    
    // Limpiar confeti del DOM
    setTimeout(() => {
      confetti.remove();
    }, (duration + 2) * 1000);
  }
}

// Cargar Guía Educativa al Pie de Página
function loadEducationalGuide() {
  const catalog = document.getElementById('foods-catalog');
  catalog.innerHTML = '';
  
  FOODS_DATABASE.forEach(food => {
    const item = document.createElement('div');
    item.className = 'catalog-item';
    
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'catalog-icon-wrapper';
    iconWrapper.innerHTML = food.svg;
    
    const info = document.createElement('div');
    info.className = 'catalog-info';
    
    const name = document.createElement('div');
    name.className = 'catalog-name';
    name.textContent = food.name;
    
    const benefit = document.createElement('div');
    benefit.className = 'catalog-benefit';
    benefit.textContent = food.benefit;
    
    info.appendChild(name);
    info.appendChild(benefit);
    
    item.appendChild(iconWrapper);
    item.appendChild(info);
    
    catalog.appendChild(item);
  });
}

// Configurar Escuchadores de Eventos del DOM
function setupEventListeners() {
  // Dificultades
  document.getElementById('btn-easy').addEventListener('click', () => startNewGame('easy'));
  document.getElementById('btn-medium').addEventListener('click', () => startNewGame('medium'));
  document.getElementById('btn-hard').addEventListener('click', () => startNewGame('hard'));
  
  // Reiniciar
  document.getElementById('btn-restart').addEventListener('click', () => startNewGame());
  
  // Activar/Desactivar Sonido
  const btnSound = document.getElementById('toggle-sound');
  btnSound.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    btnSound.classList.toggle('muted', !isSoundEnabled);
    document.getElementById('sound-icon').textContent = isSoundEnabled ? '🔊' : '🔇';
    
    // Si se activa, inicializar el contexto de audio
    if (isSoundEnabled) initAudio();
  });
  
  // Activar/Desactivar Voz (Text to Speech)
  const btnVoice = document.getElementById('toggle-voice');
  btnVoice.addEventListener('click', () => {
    isVoiceEnabled = !isVoiceEnabled;
    btnVoice.classList.toggle('muted', !isVoiceEnabled);
    document.getElementById('voice-icon').textContent = isVoiceEnabled ? '🗣️' : '🔇';
    
    // Silenciar si se desactiva
    if (!isVoiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });
  
  // Colapsar/Expandir Guía Educativa
  const guideToggle = document.getElementById('guide-toggle');
  const guideContainer = document.querySelector('.educational-guide');
  guideToggle.addEventListener('click', () => {
    guideContainer.classList.toggle('collapsed');
  });
  
  // Por defecto, iniciar la guía colapsada en móviles y abierta en pantallas grandes
  if (window.innerWidth < 600) {
    guideContainer.classList.add('collapsed');
  }
}

// Ejecución al Cargar la Página
window.addEventListener('DOMContentLoaded', () => {
  initVoices();
  setupEventListeners();
  loadEducationalGuide();
  startNewGame();
});
