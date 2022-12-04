import './loading/ball-elastic.css';
import './loading/ball-clip.css';
import './loading/ball-clip-two.css';

function BallElastic() {
  return (
    <div className='la-ball-elastic-dots la-2x'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function BallClip() {
  return (
    <div className="la-ball-clip-rotate-pulse la-3x">
      <div></div>
      <div></div>
    </div>
  );
}

export default function LoadingX(props) {
  switch (props.type) {
  case 'ball-elastic':
    return <BallElastic />;
  case 'ball-clip':
    return <BallClip />;
  default:
    return <BallElastic />;
  }
}
