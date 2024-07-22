import { useRef, useState } from 'react';
import QuillEditor from '../components/Quill';
import { Delta } from 'quill/core';
import { Menu, MenuItem } from '../components/FloatingUI'

const App = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  function setTextBoldItalic() {
    if (quillRef.current.getSelection() === null) return;

    const { index, length } = quillRef.current.getSelection()
    if (index === -1) return;
    
    console.log(index, length);

    const currentFormat = quillRef.current.getFormat(index, length);

    quillRef.current.formatText(index, length, 'bold', !currentFormat.bold)
    quillRef.current.formatText(index, length, 'italic', !currentFormat.italic)
  }

  function setTextSplitWithDashes() {
    if (quillRef.current.getSelection() === null) return;

    const { index, length } = quillRef.current.getSelection()
    if (index === -1) return;

    // Reformat the text with dashes
    const text = quillRef.current.getText(index, length);
    const updatedText = text.split('').join('-');
    // Get current format that will be applied to updated text
    const currentFormat = quillRef.current.getFormat(index, updatedText.length);

    // Insert updated text and apply previous format
    quillRef.current
    .updateContents(new Delta()
                    .retain(index)
                    .delete(length)
                    .insert(updatedText, { ...currentFormat })
                  );
  }

  function addCommentToSelection() {
    if (quillRef.current.getSelection() === null) return;

    const { index, length } = quillRef.current.getSelection()
    if (index === -1) return;

    const currentFormat = quillRef.current.getFormat(index, length);

    quillRef.current.formatText(index, length, 
      { ...currentFormat, background: currentFormat?.background ? "transparent" : "#d7ad33", color: currentFormat?.color ? "#fff" : "#000"}
    );
  }

  return (
    <>
      <section className='w-3/4 mt-4'>
        <QuillEditor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()
            .insert('Hello')
            .insert('\n', { header: 1 })
            .insert('Some ')
            .insert('initial', { bold: true })
            .insert(' ')
            .insert('content', { underline: true })
            .insert('\n')}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <div className="flex border border-[#ccc] p-3">
          <label>
            Read Only:{' '}
            <input
              type="checkbox"
              value={readOnly}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
          </label>
          <button
            className="ml-auto"
            type="button"
            onClick={() => {
              console.log('clicked');
            }}
          >
            Click
          </button>
        </div>
        <div className="mx-3 my-0">
          <div className="text-[#999] uppercase">Current Range:</div>
          {range ? JSON.stringify(range) : 'Empty'}
        </div>
        <div className="mx-3 my-0">
          <div className="text-[#999] uppercase">Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div>
      </section>
      <Menu quillRef={quillRef}>
        <MenuItem id='dashes-between' label="Join with Dashes" onClick={setTextSplitWithDashes} />
        <MenuItem id='bold-italic' label="Set as Bold Italic" onClick={setTextBoldItalic} />
        <MenuItem label="Reload" disabled />
        <MenuItem label="Add Comment" onClick={addCommentToSelection} />
        <MenuItem label="Save As..." />
        <MenuItem label="Print" />
      </Menu>
    </>
  );
};

export default App;