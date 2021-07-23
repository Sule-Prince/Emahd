import IDGenerator from "./IDGenerator";

// Function converts blob data to a file
function toFile(blob, type, fileName) {
  return new File(
    [blob],
    `${fileName ? fileName : IDGenerator()}.${type.split("/")[1]}`,
    {
      type,
      lastModified: Date.now(),
    }
  );
}

export default toFile;
