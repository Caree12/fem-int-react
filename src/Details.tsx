import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

// need to add type param here RouteComponentProps which ALSO takes a prop bc we expect an string id passed here - it's passed in the router and becomes part of the url
class Details extends React.Component<RouteComponentProps<{id: string}>> {
    // added public here bc react has access to them so they are public
    public state = { 
      animal: '', 
      breed: '',
      description: '',
      loading: true, 
      location: '',
      // update this to say what kind of array - Photo from @frontendmasters/pet
      media: [] as Photo[], 
      name: '', 
      showModal: false,
      url: '',

    };
    public componentDidMount() {
    // next error .animal(this.props.id) - we have to provide a back up if id isn't passed down - so we nav back to / and return out of here
    if(!this.props.id) {
        navigate('/');
        return;
    }

    pet
      // after exiting out if no id type is a str BUT .animal expects a num - add + to coerece str to num 
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${
            animal.contact.address.state
          }`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      })
      .catch(err => {
          return this.setState({ error: err });
      });
  }
  public toggleModal = () => this.setState({ showModal: !this.state.showModal });
  // tsc error here is bc url is not in state - set default value for url on state at top with empty str value
  public adopt = () => navigate(this.state.url);
  public render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

  // tsc error here is bc NONE of these are in state - set default value for all
    
    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I am a monster</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// error here bc we need to define the type of props, which are the same props as pass INTO this class, so can copy from above
export default function DetailsErrorBoundary(props: RouteComponentProps<{id: string}>) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}