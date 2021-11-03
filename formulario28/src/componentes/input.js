//este ya es un componente reutilizable el cual puedo llevar a cualquier
//parte de mi codigo

import React from "react";
import {
  GrupoInput,
  LeyendaError,
  IconoValidacion,
  Input,
  Label,
} from "./../elementos/formularios";
//para salir de la carpeta componentes que es en la que estamos actualmente
//salimos y entramos a elementos de la siguiente forma './../' con esto
//ya estamos accediendo a la carpeta formularios
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

//se debe crar una constante con los atributos del input
//luego d eimportar los eatdos se los agregamos al input
//para que puedan tener efecto (estado, cambiarEstado) por medio de "value"
//y desde estado debemos acceder a la propiedad campo la cual debe ir dentro
//se crea una funcion con la propiedad onChange para que cuando se ejecute
//un cambio en el input se ejecute onChange, con el console.log para acceder
//al evento (e.target.value); de esta forma accedemos al valor del input
//al cambiar ele estado agreagndo un nuevo objeto el cual contiene las
//propiedades del estado ({...estado y luego que la propiedad campo sea
//igual a lo qye tenemos en el input, ahora denttro dele satdo de usuario tenemos
//tendremos la propiedad campo con el valor y esto lo podemos utilziar para
//comprobar y validar si es correcto
//para validar colocamos la linea cambiarEstado({...estado, valido: 'true'});
//cambiarEstado({...estado, valido: 'false'});

const ComponenteInput = ({
  estado,
  cambiarEstado,
  tipo,
  label,
  placeholder,
  name,
  leyendaError,
  expresionRegular,
  funcion
}) => {
  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value });
  }

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: 'true' });
      } else {
        cambiarEstado({ ...estado, valido: 'false' });
      }
    }
  

    if(funcion){
        funcion();
    }
  }

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>{label}</Label>
      <GrupoInput>
        <Input
          type={tipo}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
        />
        <IconoValidacion
          icon={estado.valido === "true" ? faCheckCircle : faTimesCircle}
          valido={estado.valido}
        />
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
};
export default ComponenteInput;

//para ejecutar una funcion cuando se presione una tecla o se de click fuerA
//del input se ejecute y se compruebe que los datos ingresados son correctos
//para esto agregamos onKeyUp para cuando se suelte el click se ejecuta esta
//funcion tambien la propiedad onBlur para cuando se click fuera del input
//luego oara poder validar la informacion se crea una funcion de nombre
//validacion alli se utiliza expresionRegular para comprobar un valor contra
//la formula expresionRegular que es el valor del input que esta gardado en el estado
//
