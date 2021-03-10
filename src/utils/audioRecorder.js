import IDGenerator from "./IDGenerator";

export const audioRecorder = async (
	recorder,
	setAudio,
	setIsRecording,
	audioStream
) => {
	let chunks = [];
	setIsRecording(true);

	recorder.current = window.recorder = new MediaRecorder(audioStream.current);
	recorder.current.ondataavailable = e => chunks.push(e.data);

	recorder.current.onstop = () => {
		setIsRecording(false);

		const blob = new Blob(chunks, { type: "audio/mp3" });
		const src = new File([blob], `emahd-AUD-${IDGenerator(7)}.mp3`, {
			type: "audio/mp3",
			lastModified: Date.now(),
		});
		setAudio(prev => ({
			...prev,
			src,
			size: blob.size / 1048576,
		}));
	};
	recorder.current.start();
};
