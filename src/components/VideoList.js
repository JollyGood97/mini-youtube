import React from "react";
import VideoItem from "./VideoItem";
import "../style/video.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const VideoList = ({
  videos,
  handleVideoSelect,
  isTileView,
  handleSaveVideo,
  bookmarked,
}) => {
  const renderedVideos =
    videos &&
    videos.map((video) => {
      return (
        <VideoItem
          key={video.id.videoId}
          video={video}
          handleVideoSelect={handleVideoSelect}
          handleSaveVideo={handleSaveVideo}
          isTileView={isTileView}
          bookmarked={bookmarked}
        />
      );
    });

  return isTileView ? (
    <Row>{renderedVideos}</Row>
  ) : (
    <div className="list">{renderedVideos}</div>
  );
};
export default VideoList;
