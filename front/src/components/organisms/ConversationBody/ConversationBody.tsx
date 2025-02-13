import { FC, useEffect } from "react";
import { MessageType } from "../../../typings/MessageType";
import { GroupType } from "../../../typings/GroupType";
import { IoMdSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { Message } from "..";
import { timestampFormat } from "../../../services/FormatterService";
import { useAuth } from "../../../contexts/AuthContext";
import './ConversationBody.css';
import { Typography } from "../../atoms";
import { Box } from "@mui/material";
import Echo from "../../../services/EchoService";

interface ConversationBodyProps {
	messages: MessageType[];
	onMessageSend: () => void;
	currentGroup: GroupType;
	messageContent: string;
	setMessageContent: (content: string) => void;
	messageLoading: boolean;
	fileName: string;
	setFileName: (name: string) => void;
	fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
	messageInputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

const ConversationBody: FC<ConversationBodyProps> = ({ messages, onMessageSend, currentGroup, messageContent, messageLoading, setMessageContent, fileInputRef, fileName, messageInputRef, setFileName }) => {
	const { user } = useAuth();

	const textAreaPress = (e: any) => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			onMessageSend();
		}
	};

	useEffect(() => {
		Echo.private(`group.${currentGroup.id}`)
			.listen('user.notification', (response: any) => {
				console.log("Event received:", response);
			});

		return () => {
			Echo.leave(`group.${currentGroup.id}`)
		}
	}, [currentGroup])

	return (
		<div className="messages-container">
			{messages && (
				<div className="messages-wrapper">
					<div className="message-reveicer">
						{currentGroup.name}
					</div>
					<div className="messages-padding">
						{messages.length > 0 ?
							(<div className="messages-scroll">
								{messages.map((message, i) => {
									return (
										<div key={message.id}>
											{i == messages.length - 1 && (
												<div className="conversation-start">
													<div className="conversation-title">
														Bonjour,
													</div>
													<div className="conversation-info">
														Ceci est le début de la conversation.
													</div>
												</div>
											)}
											{(i === messages.length - 1 ||
												(i <= messages.length - 1 &&
													new Date(message.created_at).toLocaleString("fr", {
														hour12: false,
														dateStyle: "short",
													}) !==
													new Date(messages[i + 1].created_at).toLocaleString("fr", {
														hour12: false,
														dateStyle: "short",
													}))) && (
													<div className="date-divider">
														<div className="divider-line"></div>
														<div>{timestampFormat(message.created_at)}</div>
														<div className="divider-line"></div>
													</div>
												)}
											<Message message={message}
												isCurrentUser={!!user && user.id === message.user.id} />
										</div>
									);
								})}
							</div>)
							:
							(<Box display="flex" justifyContent="center" height="100%">
								<Typography variant="h4" sx={{alignSelf: "center"}}>Rien à voir par ici... pour l'instant !</Typography>
							</Box>)}
					</div>
					<div className="message-input-container">
						{fileName &&
							fileInputRef.current && fileInputRef.current.files &&
							fileInputRef.current.files.length > 0 && (
								<div className="file-preview">
									<FaFileImage />
									<div className="file-name">
										{fileInputRef.current.files[0].name}
									</div>
								</div>
							)}
						<div className="input-wrapper">
							<div>
								<input type="file"
									ref={fileInputRef}
									className="file-input"
									id="file"
									onChange={(e) => setFileName(e.target.value)}
									accept=".png, .jpg, .jpeg, .svg" />
								<label htmlFor="file">
									<div className="file-button">
										<FaFileImage />
									</div>
								</label>
							</div>
							<textarea ref={messageInputRef}
								autoFocus
								onKeyDown={textAreaPress}
								value={messageContent}
								onChange={(e) => setMessageContent(e.target.value)}
								className="message-input"
								disabled={messageLoading}></textarea>
							<button className="send-button"
								onClick={onMessageSend}>
								<IoMdSend size={20} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConversationBody;