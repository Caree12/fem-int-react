import React from "react";
import { Photo } from "@frontendmasters/pet";

// these are definitions of what we have to have - defines the shape of props that NEED to be here - will throw error if missing
interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

// defining type of Carousel with interfaces - <IProps, IState>
class Carousel extends React.Component<IProps, IState> {
  public state = {
    photos: [],
    active: 0
  };
  
  // have to tell it that media comes from IProps ({ media}) TO ({ media }: IProps)
  public static getDerivedStateFromProps({ media }: IProps) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }
  
  // have to say what KIND of event this is -  event => TO (event: React.MouseEvent<HTMLElement>) =>
  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    // +event.target.dataset isn't happy bc what if an HTMLELement ISN"T passed in here?
    if(!(event.target instanceof HTMLElement)) {
      return;
    }

    // after checking for presence of HTMLElement we have to check that there is an index defined  - move the setState into a conditional that checks for presence of index
    if(event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };
  
  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
