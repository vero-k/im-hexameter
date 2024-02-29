import {TextureLoader} from 'three'

import {
    slabBgImg
} from './Images'



const textureLoader = new TextureLoader();

const slabBgTexture = textureLoader.load(slabBgImg)


export {
    slabBgTexture
}