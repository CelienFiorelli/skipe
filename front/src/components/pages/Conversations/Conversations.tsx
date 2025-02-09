import "./Conversations.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Conversation, Message } from "../../organisms";
import { createMessage, getConversations, getMessages } from "../../../services/messages";
import { ConversationType } from "../../../typings/ConversationType";
import { MessageType } from "../../../typings/MessageType";
import { IoMdSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { timestampFormat } from "../../../services/FormatterService";
import { useAuth } from "../../../contexts/AuthContext";

const Conversations: React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<Array<ConversationType>>([]);
    const [currentConversation, setCurrentConversation] = useState<ConversationType | null>(null);
    const [pageIsLoad, setPageIsLoad] = useState<boolean>(false);
    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const [messageBoundary, setMessageBoundary] = useState<any>({
        first: null,
        last: null,
    });
    const [messageIsLoading, setMessageIsLoading] = useState<boolean>(false);
    const [messageContent, setMessageContent] = useState<string>("");
    const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const selectConversation = async (conversation: ConversationType) => {
        setMessages([]);
        setCurrentConversation(conversation);
        if (!id || parseInt(id) !== conversation.id) {
            navigate(`/conversations/${conversation.id}`);
        }
        const messagesData = await getMessages(conversation.id);
        setMessages(messagesData.messages);
        setMessageBoundary({
            first: messagesData.firstMessageId,
            last: messagesData.lastMessageId,
        });
    };

    const sendMessage = async () => {
        if (!messageContent.replaceAll(" ", "") || !currentConversation) return;
        await createMessage(currentConversation.id, messageContent);
        setMessageContent("");
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    };

    const textAreaPress = (e: any) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleScroll = async (e: any) => {
        if (!currentConversation) return;
        if (messages[messages.length - 1].id !== messageBoundary.first && !messageIsLoading && e.target.scrollHeight - e.target.clientHeight - Math.abs(e.target.scrollTop) < 500) {
            // Scroll up
            setMessageIsLoading(true);
            const nextMessages = await getMessages(currentConversation.id, {
                beforeId: messages[messages.length - 1].id,
            });

            setMessageBoundary({
                first: nextMessages.firstMessageId,
                last: nextMessages.lastMessageId,
            });
            setMessages((messages) => {
                messages.splice(
                0,
                messages.length + nextMessages.messages.length - 100
                );
                return [...messages, ...nextMessages.messages];
            });
            setMessageIsLoading(false);
        } else if (messages[0].id !== messageBoundary.last && !messageIsLoading && Math.abs(e.target.scrollTop) < 500) {
            // Scroll down
            setMessageIsLoading(true);
            const nextMessages = await getMessages(currentConversation.id, {
                afterId: messages[0].id,
            });
            setMessageBoundary({
                first: nextMessages.firstMessageId,
                last: nextMessages.lastMessageId,
            });

            setMessages((messages) => {
                messages.splice(100 - nextMessages.messages.length);
                return [...nextMessages.messages, ...messages];
            });
            setMessageIsLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            const fetchConversations = await getConversations();
            setConversations(fetchConversations);
            if (fetchConversations.length) {
                selectConversation(
                fetchConversations.find((c: any) => c.id === id) ||
                    fetchConversations[0]
                );
            }

            setPageIsLoad(true);
        })();
    }, []);

    return (
        <div className="conversations-container">
            <div className="conversations-list">
                {conversations.map((conversation) => {
                    return (
                        <Conversation key={conversation.id}
                                      conversation={conversation}
                                      isSelected={currentConversation !== null && currentConversation.id === conversation.id}
                                      onClick={selectConversation} />
                    );
                })}
            </div>
            <div className="messages-container">
                {messages && (
                    <div className="messages-wrapper">
                        {conversations.length > 0 && currentConversation ? (
                            <>
                                <div className="message-reveicer">
                                    { currentConversation.seller.name }
                                </div>
                                <div className="messages-padding">
                                    <div onScroll={handleScroll} className="messages-scroll">
                                        {messages.map((message, i) => {
                                            return (
                                                <div key={message.id}>
                                                    {messageBoundary.first === message.id && (
                                                        <div className="conversation-start">
                                                            <div className="conversation-title">
                                                            Bonjour,
                                                            </div>
                                                            <div className="conversation-info">
                                                            Ceci est le début de votre conversation avec {currentConversation.buyer.name}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(i === messages.length - 1 ||
                                                        (i <= messages.length - 1 &&
                                                            new Date(message.createdAt).toLocaleString("fr", {
                                                            hour12: false,
                                                            dateStyle: "short",
                                                            }) !==
                                                            new Date(messages[i + 1].createdAt).toLocaleString("fr", {
                                                                hour12: false,
                                                                dateStyle: "short",
                                                            }))) && (
                                                        <div className="date-divider">
                                                            <div className="divider-line"></div>
                                                            <div>{timestampFormat(message.createdAt)}</div>
                                                            <div className="divider-line"></div>
                                                        </div>
                                                    )}
                                                    <Message message={message}
                                                            withAvatar={
                                                                i === messages.length - 1 ||
                                                                (i <= messages.length - 1 &&
                                                                message.sender.id !==
                                                                    messages[i + 1].sender.id) ||
                                                                new Date(message.createdAt).toLocaleString("fr", {
                                                                hour12: false,
                                                                dateStyle: "short",
                                                                }) !==
                                                                new Date(messages[i + 1].createdAt).toLocaleString("fr", {
                                                                    hour12: false,
                                                                    dateStyle: "short",
                                                                })
                                                            }
                                                            isCurrentUser={!!user && user.id === message.sender.id} />
                                                </div>
                                            );
                                        })}
                                    </div>
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
                                                onChange={(e) => setFileName(e.target.value)} />
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
                                                className="message-input"></textarea>
                                        <button className="send-button"
                                                onClick={sendMessage}>
                                            <IoMdSend size={20} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {pageIsLoad && (
                                <div className="no-conversation">
                                    <div>
                                    <div className="no-conversation-title">
                                        Aucune conversation
                                    </div>
                                    <div className="no-conversation-info">
                                        Voir les offres
                                    </div>
                                    </div>
                                </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversations;
