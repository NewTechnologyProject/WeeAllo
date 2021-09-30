import { useFormik } from 'formik';
import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Page from 'src/components/Page';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import SearchContact from './Search';
import AllContact from './AllContact';
import AllSend from './AllSend';
import AllReceive from './AllReceive';
// components

// ----------------------------------------------------------------------

export default function Contact() {
    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };

    return (
        <Page title="Trang liên hệ | WeeAllo">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Liên hệ
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Tìm kiếm liên hệ" value="1" />
                                <Tab label="Tất cả liên hệ" value="2" />
                                <Tab label="Các lời mời đã gửi" value="3" />
                                <Tab label="Các lời mời đã nhận" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><SearchContact /></TabPanel>
                        <TabPanel value="2"><AllContact /></TabPanel>
                        <TabPanel value="3"><AllSend /></TabPanel>
                        <TabPanel value="4"><AllReceive /></TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </Page >
    );
}
