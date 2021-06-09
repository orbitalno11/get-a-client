import { Skeleton } from "antd"
import React from 'react'

const SkeletonText = ({ size, width }) => {
    return (
        <Skeleton.Input style={{ width : width ? width : "100px" }} active={true} size={size} />
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