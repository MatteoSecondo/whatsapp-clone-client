import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CustomizationSettings = ({ setCurrentTabIndex, isSmallScreen }) => {
    return (
        <div className="settings__general">
            <div className='settings__header'>
                {isSmallScreen &&
                <IconButton  onClick={() => setCurrentTabIndex(5)}>
                    <ArrowBackIcon />
                </IconButton>}
                <h2>Customization Settings</h2>
            </div>
        </div>
    )
}
 
export default CustomizationSettings