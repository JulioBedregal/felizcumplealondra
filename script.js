
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const mensajeEl = document.getElementById('mensaje');
  const boton = document.getElementById('continuar');
  // const sound = document.getElementById('fiuu-sound');

  let w, h;
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  resize();
  window.addEventListener('resize', resize);

  // 🌟 Fondo estrellado
  const estrellas = [];
  for (let i = 0; i < 200; i++) {
    estrellas.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.5 + 0.5
    });
  }

  function dibujarEstrellas() {
    for (const estrella of estrellas) {
      ctx.beginPath();
      ctx.arc(estrella.x, estrella.y, estrella.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${estrella.o})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "white";
      ctx.fill();
    }
  }

  // 🌠 Estrella fugaz con trayectoria diagonal y estela que desaparece
  const estrella = {
    x: -100,
    y: h * 0.3,
    vx: 6,   // velocidad horizontal
    vy: -0.9,   // velocidad vertical para diagonal
    rastro: [],
    r: 6,
    activa: true,
    sonidoReproducido: false
  };

  function drawEstrellaFugaz() {
    // Actualizar posición
    estrella.x += estrella.vx;
    estrella.y += estrella.vy;

    // Guardar rastro
    estrella.rastro.push({ x: estrella.x, y: estrella.y, alpha: 1 });

    // Desvanecer rastro
    for (let p of estrella.rastro) {
      p.alpha -= 0.02;
    }
    estrella.rastro = estrella.rastro.filter(p => p.alpha > 0);

    // Dibujar rastro
    for (let p of estrella.rastro) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    }

    // Dibujar cabeza brillante
    ctx.beginPath();
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'white';
    ctx.arc(estrella.x, estrella.y, estrella.r, 0, Math.PI * 2);
    ctx.fill();

    // Sonido
    // if (!estrella.sonidoReproducido && estrella.x > w * 0.2) {
    //   sound.play();
    //   estrella.sonidoReproducido = true;
    // }

    // Fin de animación
    if (estrella.x > w + 50 || estrella.y > h + 50) {
      estrella.activa = false;
      escribirMensaje('Feliz cumpleaños ..... Alondra');
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    dibujarEstrellas();

    if (estrella.activa) {
      drawEstrellaFugaz();
      requestAnimationFrame(animate);
    }
  }

  animate();

  // ⌨️ Máquina de escribir
  function escribirMensaje(texto) {
    let i = 0;
    mensajeEl.style.opacity = 1;
    mensajeEl.innerHTML = '';
    const intervalo = setInterval(() => {
      mensajeEl.innerHTML += texto.charAt(i);
      i++;
      if (i === texto.length) {
        clearInterval(intervalo);
        setTimeout(() => {
          boton.style.opacity = 1;
        }, 1000);
      }
    }, 60);
  }


boton.addEventListener('click', () => {
    // Agrega la clase de fade-out
    canvas.classList.add('fade-out');
    mensajeEl.classList.add('fade-out');
    boton.classList.add('fade-out');

    // Espera la transición y luego oculta los elementos
    setTimeout(() => {
      canvas.style.display = 'none';
      mensajeEl.style.display = 'none';
      boton.style.display = 'none';

      // Muestra la siguiente pantalla
      document.getElementById('segundaPantalla').style.display = 'block';
    }, 1000); // tiempo de transición igual al del fade-out
  });

  document.querySelectorAll('.scene').forEach(scene => {
  scene.addEventListener('click', () => {
    scene.querySelector('.card').classList.toggle('flipped');
  });
});





  const jugarBtn = document.getElementById("jugarBtn");
  const modal = new bootstrap.Modal(document.getElementById("claveModal"));
  const validarBtn = document.getElementById("validarClaveBtn");
  const claveInput = document.getElementById("claveInput");
  const claveError = document.getElementById("claveError");
  const cartaContainer = document.getElementById("cartaContainer");
  const cartaTexto = document.getElementById("cartaTexto");

  const CLAVE_CORRECTA = "alondra"; // Cambia esto por la clave real
  // const MENSAJE = "Desde que entraste en mi vida, todo cambió para bien. Gracias por cada risa, cada aventura, cada momento que me haces sentir especial. 💖 Feliz cumpleaños, mi estrella. ✨";
  const MENSAJE = "Feliz cumpleaños .... quise hacer esto como un regalo pero no se si salio bien, espero que te guste es algo simple pero le puse mi creatividad, queria desearte lo mejor, decirte que tu puedes, que no te rindas, lucha por tus sueños, espero que algun dia alguno de mis tontos consejos te sirvan en la vida, sabes es un momento para celebrar 1 año no se cumple cualquier dia se cumple en ocasiones especiales, bueno no se que mas poner solo quiero mandarte un abrazo...me hubiera gustado conocer mas lugares contigo";

  jugarBtn.addEventListener("click", () => {
    claveInput.value = "";
    claveError.classList.add("d-none");
    modal.show();
  });

  validarBtn.addEventListener("click", () => {
    if (claveInput.value === CLAVE_CORRECTA) {
      modal.hide();
      mostrarCarta(MENSAJE);
    } else {
      claveError.classList.remove("d-none");
    }
  });

  function mostrarCarta(texto) {
    cartaContainer.style.display = "block";
    cartaTexto.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      cartaTexto.innerHTML += texto.charAt(i);
      i++;
      if (i >= texto.length) clearInterval(interval);
    }, 85);
  }

  // Botón para cerrar la carta
document.getElementById("cerrarCartaBtn").addEventListener("click", () => {
  cartaContainer.style.display = "none";
});

//CANCIONES

const music = document.getElementById("music");
const title = document.getElementById("songTitle");

const canciones = [
  {
    nombre: "Iñigo Quintero - Si No Estás",
    archivo: "audio/iñigo quintero - Si No Estás (Letra Oficial).mp3"
  },
  {
    nombre: "Grupo Frontera - No Se Va",
    archivo: "audio/Grupo Frontera - No Se Va (Letra Oficial).mp3"
  },
  {
    nombre: "Danny Ocean - Dembow",
    archivo: "audio/Danny Ocean - Dembow (Official Audio).mp3"
  },
    {
    nombre: "Pablo Alborán - Saturno",
    archivo: "audio/Pablo Alborán - Saturno (Videoclip Oficial).mp3"
  }
];

let indice = 0;
let enReproduccion = false;

function cargarCancion(i) {
  music.src = canciones[i].archivo;
  title.textContent = "Canción: " + canciones[i].nombre;
  if (enReproduccion) {
    music.play();
  }
}

function togglePlayPause() {
  if (music.paused) {
    music.play();
    enReproduccion = true;
  } else {
    music.pause();
    enReproduccion = false;
  }
}

function nextSong() {
  indice = (indice + 1) % canciones.length;
  cargarCancion(indice);
}

function prevSong() {
  indice = (indice - 1 + canciones.length) % canciones.length;
  cargarCancion(indice);
}

// Cargar la primera canción al iniciar
cargarCancion(indice);

music.addEventListener('ended', () => {
  nextSong();
});

