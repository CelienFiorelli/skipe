import { FC } from "react";
import { Box } from "@mui/material";
import { Button } from "../../atoms";
import { PiPlusCircleFill } from "react-icons/pi";
import { GroupInfos, NameWithPopover } from "../../molecules";
import { GroupType } from "../../../typings/GroupType";
import "./ConversationsSidebar.css";

interface ConversationsSidebarProps {
	name: string;
	onLogout: () => void;
	onGroupCreation: () => void;
	style?: React.CSSProperties;
	loading: boolean;
	groups: Array<GroupType>;
	selectedGroup: GroupType | null;
	onNewGroupSelected: (group: GroupType) => void;
}

const ConversationsSidebar: FC<ConversationsSidebarProps> = ({
	name,
	onLogout,
	onGroupCreation,
	style,
	loading,
	groups,
	selectedGroup,
	onNewGroupSelected,
}) => {
	return (
		<div style={{ background: "white", borderRight: "1px black solid" }}>
			<Box style={style} display="flex" flexDirection="column">
				<NameWithPopover name={name} logoutCallback={onLogout} />
			</Box>
			<Box className="group-list" display="flex" flexDirection="column" sx={{ mt: 2 }}>
				{groups.map((group: GroupType) => (
					<GroupInfos group={group} isSelected={selectedGroup?.id == group.id} onClick={onNewGroupSelected} key={group.id} />
				))}
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Button
					variant="contained"
					color="info"
					onClick={onGroupCreation}
					sx={{ mt: 2 }}
					loading={loading}
				>
					<PiPlusCircleFill
						fontSize="1.5rem"
						style={{ marginRight: "0.5rem" }}
					/>
					Créer un groupe
				</Button>
			</Box>
		</div>
	);
};

export default ConversationsSidebar;