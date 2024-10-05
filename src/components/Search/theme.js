import React, { Fragment, memo } from "react";
import useTheme from '@material-ui/core/styles/useTheme';

const getSelectTheme = (theme) => {
    return ({
      
      /*
       * control/backgroundColor
       * menu/backgroundColor
       * option/color(selected)
       */
      neutral0: theme.palette.background.default, // just background
  
      /*
        * control/backgroundColor(disabled)
       */
      neutral5: "orange",
  
      /*
       * control/borderColor(disabled)
       * multiValue/backgroundColor
       * indicators(separator)/backgroundColor(disabled)
       */
      neutral10: 'pink',
  
      /*
       * control/borderColor
       * option/color(disabled)
       * indicators/color
       * indicators(separator)/backgroundColor
       * indicators(loading)/color
       */
      neutral20: theme.palette.grey['A200'], // border of the input bar
  
      /*
       * control/borderColor(focused)
       * control/borderColor:hover
       */
      // this should be the white, that's normally selected
      neutral30: '#bcc6f4', // border of the input on hover
  
      /*
       * menu(notice)/color
       * singleValue/color(disabled)
       * indicators/color:hover
       */
      neutral40: theme.palette.grey['A200'],
  
      /*
       * placeholder/color
       */
      // seen in placeholder text
      neutral50: theme.palette.grey['A200'], // placeholder
  
      /*
       * indicators/color(focused)
       * indicators(loading)/color(focused)
       */
      neutral60: theme.palette.grey['A200'],
      neutral70: theme.palette.grey['A200'],
  
      /*
       * input/color
       * multiValue(label)/color
        * singleValue/color
       * indicators/color(focused)
       * indicators/color:hover(focused)
       */
      neutral80: theme.palette.text.primary, // typing text color
  
      // no idea
      neutral90: "pink",
  
      /*
       * control/boxShadow(focused)
       * control/borderColor(focused)
       * control/borderColor:hover(focused)
       * option/backgroundColor(selected)
       * option/backgroundColor:active(selected)
       */
      primary: '#0d2591', // active / focus border color
  
      /*
       * option/backgroundColor(focused)
       */
      primary25: '#eaeeff', // HOVER 
  
      /*
       * option/backgroundColor:active
       */
      primary50: theme.palette.background.paper, // active color when clicked
      primary75: theme.palette.background.paper,
})}

export default getSelectTheme;