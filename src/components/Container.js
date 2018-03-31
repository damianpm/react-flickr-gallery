import React, {Component} from 'react';
import ImageBox from './ImageBox';
import ModalWindow from './Modal';
import axios from 'axios';
import preloader from './preloader.svg';

const PHOTOS_BY_PAGE = 12;

const BASE_URL = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = ''; // Your API_KEY here
const TAGS = 'landscape';
const FLICKR_METHOD = 'flickr.photos.search';
const SAFE_SEARCH = '1';
const EXTRAS = 'owner_name,description,url_m,url_l,date_taken,views,tags';
const FLICKR_FORMAT = 'json';
const NO_JSON_CALLBACK = '1';

const FULL_URL = `${BASE_URL}${FLICKR_METHOD}&api_key=${API_KEY}&tags=${TAGS}&safe_search=${SAFE_SEARCH}&extras=${EXTRAS}&format=${FLICKR_FORMAT}&nojsoncallback=${NO_JSON_CALLBACK}`;

class Container extends Component {
  constructor() {
    super();
    this.state = {
      totalPages: null,
      photos: [],
      currentPage: 1,
      showModal: false,
      modalPhoto: {}
    };
    this.fetchData = this.fetchData.bind(this);
    this.loadPhotosToState = this.loadPhotosToState.bind(this);
    this.makePhotos = this.makePhotos.bind(this);
    this.addPage = this.addPage.bind(this);
    this.sustractPage = this.sustractPage.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  handleShowModal(){
    this.setState({ showModal: true });
  }

  handleHideModal(){
    this.setState({ showModal: false });
  }

  handleImageClick(photo){
    this.setState({showModal: true, modalPhoto: photo});
  }

  fetchData(page) {
    const url = `${FULL_URL}&per_page=${PHOTOS_BY_PAGE}&page=${page}`
    return axios.get(url).then(response => {
      if (response.data.stat === 'ok') {
        this.loadPhotosToState(response.data.photos);
      } else {
        throw new Error(response.data.message);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  loadPhotosToState({pages, page, photo}) {
    const state = Object.assign({}, this.state);
    state.totalPages = pages;
    state.currentPage = page;
    state.photos = photo;
    this.setState(state);
  }

  addPage(){
    const currentPage = this.state.currentPage + 1;
    this.setState({currentPage}, function(){
        this.fetchData(this.state.currentPage);
    })
  }

  sustractPage(){
    const currentPage = this.state.currentPage - 1;
    this.setState({currentPage}, function(){
        this.fetchData(this.state.currentPage);
    })
  }

  componentDidMount() {
    this.fetchData(this.state.currentPage);
  }

  makePhotos() {
    const photos = this.state.photos;
    if (photos.length === 0) {
      return <div className="my-column">
        <h2>Loading images...</h2>
        <img src={preloader} alt="preloader"/>
      </div>
    }
    return photos.map(photo => {
      return <div key={photo.id} className="my-column">
        <ImageBox photo={photo} onImageClick={this.handleImageClick}/>
      </div>
    });
  }

  render() {
    return (
      <div>
        <ModalWindow
          showModal={this.state.showModal}
          onHideModal={this.handleHideModal}
          modalPhoto={this.state.modalPhoto}
        />
      <div className="grid-container">
        <div className="my-row">
          {this.makePhotos()}
        </div>
        <div>
          <ul className="my-pagination">
            <li>
              <button
                onClick={this.sustractPage}
                disabled={this.state.currentPage <= 1 ? true : false}>Previous</button>
            </li>
            <li>
              <button
                onClick={this.addPage}
                disabled={this.state.currentPage >= this.state.totalPages ? true : false}>Next</button>
            </li>
          </ul>
      </div>
    </div>

    </div>);
  }
}

export default Container;
