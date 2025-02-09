import { useRef, useState, FC } from "react";
import { MessageType } from "../../../typings/MessageType";
import { deleteMessage, editMessage } from "../../../services/messages";
import Avatar from "../../atoms/Avatar/Avatar";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import "./Message.css";
import { timestampFormat } from "../../../services/FormatterService";

type MessageProps = {
    message: MessageType;
    withAvatar: boolean;
    isCurrentUser: boolean;
};

export const Message: FC<MessageProps> = ({ message, withAvatar, isCurrentUser }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const messageContentRef = useRef<HTMLDivElement | null>(null);

    const editMessageAction = async (e: any) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            await saveEdit()
        } else if (messageContentRef && messageContentRef.current && e.keyCode === 27) {
            messageContentRef.current.innerText = message.content
            setIsEditable(false)
        }
    }

    const saveEdit = async () => {
        setIsEditable(false)
        if (!messageContentRef || !messageContentRef.current || messageContentRef.current.innerText === message.content) return;
        await editMessage(message.id, { content: messageContentRef.current.innerText })
    }

    const deleteMessageAction = async () => {
        await deleteMessage(message.id)
    }

    return (
        <div className={`message-container ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`message-item ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                {withAvatar ?
                    <Avatar url={null} size={12} />
                :
                    <div style={{ width: 48, height: 48 }}></div>
                }
                <div className="message-content-wrapper" 
                     onMouseEnter={() => setIsHover(true)} 
                     onMouseLeave={() => setIsHover(false)}>
                    <div key={message.id} className={`message-content ${isCurrentUser ? 'message-content-current-user' : 'message-content-other-user'} ${isEditable ? 'message-content-editable' : ''}`}>
                        <div contentEditable={isEditable} className="message-content-text" onKeyDown={editMessageAction} ref={messageContentRef}>
                            {message.content}
                        </div>
                    </div>
                    <div className={`message-timestamp ${isCurrentUser ? 'message-timestamp-current-user' : ''}`}>
                        {timestampFormat(message.createdAt)}{message.isUpdated && ' - modifié'}
                    </div>
                    {isHover && isCurrentUser &&
                        <div className="message-actions-wrapper">
                            {!isEditable ?
                                <>
                                    <div className="message-action message-action-edit" onClick={() => setIsEditable(!isEditable)}>
                                        <FaPen size={14} />
                                    </div>
                                    <div className="message-action message-action-delete" onClick={deleteMessageAction}>
                                        <FaTrash size={14} />
                                    </div>
                                </>
                                :
                                <div className="message-action message-action-check" onClick={saveEdit}>
                                    <FaCheck size={14} />
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Message;
