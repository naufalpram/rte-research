import { useState } from 'react';
import Quill from './pages/Quill';
import EditorJS from './pages/Editor';

const App = () => {
  const [selected, setSelected] = useState('quill');

  return (
    <main className='bg-gray-700 w-full h-full min-h-screen text-white flex flex-col items-center font-sans'>
      <menu className='flex gap-3 m-4'>
        <button className='bg-blue-950 text-white font-semibold px-4 py-2 rounded border-none' onClick={() => setSelected('quill')}>Quill</button>
        <button className='bg-yellow-600 text-white font-semibold px-4 py-2 rounded border-none' onClick={() => setSelected('editor')}>Editor.js</button>
      </menu>
      <h1 className='text-2xl font-bold'>Rich Text Editor with {selected === 'quill' ? 'Quill' : 'Editor.js'}</h1>
      {selected === 'quill' && (
        <>
          <Quill />
        </>
      )}
      {selected === 'editor' && (
        <>
          {/* <h1 className='text-2xl font-bold'>Rich Text Editor with Editor.js</h1> */}
          <EditorJS />
        </>
      )}
    </main>
  );
};

export default App;