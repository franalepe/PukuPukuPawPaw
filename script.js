// Variables para CallMeBot
const callMeBotApiKey = "2105614";
const callMeBotPhone = "584126615015";

// Función para enviar mensajes por WhatsApp
function enviarMensajeWhatsApp(mensaje) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${callMeBotPhone}&text=${encodeURIComponent(mensaje)}&apikey=${callMeBotApiKey}`;
  fetch(url)
    .then(response => console.log("Mensaje enviado:", mensaje))
    .catch(error => console.error("Error enviando mensaje:", error));
}

// Ventana emergente al entrar
window.onload = function () {
  // Mostrar la primera ventana (la del osito)
  document.getElementById('welcome-modal').style.display = 'flex';

  // Cerrar la primera ventana y mostrar la segunda
  document.querySelector('#welcome-modal .close').addEventListener('click', function () {
    // Ocultar la primera ventana
    document.getElementById('welcome-modal').style.display = 'none';

    // Mostrar la segunda ventana (la de la pregunta de San Valentín)
    document.getElementById('second-modal').style.display = 'flex';

    
  });
};

// Cerrar modales
document.querySelectorAll('.close').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    this.closest('.modal').style.display = 'none';

    // Si se cierra el modal de "Sí", mostrar el texto emergente
    if (this.closest('#modal')) {
      mostrarTextoEmergente();
    }
  });
});



// Botón "Sí"
document.getElementById('btn-si').addEventListener('click', function () {
  // Ocultar la segunda ventana
  document.getElementById('second-modal').style.display = 'none';

  // Mostrar la ventana de "Sí"
  document.getElementById('modal').style.display = 'flex';

  
  // Activar la lluvia de girasoles
  lluviaDeGirasoles();

  // Reproducir música
  const music = document.getElementById('background-music');
  music.volume = 0.3; // Volumen bajo
  music.play();

  // Animación o flecha apuntando a la "X"
  mostrarFlecha('#modal');

  // Enviar mensaje por WhatsApp
  enviarMensajeWhatsApp("Paola ha dicho que SÍ. ¡Felicidades!");
});

// Funci贸n para mostrar la flecha apuntando a la "X" de cualquier modal
function mostrarFlecha(modalSelector) {
  const closeButton = document.querySelector(`${modalSelector} .close`);
  const flecha = document.createElement('div');
  flecha.innerHTML = '👇'; // Emoji de dedo apuntando hacia abajo
  flecha.style.position = 'absolute';
  flecha.style.top = `${closeButton.getBoundingClientRect().top + window.scrollY - 50}px`;
  flecha.style.left = `${closeButton.getBoundingClientRect().left + window.scrollX - 10}px`;
  flecha.style.fontSize = '24px';
  flecha.style.transition = 'opacity 1s';
  flecha.style.zIndex = '10000'; // Asegura que est茅 por encima de todo
  document.body.appendChild(flecha);

  // Animaci贸n de movimiento hacia arriba y abajo
  let direction = 1; // 1 para abajo, -1 para arriba
  const moveFlecha = () => {
    const currentTop = parseFloat(flecha.style.top);
    flecha.style.top = `${currentTop + direction}px`;
    if (currentTop >= closeButton.getBoundingClientRect().top + window.scrollY - 30) {
      direction = -1; // Cambia la direcci贸n hacia arriba
    } else if (currentTop <= closeButton.getBoundingClientRect().top + window.scrollY - 50) {
      direction = 1; // Cambia la direcci贸n hacia abajo
    }
    requestAnimationFrame(moveFlecha);
  };
  moveFlecha();

  // Desvanecer la flecha despu茅s de 5 segundos
  setTimeout(() => {
    flecha.style.opacity = '0';
    setTimeout(() => {
      flecha.remove();
    }, 1000); // Espera a que se desvanezca antes de eliminar
  }, 5000);
}

// Función para mostrar el texto emergente
function mostrarTextoEmergente() {
  const textoEmergente = document.createElement('div');
  textoEmergente.textContent = "Toca todas las flores :D";
  textoEmergente.style.position = 'fixed';
  textoEmergente.style.top = '20px';
  textoEmergente.style.left = '50%';
  textoEmergente.style.transform = 'translateX(-50%)';
  textoEmergente.style.backgroundColor = '#fff';
  textoEmergente.style.padding = '10px';
  textoEmergente.style.borderRadius = '5px';
  textoEmergente.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  textoEmergente.style.zIndex = '10000'; // Asegura que esté por encima de todo
  document.body.appendChild(textoEmergente);

  // Desvanecer el texto después de 10 segundos
  setTimeout(() => {
    textoEmergente.style.transition = 'opacity 1s';
    textoEmergente.style.opacity = '0';
    setTimeout(() => {
      textoEmergente.remove();
    }, 5000); // Espera a que se desvanezca antes de eliminar
  }, 5000);
}

// Botón "No"
let noClicks = 0;
const btnNo = document.getElementById('btn-no');
const btnSi = document.getElementById('btn-si');
const modalNo = document.getElementById('modal-no');
const modalNoText = document.getElementById('modal-no-text');
const modalNoGif = document.getElementById('modal-no-gif');

btnNo.addEventListener('click', function () {
  noClicks++;

  // Mover el botón de manera suave (desde el primer clic y a partir del cuarto)
  if (noClicks === 1 || noClicks >= 4) {
    const x = Math.max(0, Math.min(window.innerWidth - btnNo.offsetWidth, Math.random() * window.innerWidth));
    const y = Math.max(0, Math.min(window.innerHeight - btnNo.offsetHeight, Math.random() * window.innerHeight));
    btnNo.style.position = 'absolute';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
  }

  // Ventanas emergentes según el número de clics
  if (noClicks === 2) {
    modalNoText.textContent = "Tan linda que se ve, así como ese oso, y tan malucona...";
    modalNoGif.src = "bubududu.gif";
    modalNo.style.display = 'flex';
  } else if (noClicks === 3) {
    modalNoText.textContent = "Te ves igual de pajua que Sawako con su cara de enfermita...";
    modalNoGif.src = "sawako.gif";
    modalNo.style.display = 'flex';
  } else if (noClicks === 10) {
    modalNoText.textContent = "Verga, pero pq le sigues dando. Pa eso salte mugrosa...";
    modalNoGif.src = "tooji-bubududu.gif";
    modalNo.style.display = 'flex';
  } else if (noClicks === 20) {
    modalNoText.textContent = "Ya basta, ¿no? Si sigues aca es pq le queres dar que si hpta...";
    modalNoGif.src = "tkbubududu.gif";
    modalNo.style.display = 'flex';
  } else if (noClicks === 30) {
    modalNoText.textContent = "Ah pero, si fuera un chinito ahi si vd. (Su cara me representa)";
    modalNoGif.src = "Haechan.gif";
    modalNo.style.display = 'flex';
  } else if (noClicks === 35) {
    modalNoText.textContent = "POR ESO ES QUE LE DECIAS A AZUAGRO EL CHIVO CON FRENILLOS GAFA";
    modalNoGif.src = "CHIVOCONFRENILLO.jpg";
    modalNo.style.display = 'flex';
  } else if (noClicks === 40) {
    const paoMusic = document.getElementById('pao-sound');
    paoMusic.play();
    modalNoText.textContent = "¡40 VECES YA! ¿En serio? ¡Te los estoy contando paopao! ";
    modalNo.style.display = 'flex';

    // Hacer que el botón "Sí" comience a crecer
    btnSi.style.transition = "all 0.5s ease";
    btnSi.style.position = "fixed";
    btnSi.style.zIndex = "10000"; // Asegura que esté por encima de todo
  } else if (noClicks > 40) {
    const currentWidth = parseFloat(btnSi.style.width) || btnSi.offsetWidth;
    const currentHeight = parseFloat(btnSi.style.height) || btnSi.offsetHeight;
    const newWidth = currentWidth * 1.2; // Aumenta el ancho en un 20%
    const newHeight = currentHeight * 1.2; // Aumenta la altura en un 20%

    btnSi.style.width = `${newWidth}px`;
    btnSi.style.height = `${newHeight}px`;

    // Centrar el botón en la pantalla
    btnSi.style.left = `${(window.innerWidth - newWidth) / 2}px`;
    btnSi.style.top = `${(window.innerHeight - newHeight) / 2}px`;

    // Si el botón cubre toda la pantalla, detener el crecimiento
    if (newWidth >= window.innerWidth && newHeight >= window.innerHeight) {
      btnSi.style.width = "100%";
      btnSi.style.height = "100%";
      btnSi.style.left = "0";
      btnSi.style.top = "0";
      btnSi.style.borderRadius = "0";
      btnSi.textContent = "¡DALE A SÍ!";
    }
  }

  // Enviar mensaje por WhatsApp
  enviarMensajeWhatsApp(`Paola ha dicho que NO. Número de veces: ${noClicks}`);
});

// Lluvia de girasoles
let floresExplotadas = 0;

function lluviaDeGirasoles() {
  const girasolesLluvia = document.getElementById('girasoles-lluvia');
  const popSound = document.getElementById('pop-sound');

  for (let i = 0; i < 20; i++) {
    const girasol = document.createElement('div');
    girasol.classList.add('girasol');
    girasol.style.left = `${Math.random() * (window.innerWidth - 50)}px`; // Asegurar que no se salga de la pantalla
    girasol.style.animationDuration = `${Math.random() * 5 + 5}s`;
    girasol.addEventListener('click', function () {
      if (!girasol.classList.contains('pop')) { // Evitar que se cuente más de una vez
        girasol.classList.add('pop');
        popSound.currentTime = 0;
        popSound.play();
        floresExplotadas++;
        setTimeout(() => girasol.remove(), 500);

        if (floresExplotadas === 20) {
          // Mostrar el tercer modal
          document.getElementById('tercer-modal').style.display = 'flex';

          mostrarGIFs();
          enviarMensajeWhatsApp("Paola ha explotado todas las flores. ¡Ahora debe colocar los GIFs!");
        }
      }
    });
    girasolesLluvia.appendChild(girasol);
  }
}

// Mostrar GIFs
let gif1EnArea = false;
let gif2EnArea = false;

function mostrarGIFs() {
  document.getElementById('gif-container').style.display = 'block';
  document.getElementById('drop-area-left').style.display = 'flex';
  document.getElementById('drop-area-right').style.display = 'flex';
  hacerMovibles();
}

function hacerMovibles() {
  const gifs = document.querySelectorAll('.movable-gif');

  gifs.forEach(gif => {
    gif.addEventListener('mousedown', iniciarArrastre);
    gif.addEventListener('touchstart', iniciarArrastre);
  });
}

function iniciarArrastre(e) {
  const gif = e.target;
  let offsetX, offsetY;

  if (e.type === 'mousedown') {
    offsetX = e.clientX - gif.getBoundingClientRect().left;
    offsetY = e.clientY - gif.getBoundingClientRect().top;
    document.addEventListener('mousemove', arrastrar);
    document.addEventListener('mouseup', soltar);
  } else if (e.type === 'touchstart') {
    const touch = e.touches[0];
    offsetX = touch.clientX - gif.getBoundingClientRect().left;
    offsetY = touch.clientY - gif.getBoundingClientRect().top;
    document.addEventListener('touchmove', arrastrar);
    document.addEventListener('touchend', soltar);
  }

  function arrastrar(e) {
    let clientX, clientY;
    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    }
    gif.style.position = 'absolute';
    gif.style.left = `${clientX - offsetX}px`;
    gif.style.top = `${clientY - offsetY}px`;
  }

  function soltar() {
    const dropAreaLeft = document.getElementById('drop-area-left');
    const dropAreaRight = document.getElementById('drop-area-right');
    const gifRect = gif.getBoundingClientRect();

    // Verificar si el GIF se soltó dentro del área de caída izquierda
    if (
      gifRect.left < dropAreaLeft.getBoundingClientRect().right &&
      gifRect.right > dropAreaLeft.getBoundingClientRect().left &&
      gifRect.top < dropAreaLeft.getBoundingClientRect().bottom &&
      gifRect.bottom > dropAreaLeft.getBoundingClientRect().top
    ) {
      if (gif.id === 'gif1') gif1EnArea = true;
      if (gif.id === 'gif2') gif2EnArea = true;
    }

    // Verificar si el GIF se soltó dentro del área de caída derecha
    if (
      gifRect.left < dropAreaRight.getBoundingClientRect().right &&
      gifRect.right > dropAreaRight.getBoundingClientRect().left &&
      gifRect.top < dropAreaRight.getBoundingClientRect().bottom &&
      gifRect.bottom > dropAreaRight.getBoundingClientRect().top
    ) {
      if (gif.id === 'gif1') gif1EnArea = true;
      if (gif.id === 'gif2') gif2EnArea = true;
    }

    // Si ambos GIFs están en sus áreas, mostrar la ventana emergente
    if (gif1EnArea && gif2EnArea) {
      document.getElementById('tercer-modal').style.display = 'none';
      mostrarVentanaEmergente();
      
      
    }

    document.removeEventListener('mousemove', arrastrar);
    document.removeEventListener('mouseup', soltar);
    document.removeEventListener('touchmove', arrastrar);
    document.removeEventListener('touchend', soltar);
  }
}

function mostrarVentanaEmergente() {
  const modalMensaje = document.getElementById('modal-mensaje');
  modalMensaje.style.display = 'flex';

  mostrarFlecha('#modal-mensaje');

  // Cerrar el modal al hacer clic en la "X"
  modalMensaje.querySelector('.close').addEventListener('click', function () {
    modalMensaje.style.display = 'none';
    mostrarModalHoras();
  });
}

// Función para mostrar la celebración
function mostrarCelebracion() {
  const celebracion = document.getElementById('celebracion');
  celebracion.style.display = 'flex';

  // Reproducir sonido de confeti inmediatamente
  const confetiSound = document.getElementById('confeti-sound');
  confetiSound.play(); // Primer sonido sin delay

  // Reproducir sonido de confeti dos veces más con un delay de 2 segundos
  let vecesReproducido = 1;
  const intervaloConfeti = setInterval(() => {
    confetiSound.play();
    vecesReproducido++;
    if (vecesReproducido === 3) {
      clearInterval(intervaloConfeti);
    }
  }, 2000); // Delay de 2 segundos entre cada sonido

  // Confeti mejorado
  const confetiCanvas = document.getElementById('confeti');
  const confetiCtx = confetiCanvas.getContext('2d');
  confetiCanvas.width = window.innerWidth;
  confetiCanvas.height = window.innerHeight;

  let confetiParticles = [];
  const confetiColors = ['#ffcc00', '#ff6699', '#33cc33', '#3366ff'];

  function crearConfeti() {
    for (let i = 0; i < 50; i++) {
      confetiParticles.push({
        x: Math.random() * confetiCanvas.width,
        y: -10,
        size: Math.random() * 10 + 5,
        color: confetiColors[Math.floor(Math.random() * confetiColors.length)],
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
      });
    }
  }

  function dibujarConfeti() {
    confetiCtx.clearRect(0, 0, confetiCanvas.width, confetiCanvas.height);
    confetiParticles.forEach((particle, index) => {
      confetiCtx.fillStyle = particle.color;
      confetiCtx.save();
      confetiCtx.translate(particle.x, particle.y);
      confetiCtx.rotate((particle.rotation * Math.PI) / 180);
      confetiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      confetiCtx.restore();

      particle.y += particle.speed;
      particle.rotation += 5;

      if (particle.y > confetiCanvas.height) {
        confetiParticles.splice(index, 1);
      }
    });

    if (confetiParticles.length > 0) {
      requestAnimationFrame(dibujarConfeti);
    } else {
      confetiCtx.clearRect(0, 0, confetiCanvas.width, confetiCanvas.height);
    }
  }

  crearConfeti();
  dibujarConfeti();
}

// Función para mostrar el modal de horas
function mostrarModalHoras() {
  const modalHoras = document.getElementById('modal-horas');
  modalHoras.style.display = 'flex';

  // Cerrar el modal al hacer clic en la "X"
  modalHoras.querySelector('.close').addEventListener('click', function () {
    modalHoras.style.display = 'none';
  });

  // Confirmar la selección de hora
  document.getElementById('btn-confirmar').addEventListener('click', function () {
    const horaSeleccionada = document.getElementById('hora-select').value;
    mostrarCelebracion();
    enviarMensajeWhatsApp(`Paola ha seleccionado la hora: ${horaSeleccionada}`);
    modalHoras.style.display = 'none';

    // Mostrar el cuarto modal
    document.getElementById('cuarto-modal').style.display = 'flex';

    // Ocultar los cuadros de GIFs y áreas de caída
    document.getElementById('gif-container').style.display = 'none';
    document.getElementById('drop-area-left').style.display = 'none';
    document.getElementById('drop-area-right').style.display = 'none';
  });
}

// Obtén los elementos del DOM
const botonOculto = document.getElementById('boton-oculto');
const btnBloqueado = document.getElementById('btn-bloqueado');
const contador = document.getElementById('contador');
const iconoCandado = document.getElementById('icono-candado');
const closeButton = document.querySelector('#second-modal .close'); // Botón de cierre (X) de la ventana de la propuesta

closeButton.addEventListener('click', function () {
  botonOculto.style.display = 'block'; // Muestra el contenedor
  setTimeout(() => {
    botonOculto.classList.add('visible'); // Aplica la transición
  }, 10); // Pequeño delay para que la transición funcione
});


// Fecha de desbloqueo: 15 de febrero de 2025
const fechaDesbloqueo = new Date('2025-02-30T00:00:00');

// Función para actualizar el contador
function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaDesbloqueo - ahora;

  if (diferencia <= 0) {
    // Si la fecha ya pasó, desbloquea el botón
    btnBloqueado.disabled = false;
    btnBloqueado.classList.add('desbloqueado');
    iconoCandado.textContent = '🔓'; // Cambia el candado a desbloqueado
    contador.textContent = '¡Desbloqueado!';
    return;
  }

  // Calcula los días, horas, minutos y segundos restantes
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Muestra el contador
  contador.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

  // Actualiza el contador cada segundo
  setTimeout(actualizarContador, 1000);
}

// Función para mostrar el botón secreto al cerrar la ventana de la propuesta
closeButton.addEventListener('click', function () {
  botonOculto.style.display = 'block'; // Muestra el botón secreto
});

// Inicia el contador
actualizarContador();
