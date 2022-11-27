import { Router } from "express";
import { check } from "express-validator";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/eventosController.js";

import {
  validarCamposExpress,
  validarTokenOnHeader, 
} from "../middlewares/index.js";
import { bodyEventValidator } from "../middlewares/validator-events.js";

const eventsRouter = Router();

// Protect all routes with the middleware
eventsRouter.use(validarTokenOnHeader);

// Get Obtener todos los eventos
eventsRouter.get("/", getAllEvents);

// Post Crear un evento
eventsRouter.post("/create", [bodyEventValidator], createEvent);

// Put Actualizar un evento
eventsRouter.put(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), bodyEventValidator],
  updateEvent
);

// Delete Borrar un evento
eventsRouter.delete("/:id",[check("id", "El id no es valido").isMongoId(), validarCamposExpress ],deleteEvent);

// Export the router
export { eventsRouter };
