export default class ImageEdits {
	constructor(imageSrc, width, height) {
		this.image = new Image();
		this.image.src = imageSrc;
		this.cWidth = width;
		this.cHeight = height;
	}

	getBakedImage = canvas => {
		const dataURL = canvas.toDataURL();

		const image = new Image();
		image.src = dataURL;
		document.getElementsByTagName("body")[0].append(image);
		document.getElementsByTagName("a")[0].download = "Profile.png";
		document.getElementsByTagName("a")[0].href = dataURL;
	};

	computeImageConfig = () => {
		const height = this.image.naturalHeight;
		const width = this.image.naturalWidth;

		const aspectRatio = width / height;
		let imgStyle = {},
			scale = 1,
			canvasStyle = {};

		const scaleX = this.cWidth / width;
		// const scaleY = this.cHeight / height;

		scale = scaleX;
		// if (scaleX > scaleY) scale = scaleY;
		// else scale = scaleX;

		canvasStyle = { height, width, scale };
		// If greater than One
		if (aspectRatio < 1) {
			imgStyle = { height: "100%", width: "auto" };
			return { imgStyle, canvasStyle };
		}

		// If less than One
		if (aspectRatio > 1) {
			imgStyle = { height: "auto", width: "100%" };
			return { imgStyle, canvasStyle };
		}

		imgStyle = { height: "auto", width: "100%" };

		return { imgStyle, canvasStyle };
	};
	computeAspectRatio = (type, src) => {
		let aspectRatio;

		return new Promise((resolve, reject) => {
			try {
				if (type === "video") {
					const video = document.createElement("video");
					video.autoplay = true;
					video.onloadedmetadata = () => {
						aspectRatio = video.videoWidth / video.videoHeight;
						resolve(aspectRatio);
					};
					video.src = src;

					return;
				}

				const image = new Image();
				image.onload = () => {
					aspectRatio = image.naturalWidth / image.naturalHeight;
					resolve(aspectRatio);
				};
				image.src = src;
			} catch (error) {
				reject(error);
			}
		});
	};

	reduceImage = src => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const image = new Image();

		return new Promise((resolve, reject) => {
			try {
				image.onload = () => {
					const aspectRatio = image.naturalWidth / image.naturalHeight;
					const width = 20,
						height = width / aspectRatio;
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(image, 0, 0, width, height);
					resolve(canvas.toDataURL("image/jpeg", 0.9));
				};

				image.src = src;
			} catch (error) {
				reject(error);
			}
		});
	};
}
