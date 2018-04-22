import React from 'react';
import moment from 'moment';

function nextWednesday(now) {
    const result = now.clone();
    while (result.isoWeekday() !== 3) {
        result.add(1, 'days');
    }
    return result;
}

function nextSaturday(now) {
    const result = now.clone();
    while (result.isoWeekday() !== 3) {
        result.add(1, 'days');
    }
    return result;
}

function renderLink(source, target, time) {
    const [lon, lat] = source.coordinates;
    const [tLon, tLat] = target.coordinates;
    return "https://www.reittiopas.fi/reitti/" +
        source.address + "%3A%3A" + lat + "," + lon + "/" +
        target.address + "%3A%3A" + tLat + "," + tLon + "?time=" + time(moment()).unix()
}

class AddressLink extends React.Component {
    render() {
        let link;
        if (this.props.source.coordinates && this.props.target.coordinates) {
            const url = renderLink(this.props.source, this.props.target, this.props.time);
            link = (<a href={url}>{this.props.title}</a>);
        } else {
            link = (<span>{this.props.title}</span>);
        }
        return (
            <div>
                {link}
            </div>
        );
    }
}

export {AddressLink, nextWednesday, nextSaturday};

