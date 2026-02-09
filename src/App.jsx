import ComponentRouter from './Router/Router'

function App() {

  function getInfo() {
    const info = {
      "width": window.screen.width,
      "Height": window.screen.height
    }

    console.log(info);

  }

  getInfo();

  return (
    <>
      <ComponentRouter />
    </>
  )
}

export default App
