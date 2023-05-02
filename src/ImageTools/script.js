const inputElement = document.getElementById("image-upload");
const convertButton = document.getElementById("convert-button");
const canvas = document.getElementById("canvas");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

inputElement.addEventListener("change", () => {
  const file = inputElement.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    };
  };
});

convertButton.addEventListener("click", () => {
  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: canvas.width,
    height: canvas.height,
  });

  gif.on("progress", (p) => {
    progressBar.value = p * 100;
    progressText.innerText = `${Math.round(p * 100)}%`;
  });

  gif.on("finished", (blob) => {
    saveAs(blob, "animation.gif");
  });

  gif.addFrame(canvas, { delay: 100 });
  gif.render();
});
