import { check } from "express-validator";
import { validarCamposExpress } from "./validar-campos.js";
import { isDate } from "../helpers/validator-db.js";

export const bodyEventValidator = [
    check("title", "El titulo es obligatorio").not().isEmpty(), 
    check("start", "La fecha de inicio es obligatoria").not().isEmpty(),
    check("start", "Formato de fecha inicio no valido").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").not().isEmpty(), 
    check("end", "Formato de fecha fin no valido").custom(isDate),
    validarCamposExpress
  ];