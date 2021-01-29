import * as React from 'react';

import Bridge from 'libraries/bridges';
import Button from '../../components/Button';

import styles from './styles.scss';

function CameraAlbum() {
  const [currentImage, setCurrentImage] = React.useState(null);

  return (
    <>
      <h1 className={styles.title}>Camera Album</h1>
      <p className={styles.description}>
        {`These are examples of utilizing web bridge to interact with smartphone's camera and gallery`}
      </p>
      <div>Current image:</div>
      <br />
      <div className={styles.currentImage}>
        {currentImage ? <img src={currentImage} /> : 'Please select an image'}
      </div>
      <br />
      <div>
        <Button
          onClick={async () => {
            const { image } = await Bridge.openCamera();
            if (image) {
              setCurrentImage(image);
            }
          }}
        >
          Open Camera
        </Button>
      </div>
      <br />
      <div>
        <Button
          onClick={async () => {
            const { image } = await Bridge.openAlbum();
            if (image) {
              setCurrentImage(image);
            }
          }}
        >
          Open Album
        </Button>
      </div>
    </>
  );
}

export default CameraAlbum;
