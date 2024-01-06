'use client'
import { useAppSelector } from '@/redux/dashboardstore/hook'
import React from 'react'
import { TransformWrapper, TransformComponent, useTransformContext } from "react-zoom-pan-pinch";
import TablesContainer from './SchemaComponents/TablesContainer';
import { Button } from '@nextui-org/react';

const Schema = () => {
    const schema = useAppSelector((state) => state.schemareducer)
    return (
        <TransformWrapper
            panning={{ excluded: ["box2_1", "box2_2", "nodrapg"] }}
            wheel={{ excluded: ["box2_1", "box2_2", "nodrapg"] }}
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <TransformContainer {...{ zoomIn, zoomOut, resetTransform, ...rest }} />
            )}
        </TransformWrapper>
    )
}

export default Schema


const TransformContainer = ({ zoomIn, zoomOut, resetTransform }: { zoomIn: () => void, zoomOut: () => void, resetTransform: () => void }) => {
    return (
        <>
            <div className="tools absolute z-[9999999999] bottom-[10%] right-[6%]">
                <Button className='w-6 gap-0 p-0 min-w-10  rounded-[8px]' onClick={() => zoomIn()}>  <i className="fa-solid fa-plus"></i></Button>
                <Button className='w-6 gap-0 p-0 min-w-10 mx-2 rounded-[8px]' onClick={() => zoomOut()}> <i className="fa-solid fa-minus"></i></Button>
                <Button onClick={() => resetTransform()} className='w-6 gap-0 p-0 min-w-10  rounded-[8px]'><i className="fa-solid fa-arrows-to-circle"></i></Button>
            </div>
            <TransformComponent wrapperClass='schemawrapperpanpinch' contentClass='schematransformcomp'>
                <TablesContainer />
            </TransformComponent>
        </>
    )
}