import { useState } from 'react'
import './App.less'

function App() {

  const fileReaderUpload = (e) => {
    let file = e?.target?.files[0];
    console.log(file);
    let fr = new FileReader();
    let isPic = /\.(jpg|jpeg|webp)$/g;
    let isFile = /\.(txt)$/g;
    if (isPic.test(file.name)) {
      fr.readAsDataURL(file);
    } else if (isFile.test(file.name)) {
      fr.readAsText(file);
    }
    fr.onload = function () {
      console.log(fr.result);
      fetch("http://localhost:8000/fileReader", { method: 'POST', mode: "cors", body: JSON.stringify({ data: fr.result }) }).then(res => {
        console.log(res);
      })
    }
  }

  return (
    <div className="App">
      <div>
        <p>通过fileReader上传</p>
        <input type="file" name="file" onChange={(e) => fileReaderUpload(e)} />
      </div>
    </div>
  )
}

export default App
