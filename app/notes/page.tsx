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

  return (
    <div className='max-w-[500px] m-auto p-8 flex flex-col'>
        {/* <h2 className='self-center'></h2> */}
        {notes?.map((note) => (
            <div className='flex flex-row py-2' key={note.id}>
              {note.body && <Button className='w-[2px] h-[20px] rounded-xl mx-2' onClick={() => deleteNote(note)}>X </Button>}
              <Link href={{pathname: "/", query: {id: note.id}}} className='cursor-pointer'>
                <p className={theme === 'day' ? 'text-black' : 'text-white'}>{note.body}</p>
              </Link>
            </div>
        ))}
        <Link href={"/"}><Button className='w-full my-2'>New Note</Button></Link>
    </div>
  )
}

export default Notes