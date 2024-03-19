"use client";

import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/store'
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils';
import { Note } from '@/types';
import Link from 'next/link';
import { useEffect } from 'react';

const Notes = () => {
  const { notes, setNotes } = useNotes();
  const {theme} = useTheme();

  const deleteNote = (noteToDelete: Note) => {
    setNotes(notes.filter((note) => note.id !== noteToDelete.id));
  }

  const createNotesFile = () => {
    let notesFileTxt = "";

    notes.map((note) => {
      notesFileTxt += note.body;
      notesFileTxt += "\n";
      notesFileTxt += "\n";
    });
    return notesFileTxt;
  }

  const downloadNotes = () => {
    const fileData = createNotesFile();
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "your-supernotes.txt";
    link.href = url;
    link.click();

  }

  return (
    <div className='max-w-[500px] m-auto p-8 flex flex-col'>
        {/* <h2 className='self-center'></h2> */}
        <Button onClick={downloadNotes} variant={'ghost'} className={cn('w-24 mb-2 self-center', theme === 'day' ? 'text-black' : 'text-white')}>export all</Button>
        {notes?.map((note) => (
            <div className='flex flex-row py-2' key={note.id}>
              {note.body && <Button className='w-[2px] h-[20px] rounded-xl mx-2' onClick={() => deleteNote(note)}>X </Button>}
              <Link href={{pathname: "/", query: {id: note.id}}} className='cursor-pointer'>
                <p className={theme === 'day' ? 'text-black' : 'text-white'}>{note.body}</p>
              </Link>
            </div>
        ))}
        <Link href={"/"}><Button className='w-full my-4'>New Note</Button></Link>
    </div>
  )
}

export default Notes