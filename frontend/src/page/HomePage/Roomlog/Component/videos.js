import React, { useEffect, useState } from "react";
import Video from "./video";

const Videos = ({ remoteStreams, themeValue }) => {
  const [rVideos, setRVideos] = useState([]);
  // const [remoteStreamsList, setRemoteStreamsList] = useState([]);

  useEffect(() => {
    //    const NoOfRemoteStreams = remoteStreams.length;
    let _rVideos = remoteStreams.map((rVideo, index) => {
      const _videoTrack = rVideo.stream
        .getTracks()
        .filter((track) => track.kind === "video");

      let video = (_videoTrack && (
        //memory leak
        <Video
          videoMuted={videoMuted}
          videoType="remoteVideo"
          videoStream={rVideo.stream}
          videoStyles={{
            objectFit: "cover",
            width: 125,
            maxWidth: 125,
            borderRadius: 5,
          }}
          frameStyle={{
            width: 125,
            margin: 5,
            borderRadius: 5,
            backgroundColor: `${themeValue.shadeColorInput}`,
          }}
        />
      )) || <div></div>;

      return (
        <div
          id={rVideo.name}
          style={{
            display: "inline-block",
          }}
          key={index}
        >
          {video}
        </div>
      );
    });

    //setRemoteStreamsList(remoteStreams);
    setRVideos(_rVideos);
  }, [remoteStreams, themeValue]);

  const videoMuted = (rVideo) => rVideo.getVideoTracks()[0];

  return rVideos;
};

export default Videos;
