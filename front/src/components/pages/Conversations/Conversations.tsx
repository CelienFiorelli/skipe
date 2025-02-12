import { ConversationsSidebar } from '../../organisms';
import { useAuth } from '../../../contexts/AuthContext';
import { GroupCreationModale } from '../../molecules';
import { useEffect, useRef, useState } from 'react';
import { createGroup, getGroups } from '../../../services/GroupsService';
import { GroupType } from '../../../typings/GroupType';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageType } from '../../../typings/MessageType';
import { getMessages } from '../../../services/messages';
import { Box, CircularProgress } from '@mui/material';
import { Typography } from '../../atoms';
import './Conversations.css';

const Conversations = () => {
	const { logout, user } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const [refreshGroups, setRefreshGroups] = useState(0);

	const [groups, setGroups] = useState<Array<GroupType>>([]);
	const [currentGroup, setCurrentGroup] = useState<GroupType | null>(null);
	const [messages, setMessages] = useState<Array<MessageType>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [messageLoading, setMessageLoading] = useState<boolean>(false);
	const [messageBoundary, setMessageBoundary] = useState<any>({
		first: null,
		last: null,
	});
	const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [fileName, setFileName] = useState<string>("");
	const [messageContent, setMessageContent] = useState<string>("");
	const [groupCreationModaleOpen, setGroupCreationModaleOpen] = useState(false);
	const [groupCreationModaleLoading, setGroupCreationModaleLoading] = useState(false);
	const [groupCreationModaleError, setGroupCreationModaleError] = useState(false);

	const selectGroup = async (group: GroupType) => {
		setMessages([]);
		setCurrentGroup(group);
		if (!id || parseInt(id) !== group.id) {
			navigate(`/conversations/${group.id}`);
		}
		const messagesData = await getMessages(group.id);
		setMessages(messagesData.messages);
		setMessageBoundary({
			first: messagesData.firstMessageId,
			last: messagesData.lastMessageId,
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
		} catch (error) {
			setGroupCreationModaleError(true);
		} finally {
			setGroupCreationModaleLoading(false);
		}
	}

	useEffect(() => {
		(async () => {
			const fetchGroups = await getGroups();
			setGroups(fetchGroups);
			if (groups.length) {
				selectGroup(
					fetchGroups.find((g: GroupType) => g.id.toString() === id) ||
					fetchGroups[0]
				);
			}

			setLoading(false);
		})();
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
				<Box flexGrow='1' padding='20px'>
					{loading ?
						(<Box display='flex' justifyContent='center' alignItems='center' height='100%'><CircularProgress /></Box>)
						:
						(<>{groups.length ?
							<h1>Contenu principal</h1>
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