import INote from "../models/note.model";
import fs from "fs";

const dbPath = "./src/db/db.json";
const db: INote[] = JSON.parse(fs.readFileSync(dbPath).toString());

const saveToDb = (note: INote) => {
    db.push(note);
    fs.writeFileSync(dbPath, JSON.stringify(db));
}

const findMaxId = ():number => {
    return db.reduce((max, note) => Math.max(max, Number(note.id)), 0);
}
const findNoteById = (id: string) => {
    return db.find(note => note.id === id);
}
const deleteNoteById = (id: string) => {
    const note = db.findIndex(note => note.id === id);
    if (note === -1) {
        return null;
    }
    db.splice(note, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db));
    return note;
}
const createNote = (title: string, content: string) => {
    const newNote = {
        id: String(findMaxId() + 1),
        title,
        content
    }
    saveToDb(newNote);
    return newNote;
}
const updateNote = (id: string, title: string, content: string) => {
    const note = findNoteById(id);
    if (!note) {
        return null;
    }
    note.title = title;
    note.content = content;
    saveToDb(note);
    return note;
}

export { db, findMaxId, findNoteById, deleteNoteById, createNote, updateNote };