import { ConversationBody, ConversationsSidebar } from '../../organisms';
import { useAuth } from '../../../contexts/AuthContext';
import { GroupCreationModale } from '../../molecules';
import { useEffect, useRef, useState } from 'react';
import { createGroup, getGroups } from '../../../services/GroupsService';
import { GroupType } from '../../../typings/GroupType';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageType } from '../../../typings/MessageType';
import { createMessage, getMessages } from '../../../services/messages';
import { Box, CircularProgress } from '@mui/material';
import { Typography } from '../../atoms';
import Echo from '../../../services/EchoService';

const Conversations = () => {
	const { logout, user } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const [refreshGroups, setRefreshGroups] = useState(0);

	const [loading, setLoading] = useState<boolean>(true);
	const [groups, setGroups] = useState<Array<GroupType>>([]);
	const [currentGroup, setCurrentGroup] = useState<GroupType | null>(null);
	const [messages, setMessages] = useState<Array<MessageType>>([]);
	const [messageLoading, setMessageLoading] = useState<boolean>(false);
	const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [fileName, setFileName] = useState<string>("");
	const [messageContent, setMessageContent] = useState<string>("");
	const [groupCreationModaleOpen, setGroupCreationModaleOpen] = useState(false);
	const [groupCreationModaleLoading, setGroupCreationModaleLoading] = useState(false);
	const [groupCreationModaleError, setGroupCreationModaleError] = useState(false);

	const sendMessage = async () => {
		setMessageLoading(true);
		if (!messageContent.replaceAll(" ", "") || !currentGroup) return;
        await createMessage(currentGroup.id, messageContent);
        setMessageContent("");
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
		setMessageLoading(false);
    };

	const selectGroup = async (group: GroupType) => {
		if (currentGroup) {
			console.log('leave');
			Echo.leave(`group.${currentGroup.id}`);
		}
		setMessages([]);
		setCurrentGroup(group);
		if (!id || parseInt(id) !== group.id) {
			navigate(`/conversations/${group.id}`);
		}
		const messagesData = await getMessages(group.id);
		setMessages(messagesData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) ?? []);
		
		Echo.private(`group.${group.id}`)
			.listen('.message.create', (response: any) => {
				setMessages((messages) => [response.message, ...messages])
			}).listen('.message.update', (response: any) => {
				setMessages((messages) => {
					const index = messages.findIndex((message) => response.message.id === message.id)
					messages[index] = response.message
					return [...messages]
				})
			}).listen('.message.delete', (response: any) => {
				setMessages((messages) => {
					return messages.filter(message => message.id !== response.messageId)
				})
			});
		
	};

	const openGroupCreationModale = () => setGroupCreationModaleOpen(true);

	const createNewGroup = async (name: string, userIdList: string) => {		
		try {
			if (groupCreationModaleError) setGroupCreationModaleError(false);
			setGroupCreationModaleLoading(true);
			await createGroup(name, userIdList);
			setGroupCreationModaleOpen(false);
			setRefreshGroups(prev => prev + 1);
		} catch {
			setGroupCreationModaleError(true);
		} finally {
			setGroupCreationModaleLoading(false);
		}
	}

	useEffect(() => {
		(async () => {
			const fetchGroups = await getGroups();
			setGroups(fetchGroups);
			if (fetchGroups.length) {
				selectGroup(
					fetchGroups.find((g: GroupType) => g.id.toString() === id) ||
					fetchGroups[0]
				);
			}

			setLoading(false);
		})();

		return () => {
			if (currentGroup) {
				Echo.leave(`group.${currentGroup.id}`)
			}
		}
	}, [refreshGroups]);

	return (<>
		<div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
			<ConversationsSidebar
				name={user?.pseudo || 'Anonyme'}
				onLogout={logout}
				onGroupCreation={openGroupCreationModale}
				style={{ minWidth: '300px' }}
				loading={loading}
				groups={groups}
				selectedGroup={currentGroup}
				onNewGroupSelected={selectGroup} />

			<Box flexGrow='1' display='flex' flexDirection='column'>
				<Box flexGrow='1'>
					{loading ?
						(<Box display='flex' justifyContent='center' alignItems='center' height='100%'><CircularProgress /></Box>)
						:
						(<>{groups.length && currentGroup ?
							<ConversationBody
								currentGroup={currentGroup!} 
								messages={messages}
								messageContent={messageContent} 
								setMessageContent={setMessageContent}
								messageLoading={messageLoading} 
								onMessageSend={sendMessage}
								fileInputRef={fileInputRef}
								fileName={fileName}
								messageInputRef={messageInputRef}
								setFileName={setFileName} />
							:
							(<Box display='flex' justifyContent='center' alignItems='center' height='100%'>
								<Typography variant='h5'>Vous ne faites partie d'aucun groupe. Créez un groupe ou faites vous inviter.</Typography>
							</Box>)
						}</>)
					}
				</Box>
			</Box>
		</div>
		<GroupCreationModale open={groupCreationModaleOpen} setOpen={setGroupCreationModaleOpen} onGroupCreation={createNewGroup} error={groupCreationModaleError} loading={groupCreationModaleLoading} />
	</>);
};

export default Conversations;