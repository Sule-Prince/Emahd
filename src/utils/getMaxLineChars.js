const getMaxLineChars = ({ fontFamily, fontSize, width }) => {
  const targetWidth = width || window.innerWidth; // line width
  let text =
    "Lorem ipsum. I want to know how many chars of this text fit, I'll also like to know if it works well.";

  let span = document.createElement("span");
  document.body.appendChild(span);
  span.style.whiteSpace = "nowrap";
  // define the style
  span.style.fontFamily = fontFamily;
  span.style.fontSize =
    typeof fontSize === "number" ? fontSize + "px" : fontSize;
  span.style.padding = "0px";

  let fit = text.length;
  for (let i = 0; i < fit; ++i) {
    span.innerHTML += text[i];
    if (span.offsetWidth > targetWidth) {
      fit = i - 1;
      break;
    }
  }

  document.body.removeChild(span);

  return fit;
};

window.getMaxLineChars = getMaxLineChars;
console.log("Just testing 1");

export default getMaxLineChars;
