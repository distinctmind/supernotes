"use client";

import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/store'
import { useTheme } from '@/context/theme';
import { Note } from '@/types';
import Link from 'next/link';

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
          <div className='flex flex-row' key={note.id}>
            {note.body && <Button className='w-[2px] h-[20px] rounded-xl mx-2' onClick={() => deleteNote(note)}>X </Button>}
            <Link href={{pathname: "/", query: {id: note.id}}} className='cursor-pointer'>
              <p className={theme === 'day' ? 'text-black' : 'text-white'}>{note.body}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Notes