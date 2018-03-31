import React from 'react';
import {Image, Tooltip, OverlayTrigger} from 'react-bootstrap';

const ImageBox = ({photo, onImageClick}) => {
  const tooltip = <Tooltip id="tooltip">{photo.title}</Tooltip>;
  return (<div className="image-card">
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <div className="image-container">
        <div className="clickable-image" onClick={onImageClick.bind(this, photo)}>
          <Image src={photo.url_m} alt={photo.title}/>
        </div>
      </div>
    </OverlayTrigger>
    <h3 className="image-title">{photo.title}</h3>
    <div className="description">
      <p>{photo.description._content || 'No description available :('}</p>
      <p>
        <strong>From:</strong>
        <i><a href={`http://flickr.com/photo.gne?id=${photo.id}`} target="_blank">{photo.ownername}</a></i>
      </p>
    </div>
  </div>);
}

export default ImageBox;
