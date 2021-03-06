import { NotesContext } from '../../context/NotesContext';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import { truncate, url, config } from '../Globals';
import Link from 'next/link';
import React from 'react';

const Note = ({ note, openEditNoteModal, openManageLabelsModal, setTargetNote, openReadNoteModal }) => {
    const { deleteNote } = useContext(NotesContext);
    const {setShowReadNoteModal, setShowOverlay} = useContext(GlobalContext);
    const [currentNote, setCurrentNote] = useState(note);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setCurrentNote(note);
        setTargetNote(note);

    }, [note]);



    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md shadow-gray-300 md:w-80 dark:bg-gray-800 dark:text-white dark:shadow-gray-800 md:grow-0 ms-0 overflow-hidden flex-grow">
            <p className="text-xl border-b-2 border-blue-400 pb-2 ">{note.title}</p>
            <p className="mt-2 ">{truncate(note.note, 100)}</p>


            {currentNote.labels !== undefined ?
                <div className="labels mt-4 mb-2 flex gap-1 flex-wrap">
                    {currentNote.labels.map((item, key) =>
                        <Link href={`/labels/${item._id.$oid}?name=${item.name}`} key={key}><a className="p-1 text-white px-3 scale-90 rounded-md z-0 bg-blue-500">{item.name}</a></Link>
                    )}
                </div>
                : ""}


            <p className="text-gray-600 dark:text-gray-400 mt-4">
                {note.timestamp}
            </p>

            <button onClick={e => openReadNoteModal(note)} className="text-gray-600 dark:text-gray-400 mt-2 p-1 bg-gray-300 dark:bg-gray-700 px-3 rounded-md">Read note</button>



            <footer className="mt-5 flex gap-x-3">

                <button className="btn-rounded-md btn-red" onClick={e => { deleteNote(note) }}><i className="fa fa-trash"></i></button>

                <button className="btn-rounded-md btn-blue" onClick={e => openEditNoteModal(note)}><i className="fa fa-edit" ></i></button>

                <button className="btn-rounded-md btn-blue" onClick={e => openManageLabelsModal(note)}><i className="fa fa-tags" ></i></button>
            </footer>
        </div>
    )
}

export default Note;
