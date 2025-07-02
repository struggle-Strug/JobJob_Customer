import React, { useEffect } from 'react';
import htmlToDraft from 'html-to-draftjs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditorComponent({ editorValue, onEditorChange, status, editorStyle }) {
  useEffect(() => {
    if (editorValue) {
      setEditorValue(editorValue);
    }
  }, [status]);

  const setEditorValue = (value) => {
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      onEditorChange(value);
    }
  };

  return (
    <div style={{ ...editorStyle }}>
      <CKEditor
        editor={ClassicEditor}
        data={editorValue}
        onReady={(editor) => {
            const editableElement = editor.ui.getEditableElement();
            if (editableElement) {
                editableElement.style.height = "200px"; // Fixed height
                editableElement.style.overflowY = "scroll"; // Enable vertical scroll
            }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorValue(data)
        }}
      />
    </div>
  );
}

export default EditorComponent;