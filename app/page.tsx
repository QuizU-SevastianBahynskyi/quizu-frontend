// import LoginPage from './pages/login-page';

import Blob from "./_components/BlobBackground/Blob";

const Page = () => {
    return (
        <div>
          <Blob xPosition={150} yPosition={350} size={500} showGuides={true} color="#bfdb" />
          <Blob xPosition={1050} yPosition={350} size={300} numPoints={6} irregularity={0.3} phaseOffset={2} smoothness={1.4} showGuides={true} color="#dfaabb" />
          <Blob numPoints={8} tension={1} amplitude={0.1} irregularity={0} />
        </div>
      );
}

export default Page;
