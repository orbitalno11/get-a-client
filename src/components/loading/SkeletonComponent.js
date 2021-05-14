import { Skeleton } from "antd"
import React from 'react'

const SkeletonText = ({ size }) => {
    return (
        <Skeleton.Input style={{ width: 200 }} active={true} size={size} />
    )
}

const SkeletonTextDetail = () => {
    return (
        <Skeleton active />
    )
}

export const SkeletonComponent = {
    SkeletonText,
    SkeletonTextDetail
}