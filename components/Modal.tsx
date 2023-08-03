import { Video } from "@/lib/types";
import { MutableRefObject } from "react";

interface Props {
  trailer: Video;
  modalRef: MutableRefObject<HTMLDialogElement | null>;
}

export default function Modal({ trailer, modalRef }: Props) {
  return (
    <dialog ref={modalRef} className="modal">
      <form method="dialog" className="modal-box max-w-none w-[80vw] h-screen p-0 pt-6">
        <iframe
          key={trailer.key}
          id="ytplayer"
          src={`http://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
          allowFullScreen
          className="w-full h-full"
        />
        <button className="btn btn-circle absolute right-0 top-0">✕</button>
      </form>
    </dialog>
  );
}
