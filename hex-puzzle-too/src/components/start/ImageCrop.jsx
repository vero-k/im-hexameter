import { useState, useCallback } from "react";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button"


import Cropper from "react-easy-crop";
//import { Point, Area } from "react-easy-crop/types";

const ImageCrop = (props) => {

  const [original, setOriginal] = useState({width: props.imgHeight, height: props.imgWidth})
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropSize, setCropSize] = useState({ width: props.imgHeight * 0.8, height: props.imgHeight *0.8})
  const [aspect, setAspect] = useState(1.0)
  const [form, setForm] = useState(props.fieldForm)

  const [image, setImage] = useState(props.image)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)


  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  );

  const cropFinish = () => {
        props.setImgWidth(croppedAreaPixels.width)
        props.setImgHeight(croppedAreaPixels.height)
        props.setImgTop(croppedAreaPixels.y)
        props.setImgLeft(croppedAreaPixels.x)

        props.setFieldForm(form)
        props.setCropInProgress(false)
        props.setCropDone(true)
}

  const cropAbort = () => {
        props.setCropInProgress(false)
    }


  const changeForm = (form) => {
        const minSide = Math.min(cropSize.width, cropSize.height)
    
        if(form === 'square'){
            setAspect(1.0)
            setForm('square')
            setCropSize({width: minSide, height: minSide})
        } else if(form === 'mobile'){
            setAspect(0.5)
            setForm('mobile')
            setCropSize({width: (minSide / 2.0), height: minSide})
        } else {
            setAspect(2.0)
            setForm('desktop')
            setCropSize({width: minSide, height: (minSide / 2.0)})     
        }
        
        
    }


  return (
    <>
    
    <div className={"crop-div-bg"} >
        <div className={"crop-div"} >
        <div className={'crop-container'}>
            <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropSizeChange={setCropSize}
            />
        </div>
        <div className={'controls'}>

            <div className={'slider-div'}>
                {'Zoom'}    
                <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(Number(zoom))}
                classes={{ root: "slider" }}
                />
            </div>

            <div className={'slider-div'}>
                {'Aspect Ratio'}
                <span>
                <Button 
                variant={"text"}
                onClick={() => changeForm('square')}
                
                >
                    {'Square 1:1'}
                </Button>
                </span>

                <span>
                <Button 
                variant={"text"}
                onClick={() => changeForm('desktop')}
                >
                    {'Desktop 2:1'}
                </Button>
                </span>

                <span>
                <Button 
                variant={"text"}
                onClick={() => changeForm('mobile')}
                >
                    {'Mobile 1:2'}
                </Button>
                </span>
            </div>

            <div className={'crop-controls-bttn'}>
                <span>
                <Button 
                variant={"contained"}
                onClick={cropFinish}
                
                >
                    {'Apply'}
                </Button>
                </span>

                <span>
                <Button 
                variant={"contained"}
                onClick={cropAbort}
                >
                    {'Cancel'}
                </Button>
                </span>

            </div>

        </div>
        </div>
    </div>
        

    </>
    
  );
};


export default ImageCrop

