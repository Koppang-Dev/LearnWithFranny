"use client";
import { useEffect, useRef, useState } from "react";

const RecordingView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });

  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight / 2,
      });
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);

    if (window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setTranscript(transcript);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
      };

      recognitionRef.current.start();
      initAudio();
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const initAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        bufferLengthRef.current = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLengthRef.current);

        draw();
      })
      .catch((err) => {
        console.log("Error accessing microphone", err);
      });
  };

  const draw = () => {
    if (analyserRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const barWidth = width / bufferLengthRef.current;
      let x = 0;

      const centerY = canvas.height;

      ctx.strokeStyle = "rgba(128, 0, 128, 0.8)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let i = 1; i < bufferLengthRef.current; i++) {
        const value = dataArrayRef.current[i];
        const y = centerY - value;
        ctx.lineTo(x + barWidth, y);
        x += barWidth;
      }

      ctx.stroke();
      requestAnimationFrame(draw);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    !isRecording ? startRecording() : stopRecording();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 p-4">
      <div className="max-w-lg w-full">
        {(isRecording || transcript) && (
          <div className="rounded-lg shadow-lg p-6 bg-white mb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xl font-semibold">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-gray-600">
                  {recordingComplete
                    ? "Thanks for talking..."
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>
          </div>
        )}

        {transcript && (
          <div className="border rounded-lg shadow p-4 bg-gray-50 mb-6">
            <p className="text-gray-800">{transcript}</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="mx-auto mt-6 rounded-lg shadow-lg bg-gray-200"
        />

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleToggleRecording}
            className={`rounded-full w-20 h-20 flex items-center justify-center ${
              isRecording
                ? "bg-red-400 hover:bg-red-500"
                : "bg-blue-400 hover:bg-blue-500"
            } transition-colors duration-200 ease-in-out shadow-lg`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              viewBox={isRecording ? "0 0 18 24" : "0 0 1024 1024"}
            >
              <path
                fill="currentColor"
                d={
                  isRecording
                    ? "M4.801 23.999h-3.6a1.202 1.202 0 0 1-1.2-1.2v-21.6c0-.663.537-1.2 1.2-1.201h3.6a1.202 1.202 0 0 1 1.2 1.2v21.6c0 .663-.537 1.2-1.2 1.201zm11.999 0h-3.6a1.2 1.2 0 0 1-1.2-1.2V1.198a1.2 1.2 0 0 1 1.2-1.2h3.6a1.2 1.2 0 0 1 1.2 1.2v21.6a1.2 1.2 0 0 1-1.2 1.2z"
                    : "M510.88 704h7.6C607.44 704 672 638.4 672 548.032V166.624C672 73.184 604.56 0 518.466 0h-7.584C423.264 0 352 74.752 352 166.624v381.408C352 636.944 420.304 704 510.88 704zM416 166.624C416 110.032 458.56 64 510.88 64h7.6C569.504 64 608 108.128 608 166.624v381.408C608 603.024 572.032 640 518.464 640h-7.584c-55.872 0-94.88-37.808-94.88-91.968zM800 352c-17.68 0-32 14.336-32 32v133.072c0 190.4-67.968 282.929-207.744 282.929H465.12c-182.8 0-209.12-153.84-209.12-282.928V384.001c0-17.664-14.336-32-32-32s-32 14.336-32 32v133.072c0 220.496 91.888 346.928 273.12 346.928H480v96H320c-17.664 0-32 14.336-32 32s14.336 32 32 32h384c17.664 0 32-14.336 32-32s-14.336-32-32-32H544v-96h16.256C684.224 864.001 832 803.809 832 517.072V384c0-17.664-14.336-32-32-32z"
                }
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingView;
