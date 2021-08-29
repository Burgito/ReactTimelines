import Timelines from './Timelines';

interface TLPanelProps {
    className?: string;
};

const TimeLinePanel: React.FC<TLPanelProps> = (props) => {

    return <div className={props.className}>
        <Timelines></Timelines>
    </div>
};

export default TimeLinePanel;