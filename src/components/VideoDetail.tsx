import "./../style/video.css";
import Container from "react-bootstrap/Container";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const VideoDetail = (props: Props) => {
  const { videoId, title, description } = props;
  if (!videoId) {
    return <div></div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Container>
      <div className="embed">
        <iframe
          src={videoSrc}
          allowFullScreen
          title="Video player"
          className="embed"
        />
      </div>
      <div className="video-detail-desc">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </Container>
  );
};

export default VideoDetail;
