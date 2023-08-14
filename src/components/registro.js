import { GoogleAuthProvider } from 'firebase/auth';
import { registerWithEmail, signInWithGoogle } from '../lib/index';

function registro(navigateTo) {
  const divRegister = document.createElement('div');
  divRegister.className = 'divRegister';

  const logoBon = document.createElement('img');
  logoBon.className = 'logoBon';

  const inputName = document.createElement('input');
  inputName.className = 'input displayName';
  inputName.setAttribute('type', 'name');
  inputName.setAttribute('placeholder', 'Nombre de Usuario');
  inputName.setAttribute('required', '');

  const inputEmail = document.createElement('input');
  inputEmail.className = 'input inputEmail';
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('placeholder', 'Correo electronico');
  inputEmail.setAttribute('required', '');

  const inputPass = document.createElement('input');
  inputPass.className = 'input inputPass';
  inputPass.setAttribute('type', 'password');
  inputPass.setAttribute('placeholder', 'Crea tu contraseña');
  inputPass.setAttribute('required', '');

  const buttonRegistro = document.createElement('button');
  buttonRegistro.className = 'button buttonSignInRegistro';
  buttonRegistro.textContent = 'Registro';

  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'button buttonReturnRegistro';
  buttonReturn.textContent = 'Regresar';

  const errorRegister = document.createElement('p');
  errorRegister.className = 'parrafo';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button buttonGoogle';
  const strong = document.createElement('strong');
  strong.textContent = 'Google';
  strong.className = 'textGoogle';
  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'imgGoogle';

  const textRegistrateCon = document.createElement('p');
  textRegistrateCon.className = 'parrafo';
  textRegistrateCon.textContent = 'O registrate con...';

  buttonRegistro.addEventListener('click', () => {
    const emailValue = inputEmail.value;
    const nameValue = inputName.value;
    const passwordValue = inputPass.value;

    if (nameValue === '') {
      errorRegister.style.display = 'block';
      errorRegister.textContent = 'Los campos no puede estar vacíos';
      return;
    }

    const userInfo = {
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    };

    registerWithEmail(
      userInfo.email,
      userInfo.password,
      userInfo.name,
    )
      .then((user) => {
        navigateTo('/principal');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'La contraseña debe tener al menos 6 caracteres';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email invalido';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Falta colocar correo';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'El correo electrónico ya se encuentra registrado';
        } else if (errorCode === 'auth/internal-error') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Falta colocar contraseña';
        }
        console.log(error.code);
        return error;
      });
  });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  divRegister.appendChild(logoBon);
  divRegister.append(inputName, inputEmail, inputPass);
  divRegister.appendChild(errorRegister);
  divRegister.appendChild(buttonRegistro);
  divRegister.appendChild(textRegistrateCon);
  divRegister.appendChild(buttonGoogle);
  buttonGoogle.append(imgGoogle, strong);
  divRegister.appendChild(buttonReturn);

  buttonGoogle.addEventListener('click', () => {
    signInWithGoogle()
      .then((result) => {
        navigateTo('/principal');
      })
      .catch((error) => {
        console.log('estes es', error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // el correo de la cuenta del usuario.
        const email = error.customData.email;
        // la credencial Auth que fue usada.
        const credential = GoogleAuthProvider.credentialFromError(error);
        navigateTo('/'); // si nos marca error nos manda al home
      });
  });
  return divRegister;
}

export default registro;
