import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import Search from "./components/Search";
import youtube from "./apis/youtube";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import exportFromJSON from "export-from-json";

const fileName = "download";
const exportType = "json";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [tileView, setTileView] = useState(false);
  const [savedVideo, setSavedVideo] = useState([]);

  useEffect(() => {
    if (localStorage["videos"]) {
      setSavedVideo(JSON.parse(window.localStorage.getItem("videos")));
    }
  }, []);

  useEffect(() => {
    if (savedVideo.length !== 0) {
      window.localStorage.setItem("videos", JSON.stringify(savedVideo));
    }
  }, [savedVideo]);

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    setMovies(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleSaveVideo = (video) => {
    setSavedVideo([...savedVideo, video]);
  };

  const switchView = () => {
    setTileView(!tileView);
  };

  const exportToJson = () => {
    let data = movies;
    exportFromJSON({ data, fileName, exportType });
  };

  const clearBookmarks = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);

      var obj = JSON.parse(e.target.result);
      var res = [];

      for (var i in obj) res.push(obj[i]);
      setMovies(res);
    };
  };

  return (
    <div className="App">
      <Header text="Mini Youtube" />
      <Search search={handleSubmit} />
      <Row>
        <Col>
          {savedVideo.length !== 0 && (
            <div className="switch">
              <Button variant="outline-dark" onClick={clearBookmarks}>
                Clear Bookmarks
              </Button>
            </div>
          )}
        </Col>
        <Col>
          {movies.length !== 0 && (
            <div className="switch">
              <Button variant="outline-dark" onClick={switchView}>
                Switch View
              </Button>
            </div>
          )}
        </Col>
        <Col>
          <div className="switch">
            <input type="file" onChange={handleChange} />
          </div>
        </Col>
        <Col>
          {movies.length !== 0 && (
            <div className="switch">
              <Button variant="outline-dark" onClick={exportToJson}>
                Export as JSON
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <div className="movies">
        {tileView ? (
          <>
            {savedVideo && (
              <VideoList
                videos={savedVideo}
                handleVideoSelect={handleVideoSelect}
                handleSaveVideo={handleSaveVideo}
                isTileView={tileView}
                bookmarked={true}
              />
            )}
            {movies && (
              <VideoList
                videos={movies}
                handleVideoSelect={handleVideoSelect}
                handleSaveVideo={handleSaveVideo}
                isTileView={tileView}
                bookmarked={false}
              />
            )}
          </>
        ) : (
          <Col xs="2">
            {savedVideo && (
              <VideoList
                videos={savedVideo}
                handleVideoSelect={handleVideoSelect}
                handleSaveVideo={handleSaveVideo}
                isTileView={tileView}
                bookmarked={true}
              />
            )}
            {movies && (
              <VideoList
                videos={movies}
                handleVideoSelect={handleVideoSelect}
                handleSaveVideo={handleSaveVideo}
                isTileView={tileView}
                bookmarked={false}
              />
            )}
          </Col>
        )}

        <Col xs="10">
          {selectedVideo && (
            <VideoDetail
              videoId={selectedVideo.id.videoId}
              title={selectedVideo.snippet.title}
              description={selectedVideo.snippet.description}
            />
          )}
        </Col>
      </div>
    </div>
  );
};

export default App;
