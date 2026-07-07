import Editor from "@monaco-editor/react";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Start typing..."
        theme="vs-dark"
      />
    </div>
  );
}

export default App;