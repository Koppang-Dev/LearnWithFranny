"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const RecordingView = () => {
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const recognitionRef = useRef(null);

  // Starts recording
  const startRecording = () => {
    setIsRecording(true);

    // Check if webkitSpeechRecognition is available
    if (window.webkitSpeechRecognition) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setTranscript(transcript);
      };

      recognitionRef.current.start();
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  //
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Stop recordingComplete
  const stopRecoridng = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecoridng;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      {/* Transcript Selection */}
      <div className="w-full">
        {[isRecording || transcript] && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm">
                  {recordingComplete
                    ? "Thanks for talking..."
                    : "Start Speaking..."}
                </p>
              </div>
            </div>
            {isRecording && (
              <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
            )}
          </div>
        )}
        {transcript && (
          <div className="border rounded-md p-2 mt-4">
            <p className="mb-0">{transcript}</p>
          </div>
        )}

        {/* Button Section */}
        <div className="flex items-center w-full">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className="rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                viewBox="0 0 18 24"
              >
                <path
                  fill="currentColor"
                  d="M4.801 23.999h-3.6a1.202 1.202 0 0 1-1.2-1.2v-21.6c0-.663.537-1.2 1.2-1.201h3.6a1.202 1.202 0 0 1 1.2 1.2v21.6c0 .663-.537 1.2-1.2 1.201zm11.999 0h-3.6a1.2 1.2 0 0 1-1.2-1.2V1.198a1.2 1.2 0 0 1 1.2-1.2h3.6a1.2 1.2 0 0 1 1.2 1.2v21.6a1.2 1.2 0 0 1-1.2 1.2z"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className="rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 "
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M510.88 704h7.6C607.44 704 672 638.4 672 548.032V166.624C672 73.184 604.56 0 518.466 0h-7.584C423.264 0 352 74.752 352 166.624v381.408C352 636.944 420.304 704 510.88 704zM416 166.624C416 110.032 458.56 64 510.88 64h7.6C569.504 64 608 108.128 608 166.624v381.408C608 603.024 572.032 640 518.464 640h-7.584c-55.872 0-94.88-37.808-94.88-91.968zM800 352c-17.68 0-32 14.336-32 32v133.072c0 190.4-67.968 282.929-207.744 282.929H465.12c-182.8 0-209.12-153.84-209.12-282.928V384.001c0-17.664-14.336-32-32-32s-32 14.336-32 32v133.072c0 220.496 91.888 346.928 273.12 346.928H480v96H320c-17.664 0-32 14.336-32 32s14.336 32 32 32h384c17.664 0 32-14.336 32-32s-14.336-32-32-32H544v-96h16.256C684.224 864.001 832 803.809 832 517.072V384c0-17.664-14.32-32-32-32z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingView;
