
import { Schema, model } from "mongoose"; 

const eventoSchema = Schema({
   title: {
        type: String,
        required: true
   },
   notes: {
        type: String
   },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
 
export const Evento = model("Evento", eventoSchema);
