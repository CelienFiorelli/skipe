import { FC } from 'react';
import { GroupType } from '../../../typings/GroupType';
import './GroupInfos.css';
import { Typography } from '../../atoms';

type GroupInfosProps = {
    group: GroupType;
    isSelected: boolean;
    onClick: (group: GroupType) => void;
};

const GroupInfos: FC<GroupInfosProps> = ({ group, isSelected, onClick }) => {
	const handleClick = () => {
		if (!isSelected) onClick(group);
	}

	return (
        <div className={`group-container ${isSelected ? "group-selected" : "group-unselected"}`}
             onClick={handleClick}>
            <div className="group-wrapper">
                <Typography variant='body' sx={{ fontWeight: '600' }}>{ group.name }</Typography>
            </div>
            <Typography variant='body' sx={{ fontSize: '12px' }}>
                { group.users.length >= 3 ? group.users.length : group.users.join(', ') }
            </Typography>
        </div>
    );
};

export default GroupInfos;