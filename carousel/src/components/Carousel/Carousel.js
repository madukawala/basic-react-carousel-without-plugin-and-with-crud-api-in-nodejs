import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Carousel.css'
import CarouselItem from './CarouselItem';

const Carousel = (props) => {

    const [slideList, updateSlideList] = React.useState([]);

    const { show, infinite, slides} = props

    const [currentIndex, setCurrentIndex] = useState(infinite ? show : 0)
    const [length, setLength] = useState(slides)

     const [isRepeating, setIsRepeating] = useState(infinite && slides > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const [touchPosition, setTouchPosition] = useState(null)

    function getSlideData (slides, mounted) {
        if (mounted === true) {
            axios.get('http://localhost:3600/api/carousel/?slides='+slides)
            .then(res => {
                updateSlideList(res.data);
                mounted = false;
            })
            .catch((error) => {
                console.log(error);
            })
        }
      }

      useEffect(() => {
        let mounted = true;
        getSlideData(slides, mounted);
      }, [slides]);

      function ListItem() {
        return slideList.map((res, i) => {
          return <CarouselItem obj={res} key={i} />;
        });
      }

      function ListItemSingle(item, index) {
        console.log(item);
          return <CarouselItem obj={item} key={index} />;
      }

      // Set the length to match current slides from props
    useEffect(() => {
        setLength(slides)
        setIsRepeating(infinite && slides > show)
    }, [slides, infinite, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    const next = () => {
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(ListItemSingle(slideList,length - 1 - index))
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(ListItemSingle(slideList,index))
        }
        return output
    }
    
    return (
        
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    (isRepeating || currentIndex > 0) &&
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / show)}%)`,
                            transition: !transitionEnabled ? 'none' : undefined,
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        { ListItem() }

                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    (isRepeating || currentIndex < (length - show)) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>
                }
            </div>
        </div>
    )

}

export default Carousel