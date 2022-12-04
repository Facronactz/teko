import styles from './loading/ball-elastic.module.css';

function BallElastic() {
  return (
    <div className={styles.la_ball_elastic_dots}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default function LoadingX(props) {
  switch (props.type) {
  case 'ball-elastic':
    return <BallElastic />;
  default:
    return <BallElastic />;
  }
}
