import { request, response } from "express"; // To add intellisense to the request and response objects
import { Evento } from "../models/Evento.js";

export const getAllEvents = async (request, response) => {
  const eventos = await Evento.find().populate("user", "nombre");

  return response.status(200).json({
    ok: true,
    eventos,
  }); // Return a JSON object
};

export const createEvent = async (request, response) => {
  const { title, notes, start, end } = request.body; // Get the data from the request body

  try {
    const evento = new Evento({ title, notes, start, end });
    evento.user = request.usuario._id;
    evento.save(); // Save the event in the database

    return response.status(200).json({
      ok: true,
      evento,
    }); // Return a JSON object
  } catch (error) {}
};

export const updateEvent = async (request, response) => {
  const eventoId = request.params.id; // Get the id from the request params
  const uid = request.usuario._id;
  try {
    const evento = await Evento.findById(eventoId); // Find the event in the database

    if (!evento) {
      return response.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    }
    if (evento.user.toString() !== uid.toString()) {
      return response.status(401).json({
        ok: false,
        msg: "No tiene privilegio para editar este evento",
      });
    }

    const nuevoEvento = {
      ...request.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    return response.status(200).json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    }); // Return a JSON object
  }
};

export const deleteEvent = async(request, response) => {
  const eventoId = request.params.id; // Get the id from the request params
  const uid = request.usuario._id; 
   try {
    const evento = await Evento.findById(eventoId); // Find the event in the database
     
    if (!evento) {
      return response.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    } 
    if (evento.user.toString() !== uid.toString()) {
      return response.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este evento",
      });
    }
 
    // await evento.remove(eventoId);
    await Evento.findByIdAndDelete(eventoId);

    return response.status(201).json({
      ok: true,
      evento,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    }); // Return a JSON object
  }
};
