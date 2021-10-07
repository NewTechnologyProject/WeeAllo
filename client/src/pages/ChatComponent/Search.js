import { Grid, TextField } from '@material-ui/core';
import MessageChat from './Message';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
// ----------------------------------------------------------------------
import { Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';


const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' }
];
//--------------------------
export default function SearchFriend() {
    return (
        <div style={{ height: '100%', padding: '20px', width: '100%', display: 'flex', position: 'inherit' }}>
            <Grid container style={{ display: 'flex', position: 'inherit' }}>
                <Grid item xs={12} sm={12} md={12} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} style={{ paddingBottom: '5px', borderBottom: '1px solid #e9e7e5' }}>
                    <IconButton aria-label="delete">
                        <PersonAddIcon/>
                    </IconButton>
                    <IconButton aria-label="delete">
                        <GroupAddIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={12} md={12} style={{ paddingTop: '10px' }}>
                    <p style={{ fontWeight: 'bold' }}>Tất cả tin nhắn</p>

                </Grid>
            </Grid>
        </div >
    );
}
