export const BASEIMGPATH = 'colorstreet.jpg'
export const BASEIMGWIDTH =  1000
export const BASEIMGHEIGHT =  1000

export const GRIDWIDTHCOUNT = 20
export const GRIDHEIGHTCOUNT = 12
export const GRIDCOUNT = GRIDHEIGHTCOUNT * GRIDWIDTHCOUNT



export const RADIUS = 1.0
export const HEXWIDTH = 2.0 * RADIUS
export const HEXHEIGHT = Math.sqrt(3) * RADIUS
export const HORIZONTAL_SPACING = HEXWIDTH * 3.0 / 4.0
export const VERTICAL_SPACING = HEXHEIGHT


export const GRIDWIDTH = (GRIDWIDTHCOUNT -1) * HORIZONTAL_SPACING + HEXWIDTH
export const GRIDHEIGHT = GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0


export const STARTING_HEX_COMPLETED = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_BASE = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_GROUND = [0, 1, 11, 12, 132, 143]

export const STARTING_TILE = 0
export const NEIGHBOURS_TO_STARTING = [1, 10]