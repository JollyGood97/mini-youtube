import React from "react";
import "../style/video.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const VideoItem = ({
  video,
  handleVideoSelect,
  isTileView,
  handleSaveVideo,
  bookmarked,
}) => {
  return (
    <>
      {isTileView ? (
        <Col>
          <div
            onClick={() => handleVideoSelect(video)}
            className="video-item item"
          >
            <img
              className="list-item"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.description}
            />
            <div className="content">
              <div className="tile-text-box">{video.snippet.title}</div>
            </div>
            <Button
              variant="warning"
              type="submit"
              onClick={() => handleSaveVideo(video)}
            >
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </Col>
      ) : (
        <div
          onClick={() => handleVideoSelect(video)}
          className="video-item item"
        >
          <img
            className="list-item"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.description}
          />
          <div className="content">
            <div className="text-box">{video.snippet.title}</div>
          </div>
          <Button
            variant="warning"
            type="submit"
            onClick={() => handleSaveVideo(video)}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      )}
    </>
  );
};
export default VideoItem;
