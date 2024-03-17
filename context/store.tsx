"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

import { Note } from '@/types';

interface Store {
  notes: Note[],
  setNotes: Dispatch<SetStateAction<Note[]>>,
}

export const NotesContext = createContext<Store>({
  notes: [],
  setNotes: () : string => '',
})

export function NotesProvider({ children }: {children: React.ReactNode}) {
    const [notes, setNotes] = useState<Note[]>([]);
    return (
        <NotesContext.Provider
        value={{
            notes,
            setNotes,
        }}
        >
        {children}
        </NotesContext.Provider>
    )
}

export function useNotes() {
  const context = useContext(NotesContext)

  if (!context)
    throw new Error('useNotes must be used inside a `NotesProvider`')

  return context
}