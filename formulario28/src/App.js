import React, { useState } from "react";
//con react se agrega useState para crea restados dentro de la App
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/input";

import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./elementos/formularios";

//una vez importado useState definimos el estado dentro de la constante
//abriendo una constante con corchetes [] y los definimos los esatdos
//que llevara dos propiedades para campo dodne va el texto y valido para identificar si el input de usuario es valido o no luego se copia la linea
//y se pega segun la cantidad de imput que se requieran

const App = () => {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  //se deben agregar los estados al input como propiedades para que cada uno
  //reciba la informacion que requiere, luego las exportamos al input.js
  //objetos expresiones regulares

  const expresiones = {
    usuario: /^[a-zA-Z0-9-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  }

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(
        usuario.valido === 'true' && 
        nombre.valido === 'ture' &&
        password.valido === 'true' &&
        password2.valido === 'true' &&
        correo.valido === 'true' &&
        telefono.valido === 'true' &&
        terminos.valido === 'true' &&
        terminos 
    ){
        cambiarFormularioValido(true);
        cambiarUsuario({campo: '', valido: ''});
        cambiarNombre({campo: '', valido: ''});
        cambiarPassword({campo: '', valido: ''});
        cambiarPassword2({campo: '', valido: ''});
        cambiarCorreo({campo: '', valido: ''});
        cambiarTelefono({campo: '', valido: ''});
    } else {
        cambiarFormularioValido(false);
    }
  }

  return (
    <main>
      <Formulario onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="Jhon Doe"
          name="usuario"
          LeyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede tener guion bajo"
          expresionRegular={expresiones.usuario}
        />

        <Input
          estado={nombre}
          cambiarNombre={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="Jhon Doe"
          name="nombre"
          LeyendaError="El nombre solo puede contener letras y espacios"
          expresionRegular={expresiones.nombre}
        />

        <Input
          estado={password}
          cambiarPassword={cambiarPassword}
          tipo="password"
          label=""
          placeholder=""
          name="password1"
          LeyendaError="La Contraseña debe ser de 4 a 12 digitos"
          expresionRegular={expresiones.password}
        />

        <Input
          estado={password2}
          cambiarPassword2={cambiarPassword2}
          tipo="password"
          label=""
          placeholder=""
          name="password2"
          LeyendaError="Las Contraseñas deben ser iguales"
          //le vamos a pasar una funcion ques e ejecuta cuando haya un cambio en el input
          funcion={validarPassword2}
        />

        <Input
          estado={correo}
          cambiarCorreo={correo}
          tipo="email"
          label="correo electronico"
          placeholder="Correo electronico"
          name="correo"
          LeyendaError="La Correo solo puede contener letras numeros y puntos"
          expresionRegular={expresiones.cambiarCorreo}
        />

        <Input
          estado={telefono}
          telefono={cambiarTelefono}
          tipo="text"
          label="telefono"
          placeholder="1234567890"
          name="telefono"
          LeyendaError="La telefono slo puede contener numeros y un maximo de 14"
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input 
            type="checkbox" 
            name="terminos:" 
            id="temrinos" 
            checked={terminos} 
            onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b> Error: </b>Por Favor Rellene el Formulario Correctamente/{">"}
            </p>
          </MensajeError>
        }
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && <MensajeExito>Formulario Enviado Exitosamente!</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
}

export default App