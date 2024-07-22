import { forwardRef, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './constant';
import { DEFAULT_INITIAL_DATA } from './data';

const App = forwardRef((props, ref) => {
  console.log(ref.current);
  useEffect(() => {
    const initEditor = () => {
        const editor = new EditorJS({
           holder: 'editorjs',
           tools: EDITOR_JS_TOOLS,
           onReady: () => {
             ref.current = editor;
           },
           autofocus: true,
           data: DEFAULT_INITIAL_DATA,
           onChange: async () => {
             let content = await editor.saver.save();
 
             console.log(content);
           }
         });
       };

    if (ref.current === null) {
        initEditor();
    }

    return () => {ref.current = null};
  }, []);
  return (
    <div id='editorjs' className='w-1/2 bg-white text-black mt-5 p-8'></div>
  )
})

export default App