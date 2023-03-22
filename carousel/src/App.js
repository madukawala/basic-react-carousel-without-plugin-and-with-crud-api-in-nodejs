import Carousel from "./components/Carousel/Carousel"

const App = () => {

    return (
      <>
        <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
          <Carousel show={1} slides={1} infinite={false}>             
          </Carousel>
        </div>
        <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
          <Carousel show={1} slides={4} infinite={true}>                                  
          </Carousel>
        </div>
        <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
          <Carousel show={1} slides={10} infinite={false}>
          </Carousel>
        </div>        
      </>
    )
}

export default App