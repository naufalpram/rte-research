import { useRef, useState } from 'react';
import EditorJS from '../components/Editor';
import { Menu, MenuItem } from '../components/FloatingUI'

const App = () => {

  // Use a ref to access the editor.js instance directly
  const ejInstance = useRef();

  function setTextBoldItalic() {
    
  }

  function setTextSplitWithDashes() {
    
  }

  function addCommentToSelection() {
    
  }

  return (
    <>
      <EditorJS ref={ejInstance} />
      {/* <Menu editorRef={ejInstance}>
        <MenuItem id='dashes-between' label="Join with Dashes" onClick={setTextSplitWithDashes} />
        <MenuItem id='bold-italic' label="Set as Bold Italic" onClick={setTextBoldItalic} />
        <MenuItem label="Reload" disabled />
        <MenuItem label="Add Comment" onClick={addCommentToSelection} />
        <MenuItem label="Save As..." />
        <MenuItem label="Print" />
      </Menu> */}
    </>
  );
};

export default App;