import React from "react";

export default function DisplayStory({ story }) {
  const { type, src, text, settings } = story;
  return (
    <div>
      {type === "video" && (
        <>
          <video src={src} />
          <DisplayText text={text} settings={settings.text} />
        </>
      )}
      {type === "image" && (
        <>
          <img src={src} alt="media for story" />
          <DisplayText text={text} settings={settings.text} />
        </>
      )}
      {type === "text" && <DisplayText text={text} settings={settings.text} />}
    </div>
  );
}

const DisplayText = ({ text, settings }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}>
      <div style={settings}>{text}</div>
    </div>
  );
};
