const users = [
    { username: 'usuarioA', password: 'contrasenaA' },
    { username: 'usuarioB', password: 'contrasenaB' },
    { username: 'usuarioC', password: 'contrasenaC' },
    { username: 'usuarioX', password: 'contrasenaX' },
    { username: 'usuarioY', password: 'contrasenaY' },
    { username: 'usuarioZ', password: 'contrasenaZ' },
    { username: 'user123', password: 'pass123' },
    { username: 'john_doe', password: 'doe123' },
    { username: 'jane_smith', password: 'smith456' },
    { username: 'test_user', password: 'testpass' }
  ];
  
  const form = document.querySelector('#form');
  
  form.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // prevenir el comportamiento de envío de formulario predeterminado
  
    const correo = form['username'].value;
    const pass = form['password'].value;


  
    let esUsuarioValido = false;
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === correo && users[i].password === pass) {
        esUsuarioValido = true;
        break; // salir del bucle si se encuentra un usuario válido
      }
    }
  
    if (esUsuarioValido) {
      window.location.href="inicio.html"
    } else {
      alert('No válido');
    }


  });
  