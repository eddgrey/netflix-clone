"use client";

import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";

interface Props {
  videoKey: string;
  setVideoKey: Dispatch<SetStateAction<string>>;
  modalRef: MutableRefObject<HTMLDialogElement | null>;
}

export default function Modal({ videoKey, setVideoKey, modalRef }: Props) {
  return (
    <dialog ref={modalRef} className="modal">
      <form
        method="dialog"
        className="modal-box max-w-none w-[80vw] h-screen p-0 pt-6"
      >
        <iframe
          key={videoKey}
          id="ytplayer"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={() => setVideoKey("")}
          className="btn btn-circle absolute right-0 top-0"
        >
          ✕
        </button>
      </form>
    </dialog>
  );
}
