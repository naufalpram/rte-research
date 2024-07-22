import { useState } from 'react';
import Quill from './pages/Quill';
import EditorJS from './pages/Editor';

const App = () => {
  const [selected, setSelected] = useState('editor');
  console.log(selected);

  return (
    <main className='bg-gray-700 w-full h-full min-h-screen p-5 text-white flex flex-col items-center'>
      <menu className='flex gap-3 m-4'>
        <button className='bg-blue-950 px-4 py-2' onClick={() => setSelected('quill')}>Quill</button>
        <button className='bg-yellow-600 px-4 py-2' onClick={() => setSelected('editor')}>Editor.js</button>
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