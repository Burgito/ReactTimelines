import React from 'react';
import { LoaderType } from '../../common/constants/Loader';

interface ILoaderProps {
    loaderType: LoaderType,
    isFullScreenLoader: boolean
}

export const Loader: React.FC<ILoaderProps> = ({loaderType, isFullScreenLoader}) => (
    <div className={`request-loader ${isFullScreenLoader ? "loader-fullscreen" : "loader-relative-to-parent"}`}>
        <div className={`request-loader-${loaderType ? loaderType : LoaderType.Default}`}>
            <div></div><div></div>
        </div>
    </div>
);

export default Loader;