import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesInArchive";

export const NotesCard = ({ id, title, text, isPinned }) => {

    const { notesDispatch, archive } = useNotes();

    const isNotesInArchive = findNotesInArchive(archive, id)

    const onPinClick = (id) => {
        !isPinned ? notesDispatch(
            {
                type: 'PIN',
                payload: { id }
            }) : notesDispatch({
                type: 'UNPIN',
                payload: { id }
            })
    }

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ADD_TO_ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_ARCHIVE',
            payload: { id }
        })
    }



    return (
        <div className="w-56 border border-neutral-800 p-2 rounded-md w-[300px]" key={id}>
            <div className="flex justify-between border-b-2">
                <p>{title}</p>
                {
                    !isNotesInArchive ? <button onClick={() => onPinClick(id)}>
                        <span className={isPinned ? 'material-icons' : 'material-icons-outlined'}>
                            push_pin
                        </span>
                    </button> : <></>
                }

            </div>
            <div className="flex flex-col">
                <p>{text}</p>
                <div className="ml-auto">
                    <button onClick={() => onArchiveClick(id)}>
                        <span class={isNotesInArchive ? 'material-icons' : 'material-icons-outlined'}>
                            archive
                        </span>
                    </button>
                    <button>
                        <span class="material-icons-outlined">
                            delete_outline
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}