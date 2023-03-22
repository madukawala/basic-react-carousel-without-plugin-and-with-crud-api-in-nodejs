import React, { Component } from 'react'

export default class CarouselItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="carousel-item">
      <img src={this.props.obj.image} alt="placeholder" />
      <span>{this.props.obj.title}</span>
      <p>{this.props.obj.subTitle}</p>
    </div>      
    )
  }
}
