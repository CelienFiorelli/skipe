import { useRef, useState, FC, useEffect } from "react";
import { MessageType } from "../../../typings/MessageType";
import { deleteMessage, editMessage, getMessageImage } from "../../../services/messages";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import "./Message.css";
import { timestampFormat } from "../../../services/FormatterService";
import { Typography } from "../../atoms";
import { Box, CircularProgress } from "@mui/material";

type MessageProps = {
	message: MessageType;
	isCurrentUser: boolean;
};

export const Message: FC<MessageProps> = ({ message, isCurrentUser }) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [image, setImage] = useState("");
	const [imageIsLoading, setImageIsLoading] = useState(false);
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
		await editMessage(message.id, {
			content: messageContentRef.current.innerText,
			group_id: message.group_id
		})
	}

	const deleteMessageAction = async () => {
		await deleteMessage(message.id)
	}

	useEffect(() => {
		(async () => {
			if (!message.is_file) return;

			setImageIsLoading(true);
			const imgUrl = await getMessageImage(message.content);
			setImage(imgUrl);
			setImageIsLoading(false);
		})();
	}, []);

	return (
		<div className={`message-container ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
			<div className={`message-item ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
				<div className="message-content-wrapper"
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}>
					<Typography variant="body2" sx={isCurrentUser && { textAlign: "right" }}>{isCurrentUser ? "Moi" : message.user.pseudo}</Typography>
					<div key={message.id} className={`message-content ${isCurrentUser ? 'message-content-current-user' : 'message-content-other-user'} ${isEditable ? 'message-content-editable' : ''}`}>
						{message.is_file ?
							(<Box display="flex" justifyContent="center">{imageIsLoading ?
								(<><CircularProgress color="secondary" /></>)
								:
								(<><img src={image} style={{maxWidth: '50%'}}/></>)
							}</Box>)
							:
							(<div contentEditable={isEditable} className="message-content-text" onKeyDown={editMessageAction} ref={messageContentRef}>
								{message.content}
							</div>)}
					</div>
					<div className={`message-timestamp ${isCurrentUser ? 'message-timestamp-current-user' : ''}`}>
						{timestampFormat(message.created_at)}{message.updated_at !== message.created_at && ' - modifié'}
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
