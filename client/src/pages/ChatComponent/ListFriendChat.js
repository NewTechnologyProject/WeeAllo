import Scrollbar from "src/components/Scrollbar";
// ----------------------------------------------------------------------
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function ListFriendChat() {
    return (
        <Scrollbar
            sx={{
                height: '100%'
            }}
        >
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            K
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Khang" secondary="Jan 9, 2021" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            N
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Nam" secondary="Jan 7, 2021" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            H
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Hoài" secondary="July 20, 2021" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            H
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Hưng" secondary="July 2, 2021" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            H
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Huy" secondary="July 9, 2021" />
                </ListItem>
            </List>
        </Scrollbar>
    );
}
