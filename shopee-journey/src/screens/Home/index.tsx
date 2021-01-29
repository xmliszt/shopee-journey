import * as React from 'react';

// Components
import { Link, LinkBack } from 'libraries/components/Link';

// Stylings
import './styles.scss';

function Home() {
  // Start creating your awesome app here
  return (
    <div>
      <LinkBack>Back</LinkBack>

      <br />
      <br />

      <Link to='/demo' replace>
        Open Demo App
      </Link>

      <br />
      <br />

      <div>Hello World!</div>
    </div>
  );
}

export default Home;
