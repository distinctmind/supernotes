"use client";

import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/store';

import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from 'next/navigation'
import { Note } from '@/types';
import Link from 'next/link';
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils';



const Home = () => {
  
  const {theme} = useTheme();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const textAreaRef = useRef<any>(null)
  ;
  const {notes, setNotes} = useNotes();
  const [captionText, setCaptionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [hashtagCount, setHashtagCount] = useState(0);
  
  const getNote = () => {
    for (let i=0; i < notes.length; i++) {
      if (notes[i].id === noteId) return notes[i].body;
    }
    return '';
  }

  useEffect(() => {
    if (noteId) setCaptionText(getNote());
  },[]);

  // useEffect(() => {
  //   if (notes.length !== 0) localStorage.setItem("notes", JSON.stringify(notes))
  // }, [notes]);

  const getCreatedAtDate = () => {
    for (let i=0; i < notes.length; i++) {
      if (notes[i].id === noteId) return notes[i].createdAt;
    }
  }

  const findHashtagCount = (value: string) => {
    const regex = /#\w+/g;
    const matches = value.match(regex);
    return matches ? matches.length : 0;
  }

  const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaptionText(e.target.value);
    if (e.target.value) {
      setCharacterCount(e.target.value.length);
    } else {
      setCharacterCount(0);
    }
    setHashtagCount(findHashtagCount(e.target.value))
  }

  const copyText = () => {
    document.querySelector('.copySvg')?.classList.add('hide');
    document.querySelector('#successMessage')?.classList.add('show');

    setTimeout(()=>{
      document.querySelector('.copySvg')?.classList.toggle('hide');
      document.querySelector('#successMessage')?.classList.toggle('show');
    }, 2222);

    if (textAreaRef.current) textAreaRef.current.select();
    navigator.clipboard.writeText(captionText);
  }

  const saveText = () => {
    if (noteId) {
      const modifiedNote = {
        id: uuidv4(),
        body: captionText,
        createdAt: getCreatedAtDate() || Date.now(),
        lastModified: Date.now()
      };
      let newNotes: Note[] = [];
      for (let i=0; i < notes.length; i++) {
        if (notes[i].id === noteId) {
          newNotes.push(modifiedNote);
        } else {
          newNotes.push(notes[i]);
        }
      }
      setNotes(newNotes);
    } else {
        const newNote = {
          id: uuidv4(),
          body: captionText,
          createdAt: Date.now(),
          lastModified: Date.now()
      };
      setNotes([...notes, newNote]);
    }
  }
  const createNewNote = () => {
   setCaptionText("");
  }

  return (
    <div className="max-w-[500px] m-auto p-8 text-center flex flex-col" style={{display: 'flex', flexDirection: 'column'}}>
        <textarea className={cn(theme === 'day' ? 'text-black' : 'text-white', 'bg-transparent outline-none text-2xl font-bold')} ref={textAreaRef} value={captionText} id='caption' rows={10} cols={44} onChange={updateTextArea}>
        </textarea>
        <div style={{position: 'relative', margin: 30}}>
        <span className={theme === 'day' ? 'text-black' : 'text-white'} style={{position: 'absolute', left: 5}}>{characterCount}/2200 </span>
        <button className={theme === 'day' ? 'text-black' : 'text-white'} onClick={copyText}>copy</button>
        <span className={theme === 'day' ? 'text-black' : 'text-white'} style={{position: 'absolute', right: 5}}>#{hashtagCount}/30</span>
        </div>
        <div style={{display: 'flex'}}>
        <div className='flex w-full h-[45px] pt-[15px] justify-evenly gap-x-5'>
            <Button className='w-full' onClick={saveText}>save note</Button>
            <Link className='w-full' href="/" onClick={createNewNote}><Button className='w-full'>new note</Button></Link>
        </div>
        </div>
    </div>
  )
}

export default Home