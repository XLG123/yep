import  ReactLoading from 'react-loading';
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="loading-container">
        <div>
          <span className='loading-content loading-title'>Food Is Coming!</span>
          <ReactLoading type="bubbles" color="#E00707" width="8vw"
          className='loading-content loading-animation'/>
        </div>
      </div>
    </>
  );
}

export default Loading;