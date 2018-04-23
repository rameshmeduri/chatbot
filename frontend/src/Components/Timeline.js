import React from 'react';

const Item = ({ title, desc, completed }) => {
    let c = (completed) ? 'timeline-item-head timeline-item-head-green' : 'timeline-item-head timeline-item-head-gray';
    return (
        <li className="timeline-item">
            <div className="timeline-item-tail"></div>
            <div className={c}></div>
            <div className="timeline-item-content">{title} : {desc}</div>
        </li>
    );
};

const Timeline = ({ events, show }) => {
    if (show) {
        return (
            <ul className="timeline_container">
                {
                    events.map((event, index) => {
                        return (
                            <Item key={index} title={event.title} desc={event.desc} completed={event.completed} />
                        );
                    })
                }
            </ul>
        );
    } else {
        return null;
    }
};

export default Timeline;