import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';

const SidebarSearch = ({ searchString, setSearchString}) => {
    return (
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                
                <div className='sidebar__searchContainerLeft'>
                    <SearchIcon />
                    <input type='text' placeholder='Search or start new chat' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </div>

                {searchString !== '' && <IconButton onClick={() => setSearchString('')}><CloseIcon /></IconButton>}
                
            </div>
        </div>
    )
}
 
export default SidebarSearch