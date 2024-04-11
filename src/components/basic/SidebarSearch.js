import { IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';

const SidebarSearch = ({ searchString, setSearchString}) => {
    return (
        <div className="sidebar__search">
            <Box className="sidebar__searchContainer" sx={{borderColor: 'border.main'}}>
                
                <div className='sidebar__searchContainerLeft'>
                    <IconButton >
                        <SearchIcon />
                    </IconButton>
                    <input type='text' placeholder='Search or start new chat' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </div>

                {searchString !== '' &&
                <IconButton onClick={() => setSearchString('')}>
                    <CloseIcon />
                </IconButton>}
                
            </Box>
        </div>
    )
}
 
export default SidebarSearch