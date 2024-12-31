// import LoginPage from './pages/login-page';

import Blob from "./_components/BlobBackground/Blob";

const Page = () => {
    return (
        <div>
          <Blob xPosition={150} yPosition={350} size={500} showGuides={true} color="#bfdb" />
          <Blob xPosition={1050} yPosition={350} size={300} speed={1} color="#dfaabb" />
        </div>
      );
}

export default Page;
