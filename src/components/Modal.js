import React from 'react';
import {Modal, Image, Button} from 'react-bootstrap';

const ModalWindow = ({showModal, onHideModal, modalPhoto}) => {
  const description = modalPhoto.description ? modalPhoto.description._content || 'No description available :(' : 'No description available :(';
  const url = modalPhoto.url_l || modalPhoto.url_m;
  const tags = modalPhoto.tags || 'No tags available :(';
  return (
    <Modal show={showModal}
          onHide={onHideModal}
          dialogClassName="custom-modal"
          bsSize="large">
          <Modal.Body>
            <a href={`http://flickr.com/photo.gne?id=${modalPhoto.id}`} target="_blank">
              <Image src={url} alt="Alt" responsive/>
            </a>
            <div className="modal-description-box">
              <span className="image-title">
                {modalPhoto.title}
              </span>
              <p className="modal-description"><strong>Description: </strong>{description}</p>
              <p><i><strong>By: </strong>
                {modalPhoto.ownername}
              </i></p>
              <p className="tags">
                <strong>Tags: </strong> {tags}
              </p>
              <p>
                <strong>Taken</strong> {modalPhoto.datetaken}
                | <strong>Viewed</strong> {modalPhoto.views} times
                | More from <a href={`https://www.flickr.com/photos/${modalPhoto.owner}`} target="_blank">{modalPhoto.ownername}</a>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHideModal} bsClass="close"><span aria-hidden="true">&times;</span></Button>
          </Modal.Footer>
        </Modal>
  );
}

export default ModalWindow;
