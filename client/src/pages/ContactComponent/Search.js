import { Grid, TextField } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Search } from '@material-ui/icons';
import scanner from 'src/access/ImageIcon/scanner.jpg';
// ----------------------------------------------------------------------
import { Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { display } from '@material-ui/system';
const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function SearchContact() {
    return (
        <div style={{ height: '100%', padding: '20px', width: '100%', display: 'flex', position: 'inherit' }}>
            <Grid container style={{ display: 'flex', position: 'inherit' }}>
                <Grid item xs={12} sm={12} md={12} style={{ paddingTop: '10px', paddingBottom: '10px', display: 'flex' }}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            size="medium"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <IconButton >
                        <img src={scanner} height={40} />
                    </IconButton>
                </Grid>
            </Grid>
        </div >
    );
}
