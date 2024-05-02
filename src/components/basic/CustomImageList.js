import { ImageList, ImageListItem } from "@mui/material"

const CustomImageList = ({ setBackground, windowSize }) => {

    const itemData = [
        {
          img: 'http://hdwpro.com/wp-content/uploads/2020/02/Green-Whatsapp-Wallpaper.jpg',
          title: 'Light 1',
        },
        {
          img: 'https://cdn.wallpapersafari.com/27/32/jt4AoG.jpg',
          title: 'Light 2',
        },
        {
          img: 'https://wallpapercave.com/wp/wp3515118.jpg',
          title: 'Pikachu',
        },
        {
          img: 'https://www.itl.cat/pngfile/big/2-27655_whatsapp-background-wallpaper.jpg',
          title: 'Dark 1',
        },
        {
          img: 'https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png',
          title: 'Dark 2',
        },
        {
          img: 'https://printables.space/files/uploads/download-and-print/large-printable-numbers/plus-a4-1200x1697.jpg',
          title: 'Add wallpaper',
        },
    ]

    const changeBackground = (item) => {
      if (item.title !== 'Add wallpaper') {
        setBackground(item.img)
        localStorage.setItem('background', item.img)
      }
      else {
        //upload file
      }
    }

    return (
        <ImageList sx={{ width: '85%', margin: '20px auto', overflow: 'hidden' }} cols={windowSize < 510 ? 2: 3} rowHeight={130}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                      onClick={() => changeBackground(item)}
                      style={{ height: '130px' }}
                      srcSet={`${item.img}?w=130&h=130&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=130&h=130&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                  />
                </ImageListItem>
            ))}
        </ImageList>
    )
}
 
export default CustomImageList;