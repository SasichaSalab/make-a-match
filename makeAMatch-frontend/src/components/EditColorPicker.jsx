import React, { useState, useEffect, useCallback } from 'react';
import { ChromePicker } from 'react-color';
import Coloris from '@melloware/coloris';
import useEyeDropper from 'use-eye-dropper';
import { Colorize } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const EditColorPicker = ({ defaultColor = '#fff'}) => {
    const [color, setColor] = useState(defaultColor);

    useEffect(() => {
        Coloris.init();
        Coloris({
            el: '.coloris-input',
            theme: 'polaroid',
            swatches: [
                '#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#d62828', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4',
            ],
        });
    });

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };
    const { open, isSupported } = useEyeDropper()
    const [error, setError] = useState()
    // useEyeDropper will reject/cleanup the open() promise on unmount,
    // so setState never fires when the component is unmounted.
    const pickColor = useCallback(() => {
        // Using async/await (can be used as a promise as-well)
        const openPicker = async () => {
            try {
                const color = await open()
                setColor(color.sRGBHex)
            } catch (e) {
                console.log(e)
                // Ensures component is still mounted
                // before calling setState
                if (!e.canceled) setError(e)
            }
        }
        openPicker()
    }, [open])

    return (
        <div className="flex flex-col items-start w-full">
            <div className='flex flex-row items-center'>
                <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
                <input
                    type="text"
                    className="coloris-input"
                    value={color}
                    readOnly
                    style={{ display: 'none' }}
                />
            </div>
            <div className='w-full flex flex-row'>
                {isSupported() ?
                    <IconButton onClick={pickColor} className='w-10 h-10'><Colorize /></IconButton>
                    : <span>EyeDropper API not supported in this browser</span>
                }
                {!!error && <div>{error.message}</div>}
                <div className='w-full flex flex-col'>
                    <div className='w-full h-8' style={{ background: color, border: '2px solid #000' }}></div>
                    <p className="mt-4 self-center">Selected Color: {color}</p></div></div>
        </div>
    );
};

export default EditColorPicker;
